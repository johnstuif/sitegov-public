export const prerender = true;

const SITE = 'https://sitegov.io';

const pages = [
  { loc: '/',                   priority: '1.0', changefreq: 'weekly'  },
  { loc: '/what-is-sitegov/',  priority: '0.9', changefreq: 'monthly' },
  { loc: '/use-cases/',         priority: '0.8', changefreq: 'monthly' },
  { loc: '/pricing/',           priority: '0.8', changefreq: 'monthly' },
  { loc: '/contact/',           priority: '0.5', changefreq: 'yearly'  },
];

const lastmod = new Date().toISOString().split('T')[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${SITE}${p.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

export function GET() {
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
