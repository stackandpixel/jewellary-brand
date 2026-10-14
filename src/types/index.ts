export type JewelleryCategory = 
  | 'necklaces'
  | 'earrings'
  | 'bangles'
  | 'rings'
  | 'mangalsutras'
  | 'jewellery-sets'
  | 'bridal'
  | 'daily-wear'
  | 'festive';

export type JewelleryStyle = 
  | '1-Gram Gold'
  | 'Gold-Plated'
  | 'Temple Jewellery'
  | 'Kundan & Polki'
  | 'Antique Brass'
  | 'Meenakari';

export type JewelleryOccasion = 
  | 'Wedding'
  | 'Festive'
  | 'Daily Wear'
  | 'Party'
  | 'Gifting';

export type JewelleryFinish = 
  | '24K Matt Gold'
  | 'Antique Gold'
  | 'Yellow Gold Gloss'
  | 'Rose Gold'
  | 'Two-Tone';

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: JewelleryCategory;
  categoryLabel: string;
  style: JewelleryStyle;
  finish: JewelleryFinish;
  occasion: JewelleryOccasion[];
  inStock: boolean;
  stockCount: number;
  isBestseller?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  materialDetails: {
    baseMetal: string;
    plating: string;
    stones?: string;
    purityDisclaimer: string;
  };
  dimensions: {
    length?: string;
    width?: string;
    weight: string;
    sizeAvailable?: string[];
  };
  careTips: string[];
  images: string[];
  features: string[];
}

export interface CategoryInfo {
  id: JewelleryCategory;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  tagline: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'whatsapp' | 'cod' | 'online_demo';
  orderNotes?: string;
}

export interface FilterState {
  category: string;
  style: string;
  minPrice: number;
  maxPrice: number;
  occasion: string;
  availability: 'all' | 'in_stock';
  finish: string;
  searchQuery: string;
  sortBy: 'featured' | 'price_asc' | 'price_desc' | 'newest' | 'rating';
}
