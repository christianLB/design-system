import React, { useState } from 'react';
import MultiSelect from '../../components/MultiSelect';
import { ComponentShowcase, ComponentVariant } from './ComponentShowcase';

type ID = string | number;

interface Option {
  id: ID;
  label: string;
  group?: string;
}

export function MultiSelectDemo() {
  const [selectedFruits, setSelectedFruits] = useState<ID[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<ID[]>(['us', 'ca']);
  const [selectedWithGroups, setSelectedWithGroups] = useState<ID[]>([]);

  const fruits: Option[] = [
    { id: 1, label: 'Apple' },
    { id: 2, label: 'Banana' },
    { id: 3, label: 'Orange' },
    { id: 4, label: 'Mango' },
    { id: 5, label: 'Pineapple' },
  ];

  const countries: Option[] = [
    { id: 'us', label: 'United States' },
    { id: 'ca', label: 'Canada' },
    { id: 'uk', label: 'United Kingdom' },
    { id: 'au', label: 'Australia' },
    { id: 'jp', label: 'Japan' },
  ];

  const groupedOptions: Option[] = [
    { id: 'fruit-1', label: 'Apple', group: 'Fruits' },
    { id: 'fruit-2', label: 'Banana', group: 'Fruits' },
    { id: 'veg-1', label: 'Carrot', group: 'Vegetables' },
    { id: 'veg-2', label: 'Broccoli', group: 'Vegetables' },
    { id: 'meat-1', label: 'Chicken', group: 'Meat' },
    { id: 'meat-2', label: 'Beef', group: 'Meat' },
  ];

  return (
    <ComponentShowcase 
      title="MultiSelect" 
      description="A component for selecting multiple options from a dropdown."
    >
      <ComponentVariant title="Basic MultiSelect">
        <div className="w-64">
          <MultiSelect
            options={fruits}
            defaultValue={selectedFruits}
            onChange={(ids) => setSelectedFruits(ids as ID[])}
            placeholder="Select fruits..."
          />
          <div className="mt-2 text-sm text-gray-600">
            Selected: {selectedFruits.length ? 
              selectedFruits.map(id => fruits.find(f => f.id === id)?.label).filter(Boolean).join(', ') : 'None'}
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="With Default Values">
        <div className="w-64">
          <MultiSelect
            options={countries}
            defaultValue={selectedCountries}
            onChange={(ids) => setSelectedCountries(ids as ID[])}
            placeholder="Select countries..."
          />
          <div className="mt-2 text-sm text-gray-600">
            Selected: {selectedCountries.length ? 
              selectedCountries.map(id => countries.find(c => c.id === id)?.label).filter(Boolean).join(', ') : 'None'}
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Grouped Options">
        <div className="w-64">
          <MultiSelect
            options={groupedOptions}
            defaultValue={selectedWithGroups}
            onChange={(ids) => setSelectedWithGroups(ids as ID[])}
            placeholder="Select items..."
          />
          <div className="mt-2 text-sm text-gray-600">
            Selected: {selectedWithGroups.length ? 
              selectedWithGroups.map(id => groupedOptions.find(g => g.id === id)?.label).filter(Boolean).join(', ') : 'None'}
          </div>
        </div>
      </ComponentVariant>
    </ComponentShowcase>
  );
}
