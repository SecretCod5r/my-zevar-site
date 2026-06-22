# My Zevar

Elegant ethnic jewellery e-commerce store — built with React + Vite + Tailwind, deployable on Vercel.

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Add the following **Environment Variables** in Vercel Project Settings:

| Variable | Description |
|----------|-------------|
| `ODOO_URL` | Your Odoo instance URL (e.g. `https://myzevar.odoo.com`) |
| `ODOO_DB` | Odoo database name |
| `ODOO_USER` | Odoo login email |
| `ODOO_PASS` | Odoo login password |

4. Deploy — Vercel auto-detects Vite and builds correctly.

## Local Development

```bash
npm install
cp .env.example .env   # fill in your Odoo credentials
npm run dev
```

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS v4
- Vercel Serverless Functions (API routes in `/api/`)
- Odoo ERP integration for live product catalog & order submission
