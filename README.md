# GoldenAura Jewellery — Premium Indian E-Commerce Website

A complete, responsive e-commerce web application for **GoldenAura Jewellery**, a fictional luxury Indian jewellery brand based in Pune, Maharashtra, specializing in 1-gram gold jewellery, gold-plated ornaments, temple jewellery, and festive bridal trousseaus.

Built for **Stack & Pixel** as a client-ready showcase architecture for Indian jewellery retail businesses.

---

## 1. Features & Architecture

- **Regal Editorial Visual Design**: Inspired by Indian luxury jewellery ateliers, featuring deep emerald (`#0B1F16`), champagne gold (`#D4AF37`), warm ivory, and soft sand surfaces with Cinzel and Playfair Display serif typography.
- **Strict Anti-Slop Discipline**: Zero static pill capsules, natural editorial typography, WCAG AA contrast compliance, responsive 1440px desktop balance with mobile-first optimizations for Indian smartphone shoppers.
- **Zero Broken Image Resilience**: Built-in luxury SVG jewellery craftsmanship rendering engine providing authentic gold luster, kemp rubies, and temple motifs when remote assets are offline.
- **24+ Product Catalogue**: Detailed sample inventory spanning Necklaces, Jhumkas, Bangles, Finger Rings, Mangalsutras, and Bridal Suites with complete gram weights, Indian sizing, and material disclosures.
- **Faceted Search & Filtering**: Client-side filtering by category, jewellery style (1-Gram Gold, Temple, Kundan, Meenakari), price brackets, occasion, finish, and instant keyboard search with URL synchronization.
- **Persistent Shopping Bag & Wishlist**: LocalStorage-persisted cart with quantity steppers, discount promo codes (`FESTIVE10`, `FIRSTGOLD`), and free delivery threshold meters (₹1,499+).
- **Dual Checkout & WhatsApp Concierge**:
  - Direct WhatsApp click-to-chat order enquiry prefilled with itemized SKU list, quantities, subtotal, and customer delivery address.
  - Indian Address Checkout form with instant Pune vs Pan-India transit estimation.
  - Clear separation between demo checkout and production payment gateways.
- **Material Transparency & Care Guidelines**: Distinctly differentiates 1-gram gold brass alloy from solid 22K bullion gold, paired with an extensive jewellery care guide.

---

## 2. Technology Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss";`)
- **Icons**: Lucide React
- **Routing**: React Router v7 (`react-router-dom`)
- **State & Storage**: React Context API with LocalStorage persistence
- **Indian Currency Engine**: `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })`

---

## 3. Getting Started Locally

### Prerequisites
- Node.js 18+ or 20+
- npm or bun

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd goldenaura-jewellery

# Install dependencies
npm install

# Start local development server (port 3000)
npm run dev
```
Visit `http://localhost:3000` in your web browser.

### Build and Type Check
```bash
# Type check without emitting
npm run lint

# Production build
npm run build

# Preview production build
npm run preview
```

---

## 4. Centralized Store Configuration

All brand settings, contact numbers, studio locations, and policies are stored centrally in:
```typescript
src/config/brandConfig.ts
```
To adapt this application for a real merchant, edit this single file:
- `BRAND_CONFIG.name`: Merchant name
- `BRAND_CONFIG.contact.whatsappNumber`: 10-digit Indian mobile with country code (e.g. `919876543210`)
- `BRAND_CONFIG.location.address`: Showroom / GST-registered address
- `BRAND_CONFIG.shipping.freeShippingThreshold`: Free delivery minimum in ₹
- `BRAND_CONFIG.disclaimer`: Legal purity and materials disclaimer

---

## 5. Deployment Guide

### A. Deploy to Vercel (Recommended)
1. Push your repository to GitHub or GitLab.
2. Import the project into the [Vercel Dashboard](https://vercel.com).
3. The Vite framework preset will be auto-detected.
4. Ensure SPA routing by adding a root `vercel.json` if needed:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### B. Deploy to Cloudflare Pages
1. In Cloudflare Pages, connect your repository.
2. Set Build Command: `npm run build`
3. Set Build Output Directory: `dist`
4. Add a `_redirects` file in `public/_redirects` containing:
```
/*    /index.html   200
```

### C. Connecting a Custom Domain
- **Root Domain (`@`)**: Add an `A` record pointing to `76.76.21.21` (Vercel) or your host IP.
- **Subdomain (`www`)**: Add a `CNAME` record pointing to `cname.vercel-dns.com` or your Pages URL.

---

## 6. Production Payment Integration (Razorpay)

For production deployment with automated payment processing, follow this architecture:

1. **Do NOT place Razorpay Secret Key in frontend code.**
2. Set up a secure Node.js / Express backend or serverless function:
   - `POST /api/checkout/create-order`: Generates `razorpay_order_id` with cart amount in paise.
   - `POST /api/checkout/verify-payment`: Validates HMAC-SHA256 signature using `crypto.createHmac` and `RAZORPAY_KEY_SECRET`.
3. In the React frontend, include the Razorpay Checkout script (`https://checkout.razorpay.com/v1/checkout.js`) and pass `order_id` to `Razorpay(options).open()`.

---

## 7. Quality & Testing Checklist

- [x] Responsive layout from 320px mobile screens to 1440px+ desktop viewports.
- [x] Zero broken images: high-fidelity vector craftsmanship engine active on all 24+ catalogue items.
- [x] Working navigation across Home, Shop All, 1-Gram Gold, Bridal, Festive, About, Care Guide, FAQs, Contact, and Policies.
- [x] Multi-facet filters (Category, Style, Price Range, Occasion, Finish) and real-time sorting.
- [x] Shopping Bag slide-out drawer with quantity steppers, item removal, and subtotal calculation.
- [x] Promo code validation (`FESTIVE10` for 10% off, `FIRSTGOLD` for 15% off).
- [x] WhatsApp order enquiry link construction with complete itemized breakdown and customer delivery details.
- [x] Indian Pincode delivery estimator on Product Detail Page.
- [x] Wishlist state persistence across page refreshes via LocalStorage.
- [x] Instant search modal with keyboard escape and quick filters.
- [x] TypeScript type checking (`npm run lint`) and Vite build (`npm run build`) passing with zero errors.

---

## 8. Pre-Production Merchant Replacement Checklist

Before launching for a live commercial business:
1. Replace placeholder WhatsApp number `+91 98765 43210` with the client's verified WhatsApp Business number.
2. Replace Pune placeholder address (`Studio 402, Heritage Plaza, FC Road`) with the actual showroom address and Google Maps embed.
3. Update `src/data/products.ts` with the merchant's real product catalogue, actual photographs, weights in grams, and prices.
4. Replace sample email (`hello@goldenaura.example`) and Instagram handle (`@goldenaura.jewellery`).
5. Have a legal advisor review the Return, Shipping, and Privacy policy templates in `src/pages/PoliciesPage.tsx`.

---

© 2026 GoldenAura Jewellery. Created for Stack & Pixel portfolio demonstration.
