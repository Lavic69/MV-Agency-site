import { MetadataRoute } from 'next'

// 👇 À remplacer également
const BASE_URL = 'https://mv-agency.com'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
