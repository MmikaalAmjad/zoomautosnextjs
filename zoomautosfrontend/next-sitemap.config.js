/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://zoomautos.co.uk', // Your live site URL
  generateRobotsTxt: true,            // Generate robots.txt
  sitemapSize: 5000,                  // Optional: split sitemap if large
  changefreq: 'daily',                // Optional: tells search engines how often pages change
  priority: 0.7,                      // Optional: priority for indexing
  exclude: ['/admin/*', '/login'],    // Optional: pages you don’t want indexed
};
