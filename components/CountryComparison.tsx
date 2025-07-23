'use client';

import { useState, useMemo, useCallback, useTransition, useDeferredValue, startTransition, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, ArrowRight } from 'lucide-react';

// Lazy load components to reduce initial bundle
const VirtualizedCountryList = lazy(() => import('./VirtualizedCountryList').then(mod => ({ default: mod.VirtualizedCountryList })));

import { useDebounce } from '@/hooks/useDebounce';
import Link from 'next/link';

// Loading components
const IconSkeleton = () => <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />;
const SearchSkeleton = () => <div className="h-16 w-16 bg-gray-200 rounded-full animate-pulse mx-auto" />;

interface Country {
  name: string;
  area: number;
  code: string;
  flag: string;
  continent: string;
}

interface CountryComparisonProps {
  countries: Country[];
}

// Memoized utility functions to prevent recreation
const formatArea = (area: number): string => {
  return area.toLocaleString();
};

const formatAreaMiles = (area: number): string => {
  return (area * 0.386102).toLocaleString(undefined, { maximumFractionDigits: 0 });
};

const calculatePercentageDifference = (area1: number, area2: number): number => {
  const larger = Math.max(area1, area2);
  const smaller = Math.min(area1, area2);
  return Math.round(((larger - smaller) / smaller) * 100);
};

const getRelativeSize = (area1: number, area2: number): string => {
  const ratio = area1 / area2;
  if (ratio > 1) {
    return `${ratio.toFixed(1)}x larger`;
  } else {
    return `${(1 / ratio).toFixed(1)}x smaller`;
  }
};

export default function CountryComparison({ countries }: CountryComparisonProps) {
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();
  
  // Defer search term to prevent blocking UI updates
  const deferredSearchTerm = useDeferredValue(searchTerm);
  
  // Debounce search to reduce filtering frequency
  const debouncedSearchTerm = useDebounce(deferredSearchTerm, 150);

  // Memoize filtered countries to prevent unnecessary recalculations
  const filteredCountries = useMemo(() => {
    // Use deferred value to prevent blocking
    if (!debouncedSearchTerm) return [];
    
    return countries.filter(country =>
      country.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) &&
      !selectedCountries.some(selected => selected.code === country.code)
    ).slice(0, 8); // Limit results to reduce work
  }, [countries, debouncedSearchTerm, selectedCountries]);

  // Memoize largest country calculation
  const largestCountry = useMemo(() => 
    selectedCountries.reduce((prev, current) =>
      prev.area > current.area ? prev : current, selectedCountries[0]
    ), [selectedCountries]
  );

  // Use useCallback to prevent function recreation
  const addCountry = useCallback((country: Country) => {
    startTransition(() => {
      if (selectedCountries.length < 4) {
        setSelectedCountries(prev => [...prev, country]);
        setSearchTerm('');
      }
    });
  }, [selectedCountries.length]);

  const removeCountry = useCallback((countryCode: string) => {
    startTransition(() => {
      setSelectedCountries(prev => prev.filter(country => country.code !== countryCode));
    });
  }, [selectedCountries]);

  const clearAll = useCallback(() => {
    startTransition(() => {
      setSelectedCountries([]);
    });
  }, []);

  // Memoize popular countries to prevent recreation
  const popularCountries = useMemo(() => 
    ['Russia', 'Canada', 'United States', 'China', 'Brazil', 'Australia', 'India', 'Argentina']
      .map(name => countries.find(c => c.name === name))
      .filter(Boolean) as Country[], [countries]
  );

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <h2 className="flex items-center gap-2">
            <Suspense fallback={<IconSkeleton />}>
              <Search className="h-5 w-5" />
            </Suspense>
            Select Countries to Compare
          </h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for a country..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                }}
                className="w-full"
              />
              {debouncedSearchTerm && (
                <div className={`transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`}>
                  <Suspense fallback={<div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-4"><Skeleton className="h-8 w-full" /></div>}>
                    <VirtualizedCountryList
                      countries={filteredCountries}
                      onCountrySelect={addCountry}
                      maxItems={8}
                    />
                  </Suspense>
                </div>
              )}
            </div>
            
            {selectedCountries.length > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {selectedCountries.map((country) => (
                    <Badge
                      key={country.code}
                      variant="outline"
                      className="bg-blue-50 text-blue-800 border-blue-200 px-3 py-1"
                    >
                      <span className="mr-2">{country.flag}</span>
                      {country.name}
                      <button
                        onClick={() => removeCountry(country.code)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <Button onClick={clearAll} variant="outline" size="sm">
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

       {/* Empty State */}
      {selectedCountries.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4">
            <Suspense fallback={<SearchSkeleton />}>
              <Search className="h-16 w-16 text-gray-300 mx-auto" />
            </Suspense>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Start Comparing Countries</h3>
          <p className="text-gray-600 mb-6">
            Search and select countries above to see detailed size comparisons and statistics.
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {popularCountries.map((country) => (
              <Button
                key={country.code}
                variant="outline"
                size="sm"
                onClick={() => addCountry(country)}
                className="hover:bg-blue-50 will-change-transform"
              >
                <span className="mr-2" role="img" aria-label={`${country.name} flag`}>{country.flag}</span>
                {country.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Comparison Results */}
      {selectedCountries.length > 0 && (
        <div className="space-y-6">
          {/* Country Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {selectedCountries.map((country) => {
              const widthPercentage = largestCountry ? (country.area / largestCountry.area) * 100 : 100;
              
              return (
                <Card key={country.code} className="overflow-hidden hover:shadow-lg transition-shadow will-change-transform">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl" role="img" aria-label={`${country.name} flag`}>{country.flag}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{country.name}</h3>
                          <p className="text-sm text-gray-500">{country.continent}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeCountry(country.code)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
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

                    <div className="pt-4">
                      <Link href={`/countries/${country.code}`}>
                      <Button size="sm" variant={"ghost"}>View Details</Button>
                    </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Detailed Comparisons */}
          {selectedCountries.length > 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Detailed Comparisons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedCountries.map((country1, i) =>
                    selectedCountries.slice(i + 1).map((country2) => (
                      <div
                        key={`${country1.code}-${country2.code}`}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg will-change-transform"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg" role="img" aria-label={`${country1.name} flag`}>{country1.flag}</span>
                            <span className="font-medium">{country1.name}</span>
                          </div>
                          <Suspense fallback={<div className="h-4 w-4 bg-gray-200 rounded" />}>
                            <ArrowRight className="h-4 w-4 text-gray-400" />
                          </Suspense>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg" role="img" aria-label={`${country2.name} flag`}>{country2.flag}</span>
                            <span className="font-medium">{country2.name}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-blue-600">
                            {getRelativeSize(country1.area, country2.area)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {calculatePercentageDifference(country1.area, country2.area)}% difference
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

     
    </div>
  );
}