import { memo, useCallback } from 'react';

interface Country {
  name: string;
  area: number;
  code: string;
  flag: string;
  continent: string;
}

interface VirtualizedCountryListProps {
  countries: Country[];
  onCountrySelect: (country: Country) => void;
  maxItems?: number;
}

// Memoized country item to prevent unnecessary re-renders
const CountryItem = memo(({ country, onSelect }: { country: Country; onSelect: (country: Country) => void }) => {
  const handleClick = useCallback(() => onSelect(country), [country, onSelect]);
  
  return (
  <button
    onClick={handleClick}
    className="w-full px-4 py-2 text-left hover:bg-blue-50 flex items-center justify-between group will-change-transform optimize-rendering"
    type="button"
  >
    <div className="flex items-center space-x-3">
      <span className="text-xl" role="img" aria-label={`${country.name} flag`}>{country.flag}</span>
      <div>
        <div className="font-medium text-gray-900">{country.name}</div>
        <div className="text-sm text-gray-500">{country.continent}</div>
      </div>
    </div>
    <div className="text-sm text-gray-500 group-hover:text-blue-600">
      {country.area.toLocaleString()} km²
    </div>
  </button>
  );
});

CountryItem.displayName = 'CountryItem';

// Virtualized list component to handle large datasets efficiently
export const VirtualizedCountryList = memo(({ 
  countries, 
  onCountrySelect, 
  maxItems = 8 
}: VirtualizedCountryListProps) => {
  // Only render visible items to reduce DOM nodes
  const visibleCountries = countries.slice(0, maxItems);
  
  return (
    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto optimize-rendering">
      {visibleCountries.map((country) => (
        <CountryItem
          key={country.code}
          country={country}
          onSelect={onCountrySelect}
        />
      ))}
      {countries.length > maxItems && (
        <div className="px-4 py-2 text-sm text-gray-500 border-t">
          Showing {maxItems} of {countries.length} results
        </div>
      )}
    </div>
  );
});

VirtualizedCountryList.displayName = 'VirtualizedCountryList';