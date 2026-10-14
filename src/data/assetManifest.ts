export interface AssetManifestEntry {
  id: string;
  filename: string;
  targetPath: string;
  category: 'banner' | 'product' | 'collection' | 'lifestyle' | 'video';
  dimensions: string;
  aspectRatio: string;
  format: 'WebP' | 'AVIF' | 'MP4';
  prompt: string;
  status: 'manifest_ready' | 'generated' | 'fallback_active';
  description: string;
}

export const ASSET_MANIFEST: AssetManifestEntry[] = [
  {
    id: 'hero-01',
    filename: 'hero_goldenaura_model.webp',
    targetPath: 'public/images/banners/hero_goldenaura_model.webp',
    category: 'banner',
    dimensions: '1920x1080',
    aspectRatio: '16:9',
    format: 'WebP',
    status: 'fallback_active',
    description: 'Main campaign banner featuring an Indian model wearing gold-look jewellery',
    prompt: 'Create a premium Indian jewellery campaign photograph for a contemporary jewellery e-commerce brand. An elegant adult Indian woman wearing a beautifully detailed gold-look necklace and matching earrings with a sophisticated traditional Indian outfit. Deep emerald-green and warm champagne-gold palette, refined studio lighting, realistic skin texture, intricate jewellery details, premium editorial photography, elegant luxurious mood, landscape 16:9 composition, subject positioned on the right, clean negative space on the left for website headline text, no text, no logos, no watermark.',
  },
  {
    id: 'prod-temple-necklace',
    filename: 'royal_temple_necklace.webp',
    targetPath: 'public/images/products/royal_temple_necklace.webp',
    category: 'product',
    dimensions: '1200x1200',
    aspectRatio: '1:1',
    format: 'WebP',
    status: 'fallback_active',
    description: 'Professional product photography for temple necklace set',
    prompt: 'Professional e-commerce product photograph of an intricate Indian gold-plated necklace set with matching earrings, displayed on a premium deep emerald velvet jewellery bust, accurate jewellery proportions, fine decorative detailing, warm studio highlights, realistic metal reflections, soft controlled shadows, luxury catalogue photography, centred composition, square 1:1 crop, sharp focus, no text, no logo, no watermark.',
  },
  {
    id: 'prod-jhumkas',
    filename: 'golden_bloom_jhumkas.webp',
    targetPath: 'public/images/products/golden_bloom_jhumkas.webp',
    category: 'product',
    dimensions: '1200x1200',
    aspectRatio: '1:1',
    format: 'WebP',
    status: 'fallback_active',
    description: 'Product photography for traditional Indian jhumka earrings',
    prompt: 'Professional studio macro photograph of traditional Indian gold-plated jhumka earrings with delicate pearl droplets, displayed on clean warm ivory stone pedestal, intricate filigree and floral motif, warm champagne lighting, razor sharp details, luxury jewellery e-commerce, 1:1 square crop, no text, no watermark.',
  },
  {
    id: 'prod-bangles',
    filename: 'gold_bangles_kadas.webp',
    targetPath: 'public/images/products/gold_bangles_kadas.webp',
    category: 'product',
    dimensions: '1200x1200',
    aspectRatio: '1:1',
    format: 'WebP',
    status: 'fallback_active',
    description: 'Product photography for handcrafted gold-look bangles and kadas',
    prompt: 'Professional studio product photograph of a pair of handcrafted Indian gold-plated bangles (kadas) with embossed floral engraving, resting on soft textured raw silk fabric, warm golden gleam, subtle shadows, luxury Indian jewellery, 1:1 square crop, no watermark.',
  },
  {
    id: 'campaign-bridal',
    filename: 'bridal_collection_editorial.webp',
    targetPath: 'public/images/collections/bridal_collection_editorial.webp',
    category: 'collection',
    dimensions: '1200x1500',
    aspectRatio: '4:5',
    format: 'WebP',
    status: 'fallback_active',
    description: 'Bridal jewellery campaign editorial',
    prompt: 'Premium editorial photograph of an adult Indian bride wearing ornate traditional gold-look bridal jewellery, including a statement necklace, matching earrings, and bangles, richly coloured Indian bridal attire, elegant natural pose, tasteful traditional styling, warm golden light, realistic jewellery details, luxurious wedding campaign photography, vertical 4:5 composition, no text, no logos, no watermark.',
  },
  {
    id: 'campaign-festive',
    filename: 'festive_collection_editorial.webp',
    targetPath: 'public/images/collections/festive_collection_editorial.webp',
    category: 'collection',
    dimensions: '1200x1500',
    aspectRatio: '4:5',
    format: 'WebP',
    status: 'fallback_active',
    description: 'Modern festive jewellery campaign editorial',
    prompt: 'Modern Indian festive jewellery campaign featuring an adult Indian woman wearing elegant gold-plated earrings and a necklace with contemporary ethnic attire, warm ivory and champagne-gold backdrop, sophisticated festive atmosphere, premium beauty and jewellery advertising photography, realistic anatomy and jewellery, portrait 4:5 composition, no text, no logos, no watermark.',
  },
  {
    id: 'prod-packaging',
    filename: 'luxury_brand_packaging.webp',
    targetPath: 'public/images/lifestyle/luxury_brand_packaging.webp',
    category: 'lifestyle',
    dimensions: '1200x1200',
    aspectRatio: '1:1',
    format: 'WebP',
    status: 'fallback_active',
    description: 'Elegant brand packaging box and presentation',
    prompt: 'Premium jewellery packaging box open showing elegant gold-plated jewellery nestled on emerald green velvet cushion with champagne gold foil ribbon, warm soft studio lighting, luxury gifting presentation, 1:1 square, sharp focus, no text, no watermark.',
  },
  {
    id: 'prod-mangalsutra',
    filename: 'mangalsutra_traditional.webp',
    targetPath: 'public/images/products/mangalsutra_traditional.webp',
    category: 'product',
    dimensions: '1200x1200',
    aspectRatio: '1:1',
    format: 'WebP',
    status: 'fallback_active',
    description: 'Close-up product photography for traditional mangalsutras',
    prompt: 'Professional product photograph of an elegant 1-gram gold traditional Indian mangalsutra necklace with delicate black beads and intricate gold pendant, displayed on a cream minimalist display stand, soft directional lighting, luxury catalogue, 1:1 square, sharp detail, no text, no watermark.',
  },
  {
    id: 'video-campaign',
    filename: 'golden_radiance_campaign.mp4',
    targetPath: 'public/videos/golden_radiance_campaign.mp4',
    category: 'video',
    dimensions: '1080x1920',
    aspectRatio: '9:16',
    format: 'MP4',
    status: 'manifest_ready',
    description: 'Short 10-second vertical social reel showcasing jewellery luster and movement',
    prompt: 'Slow motion 60fps macro camera pan over intricate 1-gram gold temple necklace, warm studio rim lighting catching micro facets and pearl droplets, soft velvet background, ultra-high definition commercial cinematography.',
  },
];
