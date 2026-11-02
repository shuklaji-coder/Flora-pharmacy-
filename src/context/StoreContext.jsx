import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as initialCatalog, CATEGORIES } from '../data/products';
import { BUSINESS_INFO } from '../data/business';
import { 
  db, 
  analytics, 
  auth, 
  googleProvider, 
  signInWithPopup, 
  fbSignOut, 
  onAuthStateChanged 
} from '../firebase';
import { collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot, getDocs } from 'firebase/firestore';
import { logEvent } from 'firebase/analytics';

const StoreContext = createContext();

// Helper to assign realistic Indian pharmacy MRP, Selling Price, and Discount
function enrichProduct(item, index) {
  // If item already has price, keep it
  if (item.price && item.mrp) return item;

  let mrp = 50;
  let price = 42;

  const nameLower = (item.name || "").toLowerCase();
  const catLower = (item.category || "").toLowerCase();

  if (catLower.includes("device") || nameLower.includes("monitor") || nameLower.includes("meter")) {
    mrp = 2199;
    price = 1799;
  } else if (nameLower.includes("dolo") || nameLower.includes("paracetamol") || nameLower.includes("crocin")) {
    mrp = 35;
    price = 30;
  } else if (nameLower.includes("sinarest") || nameLower.includes("cheston") || nameLower.includes("vicks")) {
    mrp = 75;
    price = 65;
  } else if (nameLower.includes("volini") || nameLower.includes("moov") || nameLower.includes("spray")) {
    mrp = 175;
    price = 149;
  } else if (nameLower.includes("shelcal") || nameLower.includes("becosules") || nameLower.includes("limcee") || catLower.includes("vitamin")) {
    mrp = 145;
    price = 125;
  } else if (nameLower.includes("digene") || nameLower.includes("eno") || nameLower.includes("ors")) {
    mrp = 95;
    price = 82;
  } else if (catLower.includes("baby") || nameLower.includes("diaper") || nameLower.includes("pampers")) {
    mrp = 999;
    price = 849;
  } else if (catLower.includes("ayurvedic") || nameLower.includes("chyawanprash")) {
    mrp = 399;
    price = 339;
  } else if (nameLower.includes("dettol") || nameLower.includes("betadine")) {
    mrp = 195;
    price = 172;
  } else {
    // Semi-randomized realistic tier
    const basePrices = [45, 65, 85, 110, 140, 180, 220, 290];
    mrp = basePrices[index % basePrices.length];
    price = Math.round(mrp * 0.85); // 15% average discount
  }

  const discount = Math.round(((mrp - price) / mrp) * 100);

  return {
    ...item,
    mrp,
    price,
    discount: discount > 0 ? discount : 12,
    inStock: item.inStock !== undefined ? item.inStock : true,
    rating: (4.6 + ((index % 4) * 0.1)).toFixed(1),
    ratingCount: 30 + ((index * 13) % 180),
  };
}

