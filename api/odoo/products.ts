import type { VercelRequest, VercelResponse } from '@vercel/node';

const ODOO_URL = process.env.ODOO_URL || 'https://myzevar.odoo.com';
const ODOO_DB = process.env.ODOO_DB || 'myzevar';
const ODOO_USER = process.env.ODOO_USER || '';
const ODOO_PASS = process.env.ODOO_PASS || '';

const getPlaceholder = (idStr: string, prodName: string) => {
  const bgEnds = ['1B3A2D', '11261E', '2D433A', '213327'];
  let charSum = 0;
  for (let i = 0; i < idStr.length; i++) charSum += idStr.charCodeAt(i);
  const bgEnd = bgEnds[Math.abs(charSum) % bgEnds.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
    <defs><linearGradient id="grad-${idStr}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23C9933A" /><stop offset="100%" stop-color="%23${bgEnd}" />
    </linearGradient></defs>
    <rect width="600" height="600" fill="url(%23grad-${idStr})" />
    <rect x="30" y="30" width="540" height="540" fill="none" stroke="%23FAF7F2" stroke-width="1.5" stroke-opacity="0.35" />
    <circle cx="300" cy="300" r="140" fill="none" stroke="%23FAF7F2" stroke-width="1" stroke-opacity="0.2" stroke-dasharray="4,4" />
    <text x="300" y="270" text-anchor="middle" fill="%23FAF7F2" font-family="Georgia, serif" font-weight="bold" font-size="28" font-style="italic">My Zevar</text>
    <text x="300" y="320" text-anchor="middle" fill="%23FAF7F2" font-family="DM Sans, sans-serif" font-weight="500" font-size="18">${prodName}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${svg.replace(/[\r\n\t]/g, ' ')}`;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const cleanUrl = ODOO_URL.endsWith('/') ? ODOO_URL.slice(0, -1) : ODOO_URL;
    const endpoint = `${cleanUrl}/jsonrpc`;

    const authRes = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0', method: 'call',
        params: { service: 'common', method: 'login', args: [ODOO_DB, ODOO_USER, ODOO_PASS] },
        id: Date.now()
      })
    });

    const authData = await authRes.json() as any;
    if (authData.error) throw new Error(authData.error.message);
    const uid = authData.result;
    if (!uid) throw new Error('Odoo authentication failed');

    const productsRes = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0', method: 'call',
        params: {
          service: 'object', method: 'execute_kw',
          args: [ODOO_DB, uid, ODOO_PASS, 'product.template', 'search_read',
            [[[' sale_ok', '=', true]]],
            { fields: ['id', 'name', 'list_price', 'description_sale', 'image_512', 'categ_id'], limit: 50 }
          ]
        },
        id: Date.now() + 1
      })
    });

    const productsData = await productsRes.json() as any;
    if (productsData.error) throw new Error(productsData.error.message);
    const raw = productsData.result || [];

    const products = raw.map((item: any, idx: number) => {
      const id = `odoo-${item.id}`;
      const name = item.name || 'Exquisite Jewellery';
      const desc = item.description_sale || '';
      const text = `${name} ${desc}`.toLowerCase();
      let odooCat = '';
      if (item.categ_id?.[1]) odooCat = String(item.categ_id[1]).toLowerCase();
      const match = `${text} ${odooCat}`;

      let category: string = 'Necklace Sets';
      if (match.includes('earring') || match.includes('jhumka') || match.includes('tops') || match.includes('balis')) category = 'Earrings';
      else if (match.includes('choker') || match.includes('collar') || match.includes('gala')) category = 'Chokers';
      else if (match.includes('temple') || match.includes('antique') || match.includes('traditional') || match.includes('kemp')) category = 'Temple Jewellery';

      let occasion = 'Daily';
      if (text.includes('wedding') || text.includes('bride') || text.includes('bridal') || text.includes('heavy')) occasion = 'Wedding';
      else if (text.includes('festive') || text.includes('diwali') || text.includes('pooja') || text.includes('party')) occasion = 'Festive';

      const isBestseller = idx % 3 === 0 || text.includes('best') || text.includes('popular');
      const isNewArrival = idx % 3 === 1 || text.includes('new') || text.includes('latest');
      const imgUrl = item.image_512 ? `data:image/png;base64,${item.image_512}` : getPlaceholder(id, name);

      return {
        id, name, category,
        price: Number(item.list_price) || 499,
        originalPrice: Math.round((Number(item.list_price) || 499) * 1.6),
        badge: isBestseller ? 'Bestseller' : isNewArrival ? 'New' : 'Featured',
        occasion,
        description: desc || `${name} — A hand-crafted masterpiece from our jewellery collection.`,
        included: '1 Premium Jewellery Unit & Custom Suede Box',
        rating: Number((4.5 + Math.random() * 0.5).toFixed(1)),
        reviewCount: Math.floor(Math.random() * 45) + 8,
        images: [imgUrl],
        isBestseller, isNewArrival
      };
    });

    return res.json({ success: true, products });
  } catch (err: any) {
    console.error('[Odoo Products]', err.message);
    return res.status(500).json({ success: false, error: err.message, products: [] });
  }
}
