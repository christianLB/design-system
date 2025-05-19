import React, { useState } from 'react';
import { Input } from '../../components/Input';
import { ComponentShowcase, ComponentVariant } from './ComponentShowcase';

export function InputDemo() {
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [disabledText, setDisabledText] = useState('Disabled Input');
  const [withError, setWithError] = useState('');

  const handleErrorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWithError(value);
    if (value.length > 0 && value.length < 3) {
      setError('Input must be at least 3 characters');
    } else {
      setError('');
    }
  };

  return (
    <ComponentShowcase 
      title="Input" 
      description="A basic input component with various states and types."
    >
      <ComponentVariant title="Basic Input">
        <div className="space-y-4">
          <div>
            <label htmlFor="basic-input" className="block text-sm font-medium mb-1">
              Text Input
            </label>
            <Input
              id="basic-input"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type something..."
              className="w-full max-w-md"
            />
            {text && (
              <p className="mt-1 text-sm text-muted-foreground">
                You typed: {text}
              </p>
            )}
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Input Types">
        <div className="space-y-4">
          <div>
            <label htmlFor="email-input" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full max-w-md"
            />
          </div>
          <div>
            <label htmlFor="password-input" className="block text-sm font-medium mb-1">
              Password
            </label>
            <Input
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full max-w-md"
            />
          </div>
          <div>
            <label htmlFor="search-input" className="block text-sm font-medium mb-1">
              Search
            </label>
            <Input
              id="search-input"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full max-w-md"
            />
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="States">
        <div className="space-y-4">
          <div>
            <label htmlFor="disabled-input" className="block text-sm font-medium mb-1">
              Disabled
            </label>
            <Input
              id="disabled-input"
              value={disabledText}
              onChange={(e) => setDisabledText(e.target.value)}
              disabled
              className="w-full max-w-md"
            />
          </div>
          <div>
            <label htmlFor="error-input" className="block text-sm font-medium mb-1">
              With Error
            </label>
            <Input
              id="error-input"
              value={withError}
              onChange={handleErrorChange}
              className={`w-full max-w-md ${error ? 'border-red-500' : ''}`}
              aria-invalid={!!error}
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="With Addons">
        <div className="space-y-4">
          <div>
            <label htmlFor="left-addon" className="block text-sm font-medium mb-1">
              With Left Addon
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                https://
              </span>
              <Input
                id="left-addon"
                type="text"
                className="flex-1 min-w-0 rounded-l-none"
                placeholder="example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="right-addon" className="block text-sm font-medium mb-1">
              With Right Addon
            </label>
            <div className="flex">
              <Input
                id="right-addon"
                type="text"
                className="flex-1 min-w-0 rounded-r-none"
                placeholder="Enter amount"
              />
              <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                USD
              </span>
            </div>
          </div>
        </div>
      </ComponentVariant>
    </ComponentShowcase>
  );
}
