# 🌿 Flora Pharmacy Website

A modern, mobile-first showcase web application for **Flora Pharmacy**, located in Borivali East, Mumbai.

Built with **React**, **Vite**, **Tailwind CSS**, and **Lucide React**. Designed to provide a frictionless experience where customers can browse authentic products, request quotes, upload prescriptions, or order directly via pre-filled WhatsApp messages—without cumbersome account logins or complicated checkout gateways.

---

## 📍 Store Information
- **Business Name**: Flora Pharmacy
- **Address**: Shop No. 7, Samarpan, Western Urban Rd, near Magathane Metro Station, near Rivali Park, Borivali East, Mumbai, Maharashtra 400066
- **Working Hours**: Monday to Sunday, 9:00 AM – 11:00 PM (7 Days a week)
- **Phone**: [+91 86570 90405](tel:+918657090405)
- **WhatsApp for Orders**: [918657090405](https://wa.me/918657090405)
- **Google Rating**: 4.8 / 5.0 (34+ reviews)
- **Services**: Retail Pharmacy & Fast Local Home Delivery

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (version 18+ or 20+)
- npm or pnpm

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the port displayed in your terminal).

### 3. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory ready for static hosting.

---

## 🛠️ Pharmacy Owner Guide

### (A) How to Edit, Add, or Remove Products
All products live in a single editable file: **[`src/data/products.js`](./src/data/products.js)**.

#### 1. Adding a New Product
Open `src/data/products.js` and add a new entry to the `PRODUCTS` array:
```javascript
{
  id: "my-new-product-id",
  name: "Generic Vitamin B12 Tablets",
  category: "Vitamins & Supplements",
  description: "High potency sublingual tablets for daily neurological and energy support.",
  form: "30 Tablets / Bottle",
  requiresPrescription: false, // Set to true if Rx is mandatory
  tag: "Vitality",
  image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
}
```

#### 2. Available Categories:
- `Prescription Medicines`
- `OTC & Fever/Cold`
- `Vitamins & Supplements`
- `Diabetic Care`
- `Baby Care`
- `Personal Care`
- `Ayurvedic`
- `First Aid`
- `Health Devices`
- `Elderly Care`
- `Surgical Items`

#### 3. Removing a Product
Simply delete or comment out the corresponding object block in `src/data/products.js`.

---

### (B) How to Change the WhatsApp Number or Business Details
All business details (phone number, WhatsApp number, address, hours, ratings) live in **[`src/data/business.js`](./src/data/business.js)**.

```javascript
export const BUSINESS_INFO = {
  name: "Flora Pharmacy",
  phone: "+91 86570 90405",
  phoneRaw: "+918657090405",
  whatsappNumber: "918657090405", // Digits only with country code (91 for India)
  hours: "Monday to Sunday, 9:00 AM to 11:00 PM",
  // ...
};
```
When you change `whatsappNumber`, all product buttons, the multi-item list drawer, prescription upload, and floating action buttons automatically update to the new number.

---

### (C) How to Deploy to Vercel or Netlify (100% Free)

#### Deploying on Vercel:
1. Push your code to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Framework Preset will auto-detect as **Vite**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **"Deploy"**. Your site will be live on a fast global CDN in under 1 minute!

#### Deploying on Netlify:
1. Push your code to GitHub.
2. Sign in to [Netlify](https://netlify.com) and select **"Add new site" > "Import an existing project"**.
3. Select your repository.
4. Settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click **"Deploy site"**.

---

## 🌟 Key Features
- **Mobile-First UX**: Responsive layout optimized for smartphones.
- **Dynamic WhatsApp Pre-fill**: Single product ordering and multi-item basket generation with URL-encoded messages.
- **Instant Prescription Upload**: Dedicated camera-to-WhatsApp prescription dispatch workflow.
- **Interactive Carousel & Grid**: Smooth horizontal swipe carousel with pause-on-hover, arrow controls, and grid toggle.
- **Real-Time Search**: Instant filtering across all 68+ medicines and healthcare devices.
- **SEO & Performance**: Pre-configured JSON-LD `Pharmacy` schema, Open Graph tags, and zero-layout-shift design.
- **Compliance & Trust**: Explicit statutory disclaimer for prescription dispensing and medical advice warnings.
