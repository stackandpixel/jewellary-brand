export const BRAND_CONFIG = {
  name: 'GoldenAura Jewellery',
  tagline: 'A Golden Touch for Every Occasion',
  shortBio: 'Exquisite 1-gram gold jewellery, handcrafted gold-plated ornaments, and festive Indian bridal collections designed with heirloom artistry.',
  establishedYear: '2019',
  
  // Location & Contacts
  location: {
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    address: 'Studio 402, Heritage Plaza, FC Road, Shivajinagar, Pune 411005',
    pincode: '411005',
    operatingHours: 'Mon - Sat: 10:30 AM - 8:00 PM IST (Sun Closed)',
  },
  
  contact: {
    phone: '+91 98765 43210',
    whatsappNumber: '919876543210', // digits only for wa.me link
    displayWhatsapp: '+91 98765 43210',
    email: 'hello@goldenaura.example',
    instagramHandle: '@goldenaura.jewellery',
    instagramUrl: 'https://instagram.com',
  },
  
  // Commercial & E-commerce Settings
  currency: {
    code: 'INR',
    symbol: '₹',
  },
  
  shipping: {
    freeShippingThreshold: 1499,
    standardShippingFee: 99,
    codAvailable: true,
    codConvenienceFee: 49,
    estimatedDaysLocal: '2 - 3 business days',
    estimatedDaysNational: '4 - 6 business days',
  },
  
  announcement: {
    text: 'Festive Collection Now Live | Discover Your New Favourite Pieces',
    enabled: true,
  },
  
  // Transparency Notice (Anti-Slop & Indian E-Commerce compliance)
  disclaimer: {
    materials: 'All jewellery offered on GoldenAura features high-grade brass alloy with premium 1-gram gold plating or micro-micron gold finish. Items are non-solid gold fashion and imitation jewellery.',
    sampleNotice: 'GoldenAura Jewellery is a fictional demonstration brand created for portfolio showcasing. Customer reviews and order enquiries shown here are sample data.',
  }
};

/**
 * Format number into Indian currency style (e.g. ₹1,499 or ₹12,500)
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
