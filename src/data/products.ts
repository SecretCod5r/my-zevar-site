import { Product, Review } from '../types';

// Helper to generate a brand-compliant warm gradient SVG as placeholder image
export function getPlaceholderImage(id: string, name: string, angle = '135'): string {
  const bgStart = 'C9933A'; // Gold
  // Deep forest greens and warm chocolate tones for a sophisticated variety
  const bgEnds = ['1B3A2D', '11261E', '2D433A', '213327'];
  const index = Math.abs(id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % bgEnds.length;
  const bgEnd = bgEnds[index];
  
  // URL encode the SVG
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
    <defs>
      <linearGradient id="grad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%23${bgStart}" />
        <stop offset="100%" stop-color="%23${bgEnd}" />
      </linearGradient>
      <filter id="subtle-shadow" x="-5%" y="-5%" width="110%" height="110%">
        <blur stdDeviation="15" />
      </filter>
    </defs>
    
    <rect width="600" height="600" fill="url(%23grad-${id})" />
    
    <!-- Sophisticated ethnic motif/borders in background -->
    <rect x="30" y="30" width="540" height="540" fill="none" stroke="%23FAF7F2" stroke-width="1.5" stroke-opacity="0.35" />
    <rect x="40" y="40" width="520" height="520" fill="none" stroke="%23C9933A" stroke-width="1" stroke-opacity="0.4" />
    
    <!-- Traditional Indian Mandala outline element -->
    <circle cx="300" cy="300" r="140" fill="none" stroke="%23FAF7F2" stroke-width="1" stroke-opacity="0.25" stroke-dasharray="4,4" />
    <circle cx="300" cy="300" r="100" fill="none" stroke="%23C9933A" stroke-width="1" stroke-opacity="0.2" />
    <circle cx="300" cy="300" r="60" fill="none" stroke="%23FAF7F2" stroke-width="1" stroke-opacity="0.15" />
    
    <!-- Text Labels -->
    <text x="300" y="270" text-anchor="middle" fill="%23FAF7F2" font-family="Georgia, serif" font-weight="bold" font-size="28" font-style="italic" letter-spacing="1">My Zevar</text>
    <text x="300" y="320" text-anchor="middle" fill="%23FAF7F2" font-family="'DM Sans', sans-serif" font-weight="500" font-size="18" fill-opacity="0.95">${name}</text>
    <text x="300" y="350" text-anchor="middle" fill="%23C9933A" font-family="'DM Sans', sans-serif" font-weight="700" font-size="14" letter-spacing="1.5">ZEVAR COLLECTION</text>
    
    <!-- Traditional Diya / Motif representation -->
    <path d="M 300 180 Q 295 200 300 210 Q 305 200 300 180 Z" fill="%23C9933A" fill-opacity="0.8" />
  </svg>`;
  
  return `data:image/svg+xml;utf8,${svg.replace(/[\r\n\t]/g, ' ')}`;
}

// Subtitle image for thumbnail gallery (alternate design to show multiple angles/detail views)
export function getDetailPlaceholderImage(id: string, name: string, viewName: string): string {
  const bgStart = 'C9933A';
  const bgEnd = '1B3A2D';
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
    <rect width="600" height="600" fill="%23FAF7F2" />
    <rect x="20" y="20" width="560" height="560" fill="none" stroke="%231B3A2D" stroke-width="1" stroke-opacity="0.1" />
    
    <!-- Linear gradient banner -->
    <path d="M 0 0 L 600 0 L 600 120 L 0 240 Z" fill="none" />
    <rect x="40" y="40" width="520" height="520" fill="none" stroke="%23C9933A" stroke-width="1.5" stroke-dasharray="3,6" />
    
    <circle cx="300" cy="280" r="110" fill="none" stroke="%23C9933A" stroke-width="2" stroke-opacity="0.4" />
    <path d="M 300 170 C 240 280 360 280 300 390" fill="none" stroke="%231B3A2D" stroke-width="1.5" stroke-opacity="0.5" />
    
    <text x="300" y="450" text-anchor="middle" fill="%231B3A2D" font-family="Georgia, serif" font-weight="600" font-size="22" font-style="italic">${name}</text>
    <text x="300" y="485" text-anchor="middle" fill="%23C9933A" font-family="'DM Sans', sans-serif" font-weight="700" font-size="13" letter-spacing="2">CLOSEUP: ${viewName.toUpperCase()}</text>
    <text x="300" y="515" text-anchor="middle" fill="%23555555" font-family="'DM Sans', sans-serif" font-size="13">Premium Finish ✨ Real-occasion wear</text>
  </svg>`;
  
  return `data:image/svg+xml;utf8,${svg.replace(/[\r\n\t]/g, ' ')}`;
}

export const PRODUCTS: Product[] = [
  {
    id: 'zevar-001',
    name: 'Kundan Choker Necklace Set',
    category: 'Chokers',
    price: 349,
    originalPrice: 799,
    images: [
      getPlaceholderImage('zevar-001', 'Kundan Choker Set'),
      getDetailPlaceholderImage('zevar-001', 'Kundan Choker Set', 'Front Angle'),
      getDetailPlaceholderImage('zevar-001', 'Kundan Choker Set', 'Clasp & Adjuster'),
    ],
    badge: 'Bestseller',
    occasion: 'Festive',
    rating: 4.8,
    reviewCount: 142,
    description: 'Elevate your festive look instantly. A hand-picked gold-plated kundan choker complete with matching teardrop hanging earrings. Designed to fit comfortably with an adjustable drawstring.',
    included: '1 Kundan Choker Necklace + 1 Pair of Heavy Drop Earrings',
    isBestseller: true
  },
  {
    id: 'zevar-002',
    name: 'Floral Jhumka Earrings',
    category: 'Earrings',
    price: 299,
    originalPrice: 499,
    images: [
      getPlaceholderImage('zevar-002', 'Floral Jhumka Earrings'),
      getDetailPlaceholderImage('zevar-002', 'Floral Jhumka Earrings', 'Earring Detail'),
      getDetailPlaceholderImage('zevar-002', 'Floral Jhumka Earrings', 'Weight Mockup'),
    ],
    badge: 'Sale',
    occasion: 'Daily',
    rating: 4.6,
    reviewCount: 98,
    description: 'Perfect for college, office, or everyday elegance. Medium-sized floral dome jhumkas with beautiful pearl bead hangings. Lightweight enough to wear from morning to night.',
    included: '1 Pair of Floral Dome Jhumkas',
    isBestseller: true,
    isNewArrival: true
  },
  {
    id: 'zevar-003',
    name: 'Temple Lakshmi Antique Set',
    category: 'Temple Jewellery',
    price: 699,
    originalPrice: 1299,
    images: [
      getPlaceholderImage('zevar-003', 'Temple Lakshmi Antique Set'),
      getDetailPlaceholderImage('zevar-003', 'Temple Lakshmi Antique Set', 'Lakshmi Motif Closeup'),
      getDetailPlaceholderImage('zevar-003', 'Temple Lakshmi Antique Set', 'Necklace Length View'),
    ],
    badge: 'Bestseller',
    occasion: 'Wedding',
    rating: 4.9,
    reviewCount: 184,
    description: 'Be the perfect wedding guest. Intricately designed antique matte-gold plate temple necklace featuring the traditional Goddess Lakshmi coin motif, with matching coin-stud jhumkas.',
    included: '1 Temple Lakshmi Long Necklace + 1 Pair of Lakshmi Stud Jhumkis',
    isBestseller: true
  },
  {
    id: 'zevar-004',
    name: 'Pearl Bead Hanging Necklace Set',
    category: 'Necklace Sets',
    price: 399,
    originalPrice: 699,
    images: [
      getPlaceholderImage('zevar-004', 'Pearl Bead Hanging Necklace Set'),
      getDetailPlaceholderImage('zevar-004', 'Pearl Bead Hanging Necklace Set', 'Necklace Centerpiece'),
      getDetailPlaceholderImage('zevar-004', 'Pearl Bead Hanging Necklace Set', 'Earring Style'),
    ],
    badge: 'New',
    occasion: 'Daily',
    rating: 4.5,
    reviewCount: 65,
    description: 'Simple, delicate, and lovely. Designed for those busy days where you want to look complete with zero effort. Features tiny gold-plated beads suspended with high grade faux pearls.',
    included: '1 Pearl Hanging Necklace + 1 Pair of matching Pearl Studs',
    isNewArrival: true
  },
  {
    id: 'zevar-005',
    name: 'Royal Meenakari Chandbali Pairs',
    category: 'Earrings',
    price: 349,
    originalPrice: 599,
    images: [
      getPlaceholderImage('zevar-005', 'Meenakari Chandbalis'),
      getDetailPlaceholderImage('zevar-005', 'Meenakari Chandbalis', 'Enamel Pattern Closeup'),
    ],
    badge: 'New',
    occasion: 'Festive',
    rating: 4.7,
    reviewCount: 42,
    description: 'A touch of royal heritage. Traditional crescent-shaped Chandbali earrings with intricate Meenakari hand-painted enamelwork in red and green tones. Complements any kurta set perfectly.',
    included: '1 Pair of Meenakari Chandbali Earrings',
    isNewArrival: true
  },
  {
    id: 'zevar-006',
    name: 'Guttapusalu Pearl Choker Set',
    category: 'Chokers',
    price: 499,
    originalPrice: 899,
    images: [
      getPlaceholderImage('zevar-006', 'Guttapusalu Pearl Choker'),
      getDetailPlaceholderImage('zevar-006', 'Guttapusalu Pearl Choker', 'Guttapusalu Fringe'),
    ],
    badge: 'Bestseller',
    occasion: 'Wedding',
    rating: 4.8,
    reviewCount: 104,
    description: 'Stunning traditional Guttapusalu necklace redesigned for high comfort. Dozens of clusters of elegant micro-pearl drops stitched meticulously on a premium gold-polished collar.',
    included: '1 Guttapusalu Pearl Choker + 1 Pair of matching Pearl-fringe earrings',
    isBestseller: true
  },
  {
    id: 'zevar-007',
    name: 'Oxidized Silver Classic Set',
    category: 'Necklace Sets',
    price: 299,
    originalPrice: 499,
    images: [
      getPlaceholderImage('zevar-007', 'Oxidized Silver Classic Set'),
      getDetailPlaceholderImage('zevar-007', 'Oxidized Silver Classic Set', 'Oxidized Engraving'),
    ],
    badge: 'Sale',
    occasion: 'Daily',
    rating: 4.4,
    reviewCount: 112,
    description: 'Rustic boho design that pair beautifully with cotton sarees and fusion wear. Intricate floral antique silver plating with dangling tiny metallic bells that write rhythm into your steps.',
    included: '1 Oxidized Silver Collar Necklace + 1 Pair of Dome Jhumkis',
    isBestseller: false,
    isNewArrival: false
  },
  {
    id: 'zevar-008',
    name: 'Kemp Stone Temple Jhumkis',
    category: 'Earrings',
    price: 399,
    originalPrice: 699,
    images: [
      getPlaceholderImage('zevar-008', 'Kemp Stone Jhumkis'),
      getDetailPlaceholderImage('zevar-008', 'Kemp Stone Jhumkis', 'Kemp Ruby Inlays'),
    ],
    badge: 'Bestseller',
    occasion: 'Festive',
    rating: 4.9,
    reviewCount: 153,
    description: 'Deep ruby-red Kemp stone studs with dynamic hanging bell bottoms. Evokes the royal aura of south Indian classical dance jewellery, perfect to wear at festivals and family meetups.',
    included: '1 Pair of Kemp Stone Temple Jhumki Earrings',
    isBestseller: true
  },
  {
    id: 'zevar-009',
    name: 'Emerald Green Kundan Necklace Set',
    category: 'Necklace Sets',
    price: 599,
    originalPrice: 1199,
    images: [
      getPlaceholderImage('zevar-009', 'Emerald Green Kundan Set'),
      getDetailPlaceholderImage('zevar-009', 'Emerald Green Kundan Set', 'Green Drop Beads'),
    ],
    badge: 'New',
    occasion: 'Wedding',
    rating: 4.8,
    reviewCount: 37,
    description: 'Understated luxury. High-quality kundan embellishments bordered by rich emerald-green glass bead hangings. Includes matchless emerald teardrop pushback earrings for comfort hook.',
    included: '1 Kundan & Emerald Choker Necklace + 1 Pair of green-bead earrings',
    isNewArrival: true
  },
  {
    id: 'zevar-010',
    name: 'Filigree Classic Choker Set',
    category: 'Chokers',
    price: 399,
    originalPrice: 799,
    images: [
      getPlaceholderImage('zevar-010', 'Filigree Classic Choker'),
      getDetailPlaceholderImage('zevar-010', 'Filigree Classic Choker', 'Lace Filigree Work'),
    ],
    badge: 'Sale',
    occasion: 'Daily',
    rating: 4.3,
    reviewCount: 51,
    description: 'Beautifully crafted lace-like filigree patterns layered in lightweight gold plating. An perfect option for high-neck collared blouses or modern off-shoulder ethnic crop tops.',
    included: '1 Filigree Gold Choker Necklace + 1 Pair of matching stud earrings',
    isBestseller: false
  },
  {
    id: 'zevar-011',
    name: 'Antique Gold Laxmi Kasu Choker',
    category: 'Temple Jewellery',
    price: 449,
    originalPrice: 849,
    images: [
      getPlaceholderImage('zevar-011', 'Laxmi Kasu Choker'),
      getDetailPlaceholderImage('zevar-011', 'Laxmi Kasu Choker', 'Kasu Coins Close View'),
    ],
    badge: 'New',
    occasion: 'Festive',
    rating: 4.7,
    reviewCount: 29,
    description: 'Classic Kasu Mala coin design shortened into a modern comfortable collar choker format. Intricately stamped with images of Lakshmi, symbols of prosperity, prosperity, and joy.',
    included: '1 Kasu-coin Choker collar + 1 Pair of matching coin studs',
    isNewArrival: true
  },
  {
    id: 'zevar-012',
    name: 'Daily Wear Tiny Earring Studs',
    category: 'Earrings',
    price: 299,
    originalPrice: 499,
    images: [
      getPlaceholderImage('zevar-012', 'Daily Wear Studs'),
      getDetailPlaceholderImage('zevar-012', 'Daily Wear Studs', 'Four Styles Combination'),
    ],
    badge: 'Sale',
    occasion: 'Daily',
    rating: 4.5,
    reviewCount: 88,
    description: 'The absolute essential. Six distinct sets of tiny minimalist gold-plated and pearl-topped studs to coordinate with any casual outfit or kurta. Water-resistant and daily-certified coating.',
    included: '3 Pairs of versatile everyday-wear stud earrings',
    isBestseller: false
  }
];

export const REVIEWS: { [productId: string]: Review[] } = {
  'zevar-001': [
    { id: 'r1', author: 'Anjali Sharma', rating: 5, date: '2026-04-12', comment: 'Absolutely brilliant piece! It looks extremely rich and premium. The gold polish is perfect, not too bright, and the adjustable thread is so useful because I have a slightly thicker neck. Wore it to a cousin’s pre-wedding function and got 10+ compliments!', occasion: 'Festive wear' },
    { id: 'r2', author: 'Meera Rao', rating: 4, date: '2026-05-01', comment: 'Super happy with My Zevar. The necklace sits so well on the collarbone. Earrings are slightly heavy but very manageable. At ₹349, it’s an unbelievable steal. Delivery came in 3 days to Pune.', occasion: 'Festive wear' },
    { id: 'r3', author: 'Priya Patel', rating: 5, date: '2026-05-18', comment: 'Bought this because Neha’s story resonated with me so much. Truly, why pay thousands when you can get beautiful sets for ₹349? The finishing is super net and clean. Packaging was beautiful too.', occasion: 'Wedding guest' }
  ],
  'zevar-002': [
    { id: 'r4', author: 'Roshni Singh', rating: 5, date: '2026-04-20', comment: 'I wear these jhumkas to office almost daily now. They are so lightweight I literally forget I’m wearing them. The packaging is high-class and would make a great gift. Buy them without thinking twice!', occasion: 'Daily wear' },
    { id: 'r5', author: 'Nikita M.', rating: 4, date: '2026-05-10', comment: 'Very pretty. Matches both my dark green cotton kurta and ivory tunic. Pearl drops look secure and don’t make too much rattle noise.', occasion: 'Daily wear' }
  ],
  'zevar-003': [
    { id: 'r6', author: 'Kavitha S.', rating: 5, date: '2026-03-29', comment: 'Stunning antique finish. It has that matte, dark red-gold temple jewellery vibe that I’ve been searching for. Looks just like the real gold set my mother has. Weight is solid but non-pinching.', occasion: 'Wedding' },
    { id: 'r7', author: 'Shruti Iyer', rating: 5, date: '2026-05-02', comment: 'Gorgeous! The Lakshmi motifs are stamped very clearly. The back link feels sturdy and long. Highly recommend My Zevar for simple wedding guest styles.', occasion: 'Wedding guest' }
  ],
  'zevar-004': [
    { id: 'r8', author: 'Tanya Gupta', rating: 4, date: '2026-05-11', comment: 'Simple bead design. I love combining this with high neck linen dresses. The faux pearls are smooth and have a soft glossy glow. Wonderful purchase!', occasion: 'Daily wear' }
  ],
  'zevar-006': [
    { id: 'r9', author: 'Deepika K.', rating: 5, date: '2026-04-15', comment: 'Insanely gorgeous Guttapusalu! The pearl clusters are very dense and luxurious. My friends could not believe I bought this for ₹499.', occasion: 'Festive wear' }
  ]
};
