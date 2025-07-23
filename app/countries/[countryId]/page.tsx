import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { countries } from '@/data/country-list';
import { BarChart3, Globe } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function formatArea(area: number) {
  return new Intl.NumberFormat('en-US').format(area);
}

function formatAreaMiles(area: number) {
  const squareMiles = area * 0.386102; // 1 km² = 0.386102 mi²
  return new Intl.NumberFormat('en-US').format(Math.round(squareMiles));
}

export async function generateStaticParams() {


  return countries.map((country) => ({
    countryId: country.code,
  }));
}

export async function generateMetadata({ params }: { params: { countryId: string } }) {
  const country = countries.find((c) => c.code === params.countryId);

  if (!country) {
    return {
      title: 'Country Not Found',
      description: 'The specified country was not found.',
    };
  }

  return {
    title: `Welcome to ${country.name}`,
    description: `Explore information and details about ${country.name}.`,
    openGraph: {
      title: `Discover ${country.name}`,
      description: `Find insights and data about ${country.name}`,
      url: `https://seo-test-1-nu.vercel.app/countries/${country.code}`,
      siteName: 'Country Size Comparison',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Explore ${country.name}`,
      description: `Country information for ${country.name}`,
    },
  };
}

export default async function CountryDetails({ params }: { params: { countryId: string } }) {

 const country = countries.find((c) => c.code === params.countryId);

  if (!country) {
    return <div className="text-center text-red-500 mt-10">Country not found.</div>;
  }

  const maxArea = Math.max(...countries.map((c) => c.area));
  const widthPercentage = (country.area / maxArea) * 100;
  return (
    <div>
        <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Country Description for: {country.name}</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-2xl mx-auto p-6">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow will-change-transform">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl" role="img" aria-label={`${country.name} flag`}>
                {country.flag}
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">{country.name}</h3>
                <p className="text-sm text-gray-500">{country.continent}</p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Size Bar Visualization */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Relative Size</span>
              <span className="font-medium">{Math.round(widthPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 will-change-transform"
                style={{ width: `${widthPercentage}%` }}
                role="progressbar"
                aria-valuenow={Math.round(widthPercentage)}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          {/* Area Statistics */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Area (km²):</span>
              <span className="font-semibold">{formatArea(country.area)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Area (mi²):</span>
              <span className="font-semibold">{formatAreaMiles(country.area)}</span>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
    </div>
  );
}
