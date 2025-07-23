import { Search, ArrowRight, Globe, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CountryComparison from '@/components/CountryComparison';


interface Country {
  name: string;
  area: number; // in square kilometers
  code: string;
  flag: string;
  continent: string;
}

const countries: Country[] = [
  { name: 'Russia', area: 17098242, code: 'RU', flag: '🇷🇺', continent: 'Asia/Europe' },
  { name: 'Canada', area: 9984670, code: 'CA', flag: '🇨🇦', continent: 'North America' },
  { name: 'United States', area: 9833517, code: 'US', flag: '🇺🇸', continent: 'North America' },
  { name: 'China', area: 9596960, code: 'CN', flag: '🇨🇳', continent: 'Asia' },
  { name: 'Brazil', area: 8514877, code: 'BR', flag: '🇧🇷', continent: 'South America' },
  { name: 'Australia', area: 7692024, code: 'AU', flag: '🇦🇺', continent: 'Oceania' },
  { name: 'India', area: 3287263, code: 'IN', flag: '🇮🇳', continent: 'Asia' },
  { name: 'Argentina', area: 2780400, code: 'AR', flag: '🇦🇷', continent: 'South America' },
  { name: 'Kazakhstan', area: 2724900, code: 'KZ', flag: '🇰🇿', continent: 'Asia' },
  { name: 'Algeria', area: 2381741, code: 'DZ', flag: '🇩🇿', continent: 'Africa' },
  { name: 'Democratic Republic of the Congo', area: 2344858, code: 'CD', flag: '🇨🇩', continent: 'Africa' },
  { name: 'Saudi Arabia', area: 2149690, code: 'SA', flag: '🇸🇦', continent: 'Asia' },
  { name: 'Mexico', area: 1964375, code: 'MX', flag: '🇲🇽', continent: 'North America' },
  { name: 'Indonesia', area: 1904569, code: 'ID', flag: '🇮🇩', continent: 'Asia' },
  { name: 'Sudan', area: 1861484, code: 'SD', flag: '🇸🇩', continent: 'Africa' },
  { name: 'Libya', area: 1759540, code: 'LY', flag: '🇱🇾', continent: 'Africa' },
  { name: 'Iran', area: 1648195, code: 'IR', flag: '🇮🇷', continent: 'Asia' },
  { name: 'Mongolia', area: 1564110, code: 'MN', flag: '🇲🇳', continent: 'Asia' },
  { name: 'Peru', area: 1285216, code: 'PE', flag: '🇵🇪', continent: 'South America' },
  { name: 'Chad', area: 1284000, code: 'TD', flag: '🇹🇩', continent: 'Africa' },
  { name: 'Niger', area: 1267000, code: 'NE', flag: '🇳🇪', continent: 'Africa' },
  { name: 'Angola', area: 1246700, code: 'AO', flag: '🇦🇴', continent: 'Africa' },
  { name: 'Mali', area: 1240192, code: 'ML', flag: '🇲🇱', continent: 'Africa' },
  { name: 'South Africa', area: 1221037, code: 'ZA', flag: '🇿🇦', continent: 'Africa' },
  { name: 'Colombia', area: 1141748, code: 'CO', flag: '🇨🇴', continent: 'South America' },
  { name: 'Ethiopia', area: 1104300, code: 'ET', flag: '🇪🇹', continent: 'Africa' },
  { name: 'Bolivia', area: 1098581, code: 'BO', flag: '🇧🇴', continent: 'South America' },
  { name: 'Mauritania', area: 1030700, code: 'MR', flag: '🇲🇷', continent: 'Africa' },
  { name: 'Egypt', area: 1001450, code: 'EG', flag: '🇪🇬', continent: 'Africa' },
  { name: 'Tanzania', area: 947300, code: 'TZ', flag: '🇹🇿', continent: 'Africa' },
  { name: 'Nigeria', area: 923768, code: 'NG', flag: '🇳🇬', continent: 'Africa' },
  { name: 'Venezuela', area: 912050, code: 'VE', flag: '🇻🇪', continent: 'South America' },
  { name: 'Namibia', area: 824292, code: 'NA', flag: '🇳🇦', continent: 'Africa' },
  { name: 'Mozambique', area: 801590, code: 'MZ', flag: '🇲🇿', continent: 'Africa' },
  { name: 'Pakistan', area: 796095, code: 'PK', flag: '🇵🇰', continent: 'Asia' },
  { name: 'Turkey', area: 783562, code: 'TR', flag: '🇹🇷', continent: 'Asia/Europe' },
  { name: 'Chile', area: 756096, code: 'CL', flag: '🇨🇱', continent: 'South America' },
  { name: 'Zambia', area: 752618, code: 'ZM', flag: '🇿🇲', continent: 'Africa' },
  { name: 'Myanmar', area: 676578, code: 'MM', flag: '🇲🇲', continent: 'Asia' },
  { name: 'Afghanistan', area: 652230, code: 'AF', flag: '🇦🇫', continent: 'Asia' },
  { name: 'France', area: 643801, code: 'FR', flag: '🇫🇷', continent: 'Europe' },
  { name: 'Somalia', area: 637657, code: 'SO', flag: '🇸🇴', continent: 'Africa' },
  { name: 'Ukraine', area: 603550, code: 'UA', flag: '🇺🇦', continent: 'Europe' },
  { name: 'Madagascar', area: 587041, code: 'MG', flag: '🇲🇬', continent: 'Africa' },
  { name: 'Botswana', area: 581730, code: 'BW', flag: '🇧🇼', continent: 'Africa' },
  { name: 'Kenya', area: 580367, code: 'KE', flag: '🇰🇪', continent: 'Africa' },
  { name: 'Yemen', area: 527968, code: 'YE', flag: '🇾🇪', continent: 'Asia' },
  { name: 'Thailand', area: 513120, code: 'TH', flag: '🇹🇭', continent: 'Asia' },
  { name: 'Spain', area: 505370, code: 'ES', flag: '🇪🇸', continent: 'Europe' },
  { name: 'Turkmenistan', area: 488100, code: 'TM', flag: '🇹🇲', continent: 'Asia' },
  { name: 'Cameroon', area: 475440, code: 'CM', flag: '🇨🇲', continent: 'Africa' },
  { name: 'Papua New Guinea', area: 462840, code: 'PG', flag: '🇵🇬', continent: 'Oceania' },
  { name: 'Sweden', area: 450295, code: 'SE', flag: '🇸🇪', continent: 'Europe' },
  { name: 'Uzbekistan', area: 447400, code: 'UZ', flag: '🇺🇿', continent: 'Asia' },
  { name: 'Morocco', area: 446550, code: 'MA', flag: '🇲🇦', continent: 'Africa' },
  { name: 'Iraq', area: 438317, code: 'IQ', flag: '🇮🇶', continent: 'Asia' },
  { name: 'Paraguay', area: 406752, code: 'PY', flag: '🇵🇾', continent: 'South America' },
  { name: 'Zimbabwe', area: 390757, code: 'ZW', flag: '🇿🇼', continent: 'Africa' },
  { name: 'Norway', area: 385207, code: 'NO', flag: '🇳🇴', continent: 'Europe' },
  { name: 'Japan', area: 377930, code: 'JP', flag: '🇯🇵', continent: 'Asia' },
  { name: 'Germany', area: 357022, code: 'DE', flag: '🇩🇪', continent: 'Europe' },
  { name: 'Republic of the Congo', area: 342000, code: 'CG', flag: '🇨🇬', continent: 'Africa' },
  { name: 'Finland', area: 338424, code: 'FI', flag: '🇫🇮', continent: 'Europe' },
  { name: 'Vietnam', area: 331212, code: 'VN', flag: '🇻🇳', continent: 'Asia' },
  { name: 'Malaysia', area: 329847, code: 'MY', flag: '🇲🇾', continent: 'Asia' },
  { name: 'Poland', area: 312696, code: 'PL', flag: '🇵🇱', continent: 'Europe' },
  { name: 'Oman', area: 309500, code: 'OM', flag: '🇴🇲', continent: 'Asia' },
  { name: 'Italy', area: 301340, code: 'IT', flag: '🇮🇹', continent: 'Europe' },
  { name: 'Philippines', area: 300000, code: 'PH', flag: '🇵🇭', continent: 'Asia' },
  { name: 'Ecuador', area: 283561, code: 'EC', flag: '🇪🇨', continent: 'South America' },
  { name: 'Burkina Faso', area: 274200, code: 'BF', flag: '🇧🇫', continent: 'Africa' },
  { name: 'New Zealand', area: 268838, code: 'NZ', flag: '🇳🇿', continent: 'Oceania' },
  { name: 'Gabon', area: 267667, code: 'GA', flag: '🇬🇦', continent: 'Africa' },
  { name: 'Guinea', area: 245857, code: 'GN', flag: '🇬🇳', continent: 'Africa' },
  { name: 'United Kingdom', area: 243610, code: 'GB', flag: '🇬🇧', continent: 'Europe' },
  { name: 'Uganda', area: 241038, code: 'UG', flag: '🇺🇬', continent: 'Africa' },
  { name: 'Ghana', area: 238533, code: 'GH', flag: '🇬🇭', continent: 'Africa' },
  { name: 'Romania', area: 238391, code: 'RO', flag: '🇷🇴', continent: 'Europe' },
  { name: 'Laos', area: 236800, code: 'LA', flag: '🇱🇦', continent: 'Asia' },
  { name: 'Guyana', area: 214969, code: 'GY', flag: '🇬🇾', continent: 'South America' },
  { name: 'Belarus', area: 207600, code: 'BY', flag: '🇧🇾', continent: 'Europe' },
  { name: 'Kyrgyzstan', area: 199951, code: 'KG', flag: '🇰🇬', continent: 'Asia' },
  { name: 'Senegal', area: 196722, code: 'SN', flag: '🇸🇳', continent: 'Africa' },
  { name: 'Syria', area: 185180, code: 'SY', flag: '🇸🇾', continent: 'Asia' },
  { name: 'Cambodia', area: 181035, code: 'KH', flag: '🇰🇭', continent: 'Asia' },
  { name: 'Uruguay', area: 176215, code: 'UY', flag: '🇺🇾', continent: 'South America' },
  { name: 'Suriname', area: 163820, code: 'SR', flag: '🇸🇷', continent: 'South America' },
  { name: 'Tunisia', area: 163610, code: 'TN', flag: '🇹🇳', continent: 'Africa' },
  { name: 'Bangladesh', area: 148460, code: 'BD', flag: '🇧🇩', continent: 'Asia' },
  { name: 'Nepal', area: 147181, code: 'NP', flag: '🇳🇵', continent: 'Asia' },
  { name: 'Tajikistan', area: 143100, code: 'TJ', flag: '🇹🇯', continent: 'Asia' },
  { name: 'Greece', area: 131957, code: 'GR', flag: '🇬🇷', continent: 'Europe' },
  { name: 'Nicaragua', area: 130370, code: 'NI', flag: '🇳🇮', continent: 'North America' },
  { name: 'North Korea', area: 120538, code: 'KP', flag: '🇰🇵', continent: 'Asia' },
  { name: 'Malawi', area: 118484, code: 'MW', flag: '🇲🇼', continent: 'Africa' },
  { name: 'Eritrea', area: 117600, code: 'ER', flag: '🇪🇷', continent: 'Africa' },
  { name: 'Benin', area: 112622, code: 'BJ', flag: '🇧🇯', continent: 'Africa' },
  { name: 'Honduras', area: 112090, code: 'HN', flag: '🇭🇳', continent: 'North America' },
  { name: 'Liberia', area: 111369, code: 'LR', flag: '🇱🇷', continent: 'Africa' },
  { name: 'Bulgaria', area: 110879, code: 'BG', flag: '🇧🇬', continent: 'Europe' },
  { name: 'Cuba', area: 109884, code: 'CU', flag: '🇨🇺', continent: 'North America' },
  { name: 'Guatemala', area: 108889, code: 'GT', flag: '🇬🇹', continent: 'North America' },
  { name: 'Iceland', area: 103000, code: 'IS', flag: '🇮🇸', continent: 'Europe' },
  { name: 'South Korea', area: 100210, code: 'KR', flag: '🇰🇷', continent: 'Asia' },
  { name: 'Hungary', area: 93028, code: 'HU', flag: '🇭🇺', continent: 'Europe' },
  { name: 'Jordan', area: 89342, code: 'JO', flag: '🇯🇴', continent: 'Asia' },
  { name: 'Serbia', area: 88361, code: 'RS', flag: '🇷🇸', continent: 'Europe' },
  { name: 'Azerbaijan', area: 86600, code: 'AZ', flag: '🇦🇿', continent: 'Asia' },
  { name: 'Austria', area: 83871, code: 'AT', flag: '🇦🇹', continent: 'Europe' },
  { name: 'United Arab Emirates', area: 83600, code: 'AE', flag: '🇦🇪', continent: 'Asia' },
  { name: 'Czech Republic', area: 78867, code: 'CZ', flag: '🇨🇿', continent: 'Europe' },
  { name: 'Panama', area: 75420, code: 'PA', flag: '🇵🇦', continent: 'North America' },
  { name: 'Sierra Leone', area: 71740, code: 'SL', flag: '🇸🇱', continent: 'Africa' },
  { name: 'Ireland', area: 70273, code: 'IE', flag: '🇮🇪', continent: 'Europe' },
  { name: 'Georgia', area: 69700, code: 'GE', flag: '🇬🇪', continent: 'Asia' },
  { name: 'Sri Lanka', area: 65610, code: 'LK', flag: '🇱🇰', continent: 'Asia' },
  { name: 'Lithuania', area: 65300, code: 'LT', flag: '🇱🇹', continent: 'Europe' },
  { name: 'Latvia', area: 64589, code: 'LV', flag: '🇱🇻', continent: 'Europe' },
  { name: 'Togo', area: 56785, code: 'TG', flag: '🇹🇬', continent: 'Africa' },
  { name: 'Croatia', area: 56594, code: 'HR', flag: '🇭🇷', continent: 'Europe' },
  { name: 'Bosnia and Herzegovina', area: 51197, code: 'BA', flag: '🇧🇦', continent: 'Europe' },
  { name: 'Costa Rica', area: 51100, code: 'CR', flag: '🇨🇷', continent: 'North America' },
  { name: 'Slovakia', area: 49035, code: 'SK', flag: '🇸🇰', continent: 'Europe' },
  { name: 'Dominican Republic', area: 48670, code: 'DO', flag: '🇩🇴', continent: 'North America' },
  { name: 'Estonia', area: 45228, code: 'EE', flag: '🇪🇪', continent: 'Europe' },
  { name: 'Denmark', area: 43094, code: 'DK', flag: '🇩🇰', continent: 'Europe' },
  { name: 'Netherlands', area: 41543, code: 'NL', flag: '🇳🇱', continent: 'Europe' },
  { name: 'Switzerland', area: 41277, code: 'CH', flag: '🇨🇭', continent: 'Europe' },
  { name: 'Guinea-Bissau', area: 36125, code: 'GW', flag: '🇬🇼', continent: 'Africa' },
  { name: 'Taiwan', area: 35980, code: 'TW', flag: '🇹🇼', continent: 'Asia' },
  { name: 'Moldova', area: 33851, code: 'MD', flag: '🇲🇩', continent: 'Europe' },
  { name: 'Belgium', area: 30528, code: 'BE', flag: '🇧🇪', continent: 'Europe' },
  { name: 'Lesotho', area: 30355, code: 'LS', flag: '🇱🇸', continent: 'Africa' },
  { name: 'Armenia', area: 29743, code: 'AM', flag: '🇦🇲', continent: 'Asia' },
  { name: 'Solomon Islands', area: 28896, code: 'SB', flag: '🇸🇧', continent: 'Oceania' },
  { name: 'Albania', area: 28748, code: 'AL', flag: '🇦🇱', continent: 'Europe' },
  { name: 'Equatorial Guinea', area: 28051, code: 'GQ', flag: '🇬🇶', continent: 'Africa' },
  { name: 'Burundi', area: 27830, code: 'BI', flag: '🇧🇮', continent: 'Africa' },
  { name: 'Haiti', area: 27750, code: 'HT', flag: '🇭🇹', continent: 'North America' },
  { name: 'Rwanda', area: 26338, code: 'RW', flag: '🇷🇼', continent: 'Africa' },
  { name: 'Djibouti', area: 23200, code: 'DJ', flag: '🇩🇯', continent: 'Africa' },
  { name: 'Belize', area: 22966, code: 'BZ', flag: '🇧🇿', continent: 'North America' },
  { name: 'El Salvador', area: 21041, code: 'SV', flag: '🇸🇻', continent: 'North America' },
  { name: 'Israel', area: 20770, code: 'IL', flag: '🇮🇱', continent: 'Asia' },
  { name: 'Slovenia', area: 20273, code: 'SI', flag: '🇸🇮', continent: 'Europe' },
  { name: 'Fiji', area: 18274, code: 'FJ', flag: '🇫🇯', continent: 'Oceania' },
  { name: 'Kuwait', area: 17818, code: 'KW', flag: '🇰🇼', continent: 'Asia' },
  { name: 'Eswatini', area: 17364, code: 'SZ', flag: '🇸🇿', continent: 'Africa' },
  { name: 'East Timor', area: 14874, code: 'TL', flag: '🇹🇱', continent: 'Asia' },
  { name: 'Bahamas', area: 13880, code: 'BS', flag: '🇧🇸', continent: 'North America' },
  { name: 'Montenegro', area: 13812, code: 'ME', flag: '🇲🇪', continent: 'Europe' },
  { name: 'Vanuatu', area: 12189, code: 'VU', flag: '🇻🇺', continent: 'Oceania' },
  { name: 'Qatar', area: 11586, code: 'QA', flag: '🇶🇦', continent: 'Asia' },
  { name: 'Gambia', area: 11295, code: 'GM', flag: '🇬🇲', continent: 'Africa' },
  { name: 'Jamaica', area: 10991, code: 'JM', flag: '🇯🇲', continent: 'North America' },
  { name: 'Kosovo', area: 10908, code: 'XK', flag: '🇽🇰', continent: 'Europe' },
  { name: 'Lebanon', area: 10400, code: 'LB', flag: '🇱🇧', continent: 'Asia' },
  { name: 'Cyprus', area: 9251, code: 'CY', flag: '🇨🇾', continent: 'Asia' },
  { name: 'Brunei', area: 5765, code: 'BN', flag: '🇧🇳', continent: 'Asia' },
  { name: 'Trinidad and Tobago', area: 5128, code: 'TT', flag: '🇹🇹', continent: 'North America' },
  { name: 'Cape Verde', area: 4033, code: 'CV', flag: '🇨🇻', continent: 'Africa' },
  { name: 'Samoa', area: 2831, code: 'WS', flag: '🇼🇸', continent: 'Oceania' },
  { name: 'Luxembourg', area: 2586, code: 'LU', flag: '🇱🇺', continent: 'Europe' },
  { name: 'Comoros', area: 2235, code: 'KM', flag: '🇰🇲', continent: 'Africa' },
  { name: 'Mauritius', area: 2040, code: 'MU', flag: '🇲🇺', continent: 'Africa' },
  { name: 'Faroe Islands', area: 1393, code: 'FO', flag: '🇫🇴', continent: 'Europe' },
  { name: 'Tonga', area: 747, code: 'TO', flag: '🇹🇴', continent: 'Oceania' },
  { name: 'Kiribati', area: 726, code: 'KI', flag: '🇰🇮', continent: 'Oceania' },
  { name: 'Bahrain', area: 765, code: 'BH', flag: '🇧🇭', continent: 'Asia' },
  { name: 'Dominica', area: 751, code: 'DM', flag: '🇩🇲', continent: 'North America' },
  { name: 'Palau', area: 459, code: 'PW', flag: '🇵🇼', continent: 'Oceania' },
  { name: 'Seychelles', area: 452, code: 'SC', flag: '🇸🇨', continent: 'Africa' },
  { name: 'Andorra', area: 468, code: 'AD', flag: '🇦🇩', continent: 'Europe' },
  { name: 'Saint Lucia', area: 616, code: 'LC', flag: '🇱🇨', continent: 'North America' },
  { name: 'Federated States of Micronesia', area: 702, code: 'FM', flag: '🇫🇲', continent: 'Oceania' },
  { name: 'Singapore', area: 697, code: 'SG', flag: '🇸🇬', continent: 'Asia' },
  { name: 'Saint Vincent and the Grenadines', area: 389, code: 'VC', flag: '🇻🇨', continent: 'North America' },
  { name: 'Grenada', area: 344, code: 'GD', flag: '🇬🇩', continent: 'North America' },
  { name: 'Malta', area: 316, code: 'MT', flag: '🇲🇹', continent: 'Europe' },
  { name: 'Maldives', area: 298, code: 'MV', flag: '🇲🇻', continent: 'Asia' },
  { name: 'Saint Kitts and Nevis', area: 261, code: 'KN', flag: '🇰🇳', continent: 'North America' },
  { name: 'Marshall Islands', area: 181, code: 'MH', flag: '🇲🇭', continent: 'Oceania' },
  { name: 'Liechtenstein', area: 160, code: 'LI', flag: '🇱🇮', continent: 'Europe' },
  { name: 'San Marino', area: 61, code: 'SM', flag: '🇸🇲', continent: 'Europe' },
  { name: 'Tuvalu', area: 26, code: 'TV', flag: '🇹🇻', continent: 'Oceania' },
  { name: 'Nauru', area: 21, code: 'NR', flag: '🇳🇷', continent: 'Oceania' },
  { name: 'Monaco', area: 2, code: 'MC', flag: '🇲🇨', continent: 'Europe' },
  { name: 'Vatican City', area: 0.17, code: 'VA', flag: '🇻🇦', continent: 'Europe' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Country Size Comparison</h1>
                <p className="text-sm text-gray-600">Compare the land areas of countries around the world</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {countries.length} Countries
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <CountryComparison countries={countries} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">Compare land areas of countries worldwide</p>
            <p className="text-sm">Data includes sovereign states and dependent territories</p>
          </div>
        </div>
      </footer>
    </div>
  );
}