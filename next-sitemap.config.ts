import type { IConfig } from 'next-sitemap';

const config: IConfig = {
  siteUrl: 'https://jnuihc.netlify.app', // your deployed site URL
  generateRobotsTxt: true, // generate robots.txt file
  sitemapSize: 7000, // optional, for very large sites
  exclude: ['/dashboard/*'], // optional, exclude admin/dashboard routes
};

export default config;
