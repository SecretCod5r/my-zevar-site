import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { url, db, username, password, customer, cart } = req.body;
    if (!url || !db || !username || !password || !customer || !cart?.length) {
      return res.status(400).json({ success: false, error: 'Missing required order information.' });
    }

    const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    const endpoint = `${cleanUrl}/jsonrpc`;

    // 1. Authenticate
    const authRes = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0', method: 'call',
        params: { service: 'common', method: 'login', args: [db, username, password] },
        id: Date.now()
      })
    });
    const authData = await authRes.json() as any;
    if (authData.error) throw new Error(authData.error.message);
    const uid = authData.result;
    if (!uid) return res.status(401).json({ success: false, error: 'Authentication failed.' });

    // 2. Find or create partner
    const partnerSearchRes = await fetch(endpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0', method: 'call',
        params: { service: 'object', method: 'execute_kw', args: [db, uid, password, 'res.partner', 'search', [[[' email', '=', customer.email]]]] },
        id: Date.now() + 1
      })
    });
    const partnerSearchData = await partnerSearchRes.json() as any;
    let partnerId: number;

    if (partnerSearchData.result?.length > 0) {
      partnerId = partnerSearchData.result[0];
    } else {
      const createPartnerRes = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0', method: 'call',
          params: { service: 'object', method: 'execute_kw', args: [db, uid, password, 'res.partner', 'create', [{
            name: customer.name, email: customer.email, phone: customer.phone,
            street: customer.address || '', city: customer.city || '', zip: customer.zip || ''
          }]] },
          id: Date.now() + 2
        })
      });
      const createPartnerData = await createPartnerRes.json() as any;
      if (createPartnerData.error) throw new Error(createPartnerData.error.message);
      partnerId = createPartnerData.result;
    }

    // 3. Create sale order
    const createOrderRes = await fetch(endpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0', method: 'call',
        params: { service: 'object', method: 'execute_kw', args: [db, uid, password, 'sale.order', 'create', [{
          partner_id: partnerId,
          note: `Order from storefront. Payment: COD. Phone: ${customer.phone}. Address: ${customer.address}, ${customer.city}, ${customer.zip}`
        }]] },
        id: Date.now() + 3
      })
    });
    const createOrderData = await createOrderRes.json() as any;
    if (createOrderData.error) throw new Error(createOrderData.error.message);
    const orderId = createOrderData.result;

    // 4. Add order lines
    for (const item of cart) {
      let odooProductId: number | null = null;

      if (item.product.id.startsWith('odoo-')) {
        const tmplId = Number(item.product.id.split('-')[1]);
        if (!isNaN(tmplId)) {
          const variantRes = await fetch(endpoint, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0', method: 'call',
              params: { service: 'object', method: 'execute_kw', args: [db, uid, password, 'product.product', 'search', [[[' product_tmpl_id', '=', tmplId]]]] },
              id: Date.now() + 4
            })
          });
          const variantData = await variantRes.json() as any;
          if (variantData.result?.length > 0) odooProductId = variantData.result[0];
        }
      }

      if (!odooProductId) {
        const fallbackRes = await fetch(endpoint, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0', method: 'call',
            params: { service: 'object', method: 'execute_kw', args: [db, uid, password, 'product.product', 'search', [[[' name', 'ilike', item.product.name]]]] },
            id: Date.now() + 5
          })
        });
        const fallbackData = await fallbackRes.json() as any;
        if (fallbackData.result?.length > 0) odooProductId = fallbackData.result[0];
      }

      if (odooProductId) {
        await fetch(endpoint, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0', method: 'call',
            params: { service: 'object', method: 'execute_kw', args: [db, uid, password, 'sale.order.line', 'create', [{
              order_id: orderId, product_id: odooProductId,
              product_uom_qty: item.quantity, price_unit: item.product.price,
              name: `${item.product.name} [Store Item]`
            }]] },
            id: Date.now() + 6
          })
        });
      }
    }

    return res.json({ success: true, orderId });
  } catch (err: any) {
    console.error('[Submit Order]', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
}
