// Central configuration file for Flora Pharmacy business details.
// Update your store phone number, WhatsApp, address, or hours here.

export const BUSINESS_INFO = {
  name: "Flora Pharmacy",
  tagline: "Your Neighbourhood Pharmacy, Now One Tap Away",
  shortDesc: "Serving Borivali East with 100% genuine medicines, healthcare devices, wellness essentials, and rapid doorstep delivery.",
  address: "Shop No. 7, Samarpan, Western Urban Rd, near Magathane Metro Station, near Rivali Park, Borivali East, Mumbai, Maharashtra 400066",
  landmark: "Near Magathane Metro Station & Rivali Park",
  locality: "Borivali East, Mumbai",
  pincode: "400066",
  phone: "+91 86570 90405",
  phoneRaw: "+918657090405",
  whatsappNumber: "918657090405", // Digits only with country code
  hours: "Monday to Sunday, 9:00 AM to 11:00 PM",
  hoursFormatted: {
    days: "Monday – Sunday (All 7 Days)",
    time: "9:00 AM – 11:00 PM"
  },
  rating: {
    score: 4.8,
    totalReviews: 34,
    platform: "Google Reviews",
    googleReviewUrl: "https://maps.app.goo.gl/9Zf3o9tQW6P2Wf6G8" // Fallback / placeholder link to Google Maps reviews
  },
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.8924298132924!2d72.862451!3d19.228812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b0d91893ef2b%3A0xc39bc6bc964da15f!2sMagathane%20Metro%20Station!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  googleMapsDirectionsUrl: "https://www.google.com/maps/search/?api=1&query=Flora+Pharmacy+Shop+7+Samarpan+Western+Urban+Rd+Borivali+East+Mumbai",
  disclaimer: "Information on this website is for general purposes only and is not medical advice. Prescription medicines are dispensed strictly against a valid doctor's prescription. Please consult a qualified medical professional before taking any medication."
};

/**
 * Generates a pre-filled WhatsApp link for a single product.
 * Formats: https://wa.me/{number}?text={message}
 */
export function getProductWhatsAppUrl(productName) {
  const message = `Hello Flora Pharmacy, I want to order: ${productName}. Please confirm availability.`;
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a WhatsApp link for multiple items from the list enquiry.
 */
export function getMultiItemWhatsAppUrl(items) {
  if (!items || items.length === 0) {
    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Flora Pharmacy, I would like to enquire about medicines.")}`;
  }
  
  const itemListText = items
    .map((item, index) => `${index + 1}. ${item.name} (Qty: ${item.quantity || 1})`)
    .join("\n");

  const message = `Hello Flora Pharmacy, I would like to order the following items:\n\n${itemListText}\n\nPlease confirm availability and total price for delivery/pickup.`;
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a WhatsApp link for uploading prescription.
 */
export function getPrescriptionWhatsAppUrl() {
  const message = `Hello Flora Pharmacy, I have a doctor's prescription. I am sharing the photo here for medicine verification and home delivery.`;
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
