import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Optimize font loading with preload
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Country Size Comparison - Compare Land Areas Worldwide',
  description: 'Compare the land areas of countries around the world with interactive visualizations and detailed statistics. Discover which countries are larger or smaller than others.',
  keywords: 'country size comparison, land area, geography, world countries, statistics',
  authors: [{ name: 'Country Size Comparison' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  other: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <title>Country Size Comparison - Compare Land Areas Worldwide</title>
      <meta name="description" content="Compare the land areas of countries around the world with interactive visualizations and detailed statistics. Discover which countries are larger or smaller than others." />
      <meta name="keywords" content="country size comparison, land area, geography, world countries, statistics" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Country Size Comparison" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="canonical" href="https://seo-test-1-nu.vercel.app/" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
      {children}
      </body>
    </html>
  );
}