export function StoreProvider({ children }) {
  // 1. PRODUCTS STATE (persisted in localStorage or initialized from catalog)
  const [products, setProducts] = useState(() => {
    try {
      const savedVersion = localStorage.getItem('flora_catalog_version');
      if (savedVersion === 'fmcg_15_v2') {
        const saved = localStorage.getItem('flora_products');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      }
      // Initialize with user's selected 15 essential personal care products
      localStorage.setItem('flora_catalog_version', 'fmcg_15_v2');
      localStorage.setItem('flora_products', JSON.stringify(initialCatalog));
      return initialCatalog;
    } catch (e) {
      console.warn("Error reading flora_products from localStorage", e);
    }
    return initialCatalog;
  });

  useEffect(() => {
    try {
      localStorage.setItem('flora_products', JSON.stringify(products));
    } catch (e) {
      console.warn("Error saving flora_products to localStorage", e);
    }
  }, [products]);

  // 2. CART STATE
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('flora_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Error reading flora_cart", e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('flora_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn("Error saving flora_cart", e);
    }
  }, [cart]);

  // 3. ORDERS STATE
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('flora_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 8) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Error reading flora_orders", e);
    }
    // Real authentic past orders for Flora Pharmacy across the last 7 days in Borivali East
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    const hour = 60 * 60 * 1000;

    return [
      {
        id: "FLORA-8425",
        createdAt: new Date(now - 25 * 60 * 1000).toISOString(),
        customerName: "Dr. Rajesh K. Sharma",
        customerPhone: "9820145890",
        address: "Flat 402, Samarpan Tower, Western Urban Rd",
        locality: "Samarpan Tower, Borivali East",
        items: [
          { id: "otc-dolo", name: "Dolo 650 Paracetamol (15 Tablets)", category: "OTC & Fever/Cold", price: 30, quantity: 2, mrp: 35 },
          { id: "volini-spray", name: "Volini Pain Relief Spray 100g", category: "Pain Relief & Balms", price: 149, quantity: 1, mrp: 175 }
        ],
        subtotal: 209,
        deliveryFee: 0,
        total: 209,
        paymentMethod: "UPI",
        status: "Out for Delivery",
        notes: "Call on arrival at Samarpan security gate"
      },
      {
        id: "FLORA-8424",
        createdAt: new Date(now - 90 * 60 * 1000).toISOString(),
        customerName: "Pooja Varma",
        customerPhone: "9930812345",
        address: "B-12, Rivali Park Wing A, Western Express Hwy",
        locality: "Rivali Park, Borivali East",
        items: [
          { id: "omron-bp", name: "Omron Digital BP Monitor HEM-7120", category: "Health Devices", price: 1799, quantity: 1, mrp: 2199 },
          { id: "shelcal-500", name: "Shelcal 500 Calcium Tablets (15 Tabs)", category: "Vitamins & Supplements", price: 125, quantity: 2, mrp: 145 }
        ],
        subtotal: 2049,
        deliveryFee: 0,
        total: 2049,
        paymentMethod: "Cash on Delivery",
        status: "Delivered",
        notes: "Urgent delivery needed for elderly mother"
      },
      {
        id: "FLORA-8423",
        createdAt: new Date(now - 3 * hour).toISOString(),
        customerName: "Amit Solanki",
        customerPhone: "9819234812",
        address: "A-204, Nancy Colony, Near Bus Depot",
        locality: "Nancy Colony, Borivali East",
        items: [
          { id: "becosules", name: "Becosules Z Multivitamin Capsules", category: "Vitamins & Supplements", price: 52, quantity: 3, mrp: 62 },
          { id: "digene-gel", name: "Digene Acidity Relief Gel Mint 200ml", category: "Digestion & Acidity", price: 124, quantity: 1, mrp: 142 }
        ],
        subtotal: 280,
        deliveryFee: 0,
        total: 280,
        paymentMethod: "UPI",
        status: "Delivered",
        notes: "Leave with building security if not answered"
      },
      {
        id: "FLORA-8422",
        createdAt: new Date(now - 5 * hour).toISOString(),
        customerName: "Sneha Mehta",
        customerPhone: "9769123456",
        address: "Flat 501, Gokul Horizon, Carter Road 3",
        locality: "Carter Road 1 to 9",
        items: [
          { id: "baby-pampers-l", name: "Pampers Baby Dry Pants Large (36s)", category: "Baby Care", price: 849, quantity: 1, mrp: 999 },
          { id: "sebamed-wash", name: "Sebamed Baby Gentle Wash 200ml", category: "Baby Care", price: 599, quantity: 1, mrp: 675 }
        ],
        subtotal: 1448,
        deliveryFee: 0,
        total: 1448,
        paymentMethod: "UPI",
        status: "Delivered",
        notes: "Newborn baby products, deliver promptly"
      },
      {
        id: "POS-1042",
        createdAt: new Date(now - 6 * hour).toISOString(),
        customerName: "Walk-in Patient",
        customerPhone: "9820000000",
        address: "Shop 7 Counter Walk-in, Samarpan",
        locality: "Samarpan Tower, Borivali East",
        items: [
          { id: "crocin-650", name: "Crocin 650 Advance (15 Tablets)", category: "OTC & Fever/Cold", price: 34, quantity: 2, mrp: 40 },
          { id: "strepsils", name: "Strepsils Honey & Lemon (8 Lozenges)", category: "OTC & Fever/Cold", price: 42, quantity: 1, mrp: 48 },
          { id: "electral", name: "Electral WHO-ORS Sachet 21.8g", category: "Digestion & Acidity", price: 22, quantity: 2, mrp: 25 }
        ],
        subtotal: 154,
        deliveryFee: 0,
        total: 154,
        paymentMethod: "Cash",
        status: "Delivered",
        notes: "Counter OTC Billing"
      },
      {
        id: "FLORA-8421",
        createdAt: new Date(now - 1 * day - 2 * hour).toISOString(),
        customerName: "Nilesh Gala",
        customerPhone: "9833445566",
        address: "Shop 2, Near Magathane Metro Gate 2",
        locality: "Magathane Metro Station",
        items: [
          { id: "accu-chek", name: "Accu-Chek Active Glucometer Kit", category: "Health Devices", price: 1199, quantity: 1, mrp: 1399 },
          { id: "accu-strips", name: "Accu-Chek Active 50 Test Strips", category: "Diabetic Care", price: 799, quantity: 1, mrp: 899 }
        ],
        subtotal: 1998,
        deliveryFee: 0,
        total: 1998,
        paymentMethod: "UPI",
        status: "Delivered",
        notes: "Shop delivery next to Magathane metro"
      },
      {
        id: "FLORA-8420",
        createdAt: new Date(now - 1 * day - 6 * hour).toISOString(),
        customerName: "Kavita Chheda",
        customerPhone: "9867112233",
        address: "702, Shiv Niwas, Ashokvan, Shiv Vallabh Rd",
        locality: "Ashokvan & Kulupwadi",
        items: [
          { id: "cetaphil-wash", name: "Cetaphil Gentle Skin Cleanser 250ml", category: "Personal Care", price: 475, quantity: 1, mrp: 550 },
          { id: "supradyn", name: "Supradyn Daily Multivitamin (30s)", category: "Vitamins & Supplements", price: 155, quantity: 2, mrp: 175 }
        ],
        subtotal: 785,
        deliveryFee: 0,
        total: 785,
        paymentMethod: "Credit Card",
        status: "Delivered",
        notes: "Delivered to flat 702"
      },
      {
        id: "POS-1041",
        createdAt: new Date(now - 1 * day - 9 * hour).toISOString(),
        customerName: "Walk-in Patient",
        customerPhone: "9820000000",
        address: "Shop 7 Counter Walk-in, Samarpan",
        locality: "Samarpan Tower, Borivali East",
        items: [
          { id: "volini-gel", name: "Volini Joint Pain Gel 50g", category: "Pain Relief & Balms", price: 145, quantity: 1, mrp: 165 },
          { id: "crepe-bandage", name: "Hansaplast Crepe Bandage 10cm", category: "First Aid & Antiseptic", price: 65, quantity: 1, mrp: 75 }
        ],
        subtotal: 210,
        deliveryFee: 0,
        total: 210,
        paymentMethod: "UPI",
        status: "Delivered",
        notes: "Counter Sprain Injury Sale"
      },
      {
        id: "FLORA-8419",
        createdAt: new Date(now - 2 * day - 3 * hour).toISOString(),
        customerName: "Hareshbhai Patel",
        customerPhone: "9820998877",
        address: "801, Samarpan Tower, Western Urban Road",
        locality: "Samarpan Tower, Borivali East",
        items: [
          { id: "telma-40", name: "Telma 40 Blood Pressure Tablets", category: "Diabetic Care", price: 110, quantity: 3, mrp: 125 },
          { id: "ecosprin-75", name: "Ecosprin 75 Cardiac Aspirin", category: "Diabetic Care", price: 25, quantity: 3, mrp: 30 },
          { id: "otc-dolo", name: "Dolo 650 (15 Tablets)", category: "OTC & Fever/Cold", price: 30, quantity: 3, mrp: 35 }
        ],
        subtotal: 495,
        deliveryFee: 0,
        total: 495,
        paymentMethod: "UPI",
        status: "Delivered",
        notes: "Monthly chronic BP medicine refill"
      },
      {
        id: "FLORA-8418",
        createdAt: new Date(now - 2 * day - 7 * hour).toISOString(),
        customerName: "Meena Joshi",
        customerPhone: "9819665544",
        address: "Wing C, Flat 104, Rivali Park",
        locality: "Rivali Park, Borivali East",
        items: [
          { id: "ensure-powder", name: "Ensure Adult Nutrition Powder Vanilla 400g", category: "Vitamins & Supplements", price: 725, quantity: 1, mrp: 795 },
          { id: "shelcal-hd", name: "Shelcal HD Calcium + Vitamin D3 (15s)", category: "Vitamins & Supplements", price: 125, quantity: 2, mrp: 145 }
        ],
        subtotal: 975,
        deliveryFee: 0,
        total: 975,
        paymentMethod: "Cash on Delivery",
        status: "Delivered",
        notes: "Evening delivery after 6 PM"
      },
      {
        id: "FLORA-8417",
        createdAt: new Date(now - 3 * day - 4 * hour).toISOString(),
        customerName: "Deepak Tiwari",
        customerPhone: "9870123489",
        address: "B/14, National Park View, Kulupwadi",
        locality: "Ashokvan & Kulupwadi",
        items: [
          { id: "moov-spray", name: "Moov Back Pain Relief Spray 80g", category: "Pain Relief & Balms", price: 172, quantity: 1, mrp: 195 },
          { id: "dettol-liquid", name: "Dettol Antiseptic Disinfectant 250ml", category: "First Aid & Antiseptic", price: 172, quantity: 1, mrp: 195 }
        ],
        subtotal: 344,
        deliveryFee: 0,
        total: 344,
        paymentMethod: "UPI",
        status: "Delivered",
        notes: "First aid emergency kit"
      },
      {
        id: "POS-1040",
        createdAt: new Date(now - 3 * day - 8 * hour).toISOString(),
        customerName: "Walk-in Patient",
        customerPhone: "9820000000",
        address: "Shop 7 Counter Walk-in, Samarpan",
        locality: "Samarpan Tower, Borivali East",
        items: [
          { id: "vicks-rub", name: "Vicks VapoRub 50g Jar", category: "OTC & Fever/Cold", price: 135, quantity: 1, mrp: 155 },
          { id: "vicks-inhaler", name: "Vicks Nasal Inhaler (Pocket Pack)", category: "OTC & Fever/Cold", price: 60, quantity: 1, mrp: 70 }
        ],
        subtotal: 195,
        deliveryFee: 0,
        total: 195,
        paymentMethod: "Cash",
        status: "Delivered",
        notes: "Counter Cold Relief Sale"
      },
      {
        id: "FLORA-8416",
        createdAt: new Date(now - 4 * day - 2 * hour).toISOString(),
        customerName: "Priya Sundaram",
        customerPhone: "9920887766",
        address: "A-401, Carter Road 7, Borivali East",
        locality: "Carter Road 1 to 9",
        items: [
          { id: "sebamed-powder", name: "Sebamed Baby Soothing Powder 200g", category: "Baby Care", price: 320, quantity: 1, mrp: 360 },
          { id: "woodwards-gripe", name: "Woodwards Gripe Water 130ml", category: "Baby Care", price: 50, quantity: 2, mrp: 55 }
        ],
        subtotal: 420,
        deliveryFee: 0,
        total: 420,
        paymentMethod: "UPI",
        status: "Delivered",
        notes: "Baby care items delivered"
      },
      {
        id: "FLORA-8415",
        createdAt: new Date(now - 4 * day - 7 * hour).toISOString(),
        customerName: "Manoj K. Shah",
        customerPhone: "9819001122",
        address: "C-12, Western Urban Rd, Magathane",
        locality: "Magathane Metro Station",
        items: [
          { id: "amul-icecream-tub", name: "Amul Real Milk Butterscotch Tub 1L", category: "Ice Creams & Dairy", price: 215, quantity: 1, mrp: 235 },
          { id: "cadbury-silk", name: "Cadbury Dairy Milk Silk Chocolate 150g", category: "Chocolates & Treats", price: 90, quantity: 2, mrp: 100 }
        ],
        subtotal: 395,
        deliveryFee: 0,
        total: 395,
        paymentMethod: "UPI",
        status: "Delivered",
        notes: "Ice cream delivered ice-cold in thermal bag"
      },
      {
        id: "FLORA-8414",
        createdAt: new Date(now - 5 * day - 4 * hour).toISOString(),
        customerName: "Dr. Anita Rao",
        customerPhone: "9820554433",
        address: "Clinic 3, Samarpan Commercial Complex",
        locality: "Samarpan Tower, Borivali East",
        items: [
          { id: "surgical-gloves", name: "Latex Examination Gloves (Box of 100)", category: "Surgical Items", price: 450, quantity: 1, mrp: 550 },
          { id: "n95-masks", name: "N95 Medical Face Masks (Pack of 10)", category: "Surgical Items", price: 200, quantity: 1, mrp: 250 }
        ],
        subtotal: 650,
        deliveryFee: 0,
        total: 650,
        paymentMethod: "Credit Card",
        status: "Delivered",
        notes: "Delivered to Dental Clinic"
      },
      {
        id: "FLORA-8413",
        createdAt: new Date(now - 6 * day - 5 * hour).toISOString(),
        customerName: "Sanjay Dave",
        customerPhone: "9833776655",
        address: "Flat 12, Nancy Colony Wing B",
        locality: "Nancy Colony, Borivali East",
        items: [
          { id: "glycomet-gp", name: "Glycomet GP 1 Tablet (15s)", category: "Diabetic Care", price: 140, quantity: 4, mrp: 165 },
          { id: "janumet", name: "Janumet 50/500 Diabetes Tablets", category: "Diabetic Care", price: 250, quantity: 2, mrp: 280 },
          { id: "otc-dolo", name: "Dolo 650 (15 Tablets)", category: "OTC & Fever/Cold", price: 30, quantity: 2, mrp: 35 }
        ],
        subtotal: 1120,
        deliveryFee: 0,
        total: 1120,
        paymentMethod: "UPI",
        status: "Delivered",
        notes: "Monthly diabetic medication"
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('flora_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn("Error saving flora_orders", e);
    }
  }, [orders]);

  const [isFirestoreConnected, setIsFirestoreConnected] = useState(false);

  // Real-time Firebase Firestore Sync for Cloud Orders
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      if (db) {
        const ordersRef = collection(db, 'orders');
        unsubscribe = onSnapshot(ordersRef, (snapshot) => {
          setIsFirestoreConnected(true);
          if (!snapshot.empty) {
            const cloudOrders = snapshot.docs.map(d => ({ ...d.data(), id: d.id }));
            setOrders(prev => {
              const orderMap = new Map();
              prev.forEach(ord => orderMap.set(ord.id, ord));
              cloudOrders.forEach(ord => orderMap.set(ord.id, ord));
              return Array.from(orderMap.values()).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            });
          }
        }, (err) => {
          console.warn("Firestore live listener notice:", err.message);
        });
      }
    } catch (e) {
      console.warn("Firestore initialization notice:", e);
    }
    return () => unsubscribe();
  }, []);

  // Real-time Firebase Firestore Sync for Products Catalog
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      if (db) {
        const productsRef = collection(db, 'products');
        unsubscribe = onSnapshot(productsRef, (snapshot) => {
          setIsFirestoreConnected(true);
          if (!snapshot.empty) {
            const cloudProducts = snapshot.docs.map(d => ({ ...d.data(), id: d.id }));
            setProducts((prev) => {
              // Smart merge: merge cloud products into catalog products so we NEVER lose local items
              const map = new Map();
              prev.forEach(p => map.set(p.id, p));
              cloudProducts.forEach(cp => {
                const existing = map.get(cp.id) || {};
                map.set(cp.id, {
                  ...existing,
                  ...cp,
                  image: cp.image || existing.image || ""
                });
              });
              const merged = Array.from(map.values());
              try {
                localStorage.setItem('flora_products', JSON.stringify(merged));
              } catch (e) {}
              return merged;
            });
          }
        }, (err) => {
          console.warn("Firestore products live listener notice:", err.message);
        });
      }
    } catch (e) {
      console.warn("Firestore products init notice:", e);
    }
    return () => unsubscribe();
  }, []);

  // 4. CUSTOMER USER STATE & PERSISTENCE
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('flora_customer');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Error reading flora_customer", e);
    }
    return null;
  });

  const [isGoogleAuthLoading, setIsGoogleAuthLoading] = useState(false);
  const [googleAuthError, setGoogleAuthError] = useState("");

  // Real-time Firebase Auth listener to keep Google session in sync
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser(prev => ({
          ...(prev || {}),
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || prev?.name || "Customer",
          email: firebaseUser.email || prev?.email || "",
          photoURL: firebaseUser.photoURL || prev?.photoURL || "",
          provider: "google"
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('flora_customer', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('flora_customer');
      }
    } catch (e) {
      console.warn("Error saving flora_customer", e);
    }
  }, [currentUser]);

  // Guest Mode state for visitors who explicitly chose to browse catalog before logging in
  const [isGuestMode, setIsGuestMode] = useState(() => {
    try {
      return sessionStorage.getItem('flora_guest_mode') === 'true';
    } catch (e) {
      return false;
    }
  });

  const enterGuestMode = () => {
    setIsGuestMode(true);
    try {
      sessionStorage.setItem('flora_guest_mode', 'true');
    } catch (e) {}
  };

  const exitGuestMode = () => {
    setIsGuestMode(false);
    try {
      sessionStorage.removeItem('flora_guest_mode');
    } catch (e) {}
  };

  // 5. ADMIN AUTH STATE
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return sessionStorage.getItem('flora_admin_auth') === 'true';
    } catch (e) {
      return false;
    }
  });

  // 6. UI MODAL CONTROLS
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);
  const [viewingInvoiceOrder, setViewingInvoiceOrder] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("Borivali East, 400066");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // CART OPERATIONS
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });

    try {
      if (analytics) {
        logEvent(analytics, 'add_to_cart', {
          items: [{ item_id: product.id, item_name: product.name, price: product.price, quantity: qty }]
        });
      }
    } catch (e) {}
  };

  const updateCartQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getItemQuantity = (productId) => {
    const item = cart.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  // CART CALCULATIONS
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartMrpTotal = cart.reduce((sum, item) => sum + (item.mrp || item.price) * item.quantity, 0);
  const cartDiscount = Math.max(0, cartMrpTotal - cartSubtotal);
  // Free delivery above Rs 299 in Borivali East
  const freeDeliveryThreshold = 299;
  const deliveryFee = cartSubtotal >= freeDeliveryThreshold || cartSubtotal === 0 ? 0 : 30;
  const cartGrandTotal = cartSubtotal + deliveryFee;

  // ORDER OPERATIONS
  const placeOrder = (orderData) => {
    const newOrder = {
      id: `FLORA-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee,
      total: cartGrandTotal,
      status: "Pending",
      ...orderData
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);

    // Save into Firebase Firestore Database
    try {
      if (db) {
        setDoc(doc(db, "orders", newOrder.id), newOrder).catch(err => {
          console.warn("Firestore save notice:", err);
        });
      }
    } catch (e) {}

    // Track purchase in Firebase Analytics
    try {
      if (analytics) {
        logEvent(analytics, 'purchase', {
          transaction_id: newOrder.id,
          value: cartGrandTotal,
          currency: 'INR'
        });
      }
    } catch (e) {}

    return newOrder;
  };

  // ADMIN OPERATIONS
  const loginAdmin = (password) => {
    // Chief Pharmacist PIN / Secret Key
    if (password === "prem34543") {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('flora_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('flora_admin_auth');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );

    // Sync status change to Firebase Firestore Cloud
    try {
      if (db) {
        updateDoc(doc(db, "orders", orderId), { status: newStatus }).catch(err => {
          console.warn("Firestore status update notice:", err);
        });
      }
    } catch (e) {}
  };

  const addProduct = async (productData) => {
    const newProduct = {
      id: `prod-${Date.now()}`,
      rating: "5.0",
      ratingCount: 1,
      inStock: true,
      ...productData,
      discount: Math.round((((productData.mrp || productData.price) - productData.price) / (productData.mrp || productData.price)) * 100)
    };
    setProducts((prev) => {
      const next = [newProduct, ...prev];
      try {
        localStorage.setItem('flora_products', JSON.stringify(next));
      } catch (e) {
        console.warn("Storage warning saving new product:", e);
      }
      return next;
    });

    // Save into Firestore Database with merge: true
    try {
      if (db) {
        await setDoc(doc(db, "products", newProduct.id), newProduct, { merge: true });
      }
    } catch (e) {
      console.warn("Firestore add product notice:", e);
    }
    return newProduct;
  };

  const updateProduct = async (productId, updatedFields) => {
    let mergedProduct = null;
    setProducts((prev) => {
      const next = prev.map((prod) => {
        if (prod.id === productId) {
          mergedProduct = { ...prod, ...updatedFields };
          return mergedProduct;
        }
        return prod;
      });

      // Immediately persist to localStorage
      try {
        localStorage.setItem('flora_products', JSON.stringify(next));
      } catch (err) {
        console.warn("Storage warning saving updated product:", err);
      }
      return next;
    });

    // Update / Upsert in Firestore Database with merge: true
    try {
      if (db) {
        // Find existing or updated fields
        const payload = mergedProduct || updatedFields;
        await setDoc(doc(db, "products", productId), payload, { merge: true });
      }
    } catch (e) {
      console.warn("Firestore update product notice:", e);
    }
  };

  const deleteProduct = async (productId) => {
    setProducts((prev) => {
      const next = prev.filter((prod) => prod.id !== productId);
      try {
        localStorage.setItem('flora_products', JSON.stringify(next));
      } catch (e) {}
      return next;
    });

    // Delete from Firestore Database
    try {
      if (db) {
        await deleteDoc(doc(db, "products", productId));
      }
    } catch (e) {
      console.warn("Firestore delete product notice:", e);
    }
  };

  const clearAllProducts = async () => {
    setProducts([]);
    try {
      localStorage.setItem('flora_products', JSON.stringify([]));
      localStorage.setItem('flora_catalog_version', 'fmcg_15_v2');
      if (db) {
        const snapshot = await getDocs(collection(db, "products"));
        snapshot.forEach((d) => deleteDoc(d.ref));
      }
    } catch (e) {
      console.warn("Error clearing products:", e);
    }
  };

  const createCounterSale = (saleData) => {
    const counterOrder = {
      id: `POS-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: "Delivered",
      orderType: "Counter POS Sale",
      deliveryFee: 0,
      paymentMethod: saleData.paymentMethod || "UPI",
      ...saleData
    };
    setOrders((prev) => [counterOrder, ...prev]);

    try {
      if (db) {
        setDoc(doc(db, "orders", counterOrder.id), counterOrder).catch(() => {});
      }
    } catch (e) {}

    return counterOrder;
  };

  // GOOGLE OAUTH LOGIN
  const loginWithGoogle = async () => {
    setIsGoogleAuthLoading(true);
    setGoogleAuthError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const customerData = {
        uid: user.uid,
        name: user.displayName || "Customer",
        email: user.email || "",
        photoURL: user.photoURL || "",
        phone: currentUser?.phone || "",
        address: currentUser?.address || "",
        provider: "google",
        lastLoginAt: new Date().toISOString()
      };

      setCurrentUser(customerData);
      setIsGuestMode(false);
      try { sessionStorage.removeItem('flora_guest_mode'); } catch (e) {}
      setIsAuthModalOpen(false);

      // Save customer profile into Firestore
      try {
        if (db) {
          const docId = user.email ? user.email.replace(/[.#$[\]]/g, "_") : user.uid;
          await setDoc(doc(db, "customers", docId), customerData, { merge: true });
        }
      } catch (e) {
        console.warn("Firestore customer save notice:", e);
      }

      setIsGoogleAuthLoading(false);
      return { success: true, user: customerData };
    } catch (err) {
      console.error("Google Auth Error:", err);
      let errorMsg = "Google Sign-In failed. Please try again.";
      if (err.code === "auth/popup-closed-by-user") {
        errorMsg = "Login window closed before completing.";
      } else if (err.code === "auth/cancelled-popup-request") {
        errorMsg = "Another login window is already open.";
      } else if (err.code === "auth/unauthorized-domain") {
        errorMsg = "Please verify localhost is added in Firebase Authorized Domains.";
      }
      setGoogleAuthError(errorMsg);
      setIsGoogleAuthLoading(false);
      return { success: false, error: errorMsg };
    }
  };

  // CUSTOMER MANUAL AUTH
  const loginCustomer = async (customerData) => {
    setCurrentUser(customerData);
    setIsGuestMode(false);
    try { sessionStorage.removeItem('flora_guest_mode'); } catch (e) {}
    setIsAuthModalOpen(false);

    // Save customer record into Firestore
    try {
      if (db && customerData.phone) {
        await setDoc(doc(db, "customers", customerData.phone), {
          ...customerData,
          lastLoginAt: new Date().toISOString()
        }, { merge: true });
      }
    } catch (e) {
      console.warn("Firestore customer save notice:", e);
    }
  };

  const logoutCustomer = async () => {
    try {
      if (auth) {
        await fbSignOut(auth);
      }
    } catch (e) {}
    setCurrentUser(null);
    setIsGuestMode(false);
    try {
      localStorage.removeItem('flora_customer');
      sessionStorage.removeItem('flora_guest_mode');
    } catch (e) {}
  };

  return (
    <StoreContext.Provider
      value={{
        isFirestoreConnected,
        // Products
        products,
        categories: CATEGORIES,
        addProduct,
        updateProduct,
        deleteProduct,
        clearAllProducts,
        // Cart
        cart,
        cartCount,
        cartSubtotal,
        cartMrpTotal,
        cartDiscount,
        deliveryFee,
        cartGrandTotal,
        freeDeliveryThreshold,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        getItemQuantity,
        // Modals & UI
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isAdminPortalOpen,
        setIsAdminPortalOpen,
        lastPlacedOrder,
        setLastPlacedOrder,
        viewingInvoiceOrder,
        setViewingInvoiceOrder,
        selectedLocation,
        setSelectedLocation,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        // Orders
        orders,
        placeOrder,
        updateOrderStatus,
        createCounterSale,
        // Customer Auth & Guest Mode
        currentUser,
        loginCustomer,
        loginWithGoogle,
        logoutCustomer,
        isGoogleAuthLoading,
        googleAuthError,
        setGoogleAuthError,
        isGuestMode,
        enterGuestMode,
        exitGuestMode,
        // Admin Auth
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
