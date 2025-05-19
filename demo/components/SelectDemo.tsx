import React, { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectSeparator, 
  SelectTrigger, 
  SelectValue 
} from '../../components/Select';
import { ComponentShowcase, ComponentVariant } from './ComponentShowcase';

interface Country {
  value: string;
  label: string;
  code: string;
  phone: string;
}

const COUNTRIES: Country[] = [
  { value: 'us', label: 'United States', code: 'US', phone: '+1' },
  { value: 'ca', label: 'Canada', code: 'CA', phone: '+1' },
  { value: 'mx', label: 'Mexico', code: 'MX', phone: '+52' },
  { value: 'br', label: 'Brazil', code: 'BR', phone: '+55' },
  { value: 'uk', label: 'United Kingdom', code: 'GB', phone: '+44' },
  { value: 'fr', label: 'France', code: 'FR', phone: '+33' },
  { value: 'de', label: 'Germany', code: 'DE', phone: '+49' },
  { value: 'it', label: 'Italy', code: 'IT', phone: '+39' },
  { value: 'es', label: 'Spain', code: 'ES', phone: '+34' },
  { value: 'jp', label: 'Japan', code: 'JP', phone: '+81' },
  { value: 'cn', label: 'China', code: 'CN', phone: '+86' },
  { value: 'in', label: 'India', code: 'IN', phone: '+91' },
  { value: 'ru', label: 'Russia', code: 'RU', phone: '+7' },
  { value: 'au', label: 'Australia', code: 'AU', phone: '+61' },
  { value: 'nz', label: 'New Zealand', code: 'NZ', phone: '+64' },
];

const FRAMEWORKS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
];

const TIMEZONES = [
  { value: 'et', label: 'Eastern Time (ET)', offset: '-05:00' },
  { value: 'ct', label: 'Central Time (CT)', offset: '-06:00' },
  { value: 'mt', label: 'Mountain Time (MT)', offset: '-07:00' },
  { value: 'pt', label: 'Pacific Time (PT)', offset: '-08:00' },
  { value: 'ak', label: 'Alaska Time (AKT)', offset: '-09:00' },
  { value: 'hst', label: 'Hawaii-Aleutian Time (HST)', offset: '-10:00' },
];

export function SelectDemo() {
  const [country, setCountry] = useState<string>('us');
  const [framework, setFramework] = useState<string>('react');
  const [timezone, setTimezone] = useState<string>('et');
  const [multipleSelection, setMultipleSelection] = useState<string[]>(['react', 'vue']);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleMultipleChange = (value: string) => {
    setMultipleSelection(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const loadMoreCountries = () => {
    // Simulate loading more items
    setIsLoading(true);
    setTimeout(() => {
      // In a real app, you would fetch more data here
      setIsLoading(false);
    }, 1000);
  };

  return (
    <ComponentShowcase 
      title="Select" 
      description="Displays a list of options for the user to pick from—triggered by a button."
    >
      <ComponentVariant title="Basic Usage">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="country-select">
              Country
            </label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger id="country-select" className="w-[300px]">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>North America</SelectLabel>
                  {COUNTRIES.filter(c => ['us', 'ca', 'mx'].includes(c.value)).map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                  
                  <SelectLabel>Europe</SelectLabel>
                  {COUNTRIES.filter(c => ['uk', 'fr', 'de', 'it', 'es'].includes(c.value)).map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                  
                  <SelectLabel>Asia & Pacific</SelectLabel>
                  {COUNTRIES.filter(c => ['jp', 'cn', 'in', 'au', 'nz'].includes(c.value)).map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="mt-1 text-xs text-muted-foreground">
              Selected: {COUNTRIES.find(c => c.value === country)?.label}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="framework-select">
              Framework
            </label>
            <Select value={framework} onValueChange={setFramework}>
              <SelectTrigger id="framework-select" className="w-[300px]">
                <SelectValue placeholder="Select a framework" />
              </SelectTrigger>
              <SelectContent>
                {FRAMEWORKS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="With Custom Trigger">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="timezone-select">
              Timezone
            </label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger id="timezone-select" className="w-[300px] justify-between">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      {TIMEZONES.find(tz => tz.value === timezone)?.offset}
                    </span>
                    <span>{TIMEZONES.find(tz => tz.value === timezone)?.label}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {TIMEZONES.map((timezone) => (
                  <SelectItem key={timezone.value} value={timezone.value}>
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-muted-foreground">
                        {timezone.offset}
                      </span>
                      <span>{timezone.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Disabled State">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">
              Disabled Select
            </label>
            <Select disabled>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              With Disabled Items
            </label>
            <Select>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select a framework" />
              </SelectTrigger>
              <SelectContent>
                {FRAMEWORKS.map((item) => (
                  <SelectItem 
                    key={item.value} 
                    value={item.value}
                    disabled={item.value === 'angular'}
                  >
                    {item.label}
                    {item.value === 'angular' && ' (coming soon)'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="With Loading State">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Country (with loading)
            </label>
            <Select disabled={isLoading}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder={isLoading ? 'Loading countries...' : 'Select a country'} />
              </SelectTrigger>
              <SelectContent>
                {isLoading ? (
                  <div className="py-2 text-center text-sm text-muted-foreground">
                    Loading...
                  </div>
                ) : (
                  COUNTRIES.slice(0, 5).map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-2">
            <button
              type="button"
              onClick={loadMoreCountries}
              disabled={isLoading}
              className="text-sm text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Load more countries'}
            </button>
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="With Groups and Separators">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Country with Groups
            </label>
            <Select>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Americas</SelectLabel>
                  {COUNTRIES.filter(c => ['us', 'ca', 'mx', 'br'].includes(c.value)).map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
                
                <SelectSeparator />
                
                <SelectGroup>
                  <SelectLabel>Europe</SelectLabel>
                  {COUNTRIES.filter(c => ['uk', 'fr', 'de', 'it', 'es'].includes(c.value)).map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
                
                <SelectSeparator />
                
                <SelectGroup>
                  <SelectLabel>Asia & Pacific</SelectLabel>
                  {COUNTRIES.filter(c => ['jp', 'cn', 'in', 'au', 'nz', 'ru'].includes(c.value)).map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </ComponentVariant>
    </ComponentShowcase>
  );
}
