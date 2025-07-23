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
  title: {
    default: 'Country Size Comparison - Compare Land Areas Worldwide',
    template: '%s | Country Size Comparison',
  },
  description:
    'Compare the land areas of countries around the world with interactive visualizations and detailed statistics. Discover which countries are larger or smaller than others.',
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
     
      <body className={`${inter.variable} font-sans antialiased`}>
      {children}
      </body>
    </html>
  );
}