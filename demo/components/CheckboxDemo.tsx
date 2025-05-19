import React, { useState } from 'react';
import { Checkbox } from '../../components/Checkbox';
import { Label } from '../../components/Label';
import { Button } from '../../components/Button';
import { Check, X, AlertCircle, CheckCircle } from 'lucide-react';
import { ComponentShowcase, ComponentVariant } from './ComponentShowcase';

const fruits = [
  { id: 'apple', label: 'Apple' },
  { id: 'banana', label: 'Banana' },
  { id: 'orange', label: 'Orange' },
  { id: 'mango', label: 'Mango' },
  { id: 'grape', label: 'Grape' },
];

const notificationTypes = [
  { id: 'email', label: 'Email', description: 'Receive email notifications' },
  { id: 'push', label: 'Push', description: 'Receive push notifications' },
  { id: 'sms', label: 'SMS', description: 'Receive text messages' },
];

type Fruit = typeof fruits[number];

export function CheckboxDemo() {
  // Single checkbox state
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(false);
  const [indeterminate, setIndeterminate] = useState(false);
  
  // Multiple checkboxes state
  const [selectedFruits, setSelectedFruits] = useState<Set<string>>(new Set(['apple']));
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    email: true,
  });
  
  // Form state
  const [formData, setFormData] = useState({
    terms: false,
    privacy: false,
    marketing: true,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Toggle all fruits
  const allFruitsSelected = selectedFruits.size === fruits.length;
  const someFruitsSelected = selectedFruits.size > 0 && !allFruitsSelected;

  const toggleAllFruits = () => {
    if (allFruitsSelected) {
      setSelectedFruits(new Set());
    } else {
      setSelectedFruits(new Set(fruits.map(fruit => fruit.id)));
    }
  };

  // Toggle single fruit
  const toggleFruit = (fruitId: string) => {
    const newSelection = new Set(selectedFruits);
    if (newSelection.has(fruitId)) {
      newSelection.delete(fruitId);
    } else {
      newSelection.add(fruitId);
    }
    setSelectedFruits(newSelection);
  };

  // Toggle notification
  const toggleNotification = (id: string) => {
    setNotifications(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    
    if (!formData.terms) {
      errors.terms = 'You must accept the terms and conditions';
    }
    
    if (!formData.privacy) {
      errors.privacy = 'You must accept the privacy policy';
    }
    
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', formData);
      setFormSubmitted(true);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      terms: false,
      privacy: false,
      marketing: true,
    });
    setFormErrors({});
    setFormSubmitted(false);
  };

  return (
    <ComponentShowcase 
      title="Checkbox" 
      description="A control that allows the user to toggle between checked and not checked."
    >
      <ComponentVariant title="Basic Usage">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={checked} onCheckedChange={setChecked} />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Checked: {checked ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="States">
        <div className="grid gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="default" defaultChecked />
              <Label htmlFor="default">Default</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="checked" checked />
              <Label htmlFor="checked">Checked</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="indeterminate" 
                checked={indeterminate ? 'indeterminate' : false} 
                onCheckedChange={() => setIndeterminate(!indeterminate)}
              />
              <Label htmlFor="indeterminate">Indeterminate</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="disabled" disabled />
              <Label htmlFor="disabled">Disabled</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="disabled-checked" checked disabled />
              <Label htmlFor="disabled-checked">Disabled Checked</Label>
            </div>
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="With Labels and Descriptions">
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <h4 className="text-sm font-medium">Email notifications</h4>
            <p className="text-sm text-muted-foreground">Choose what notifications you'd like to receive.</p>
            
            <div className="mt-2 space-y-3">
              {notificationTypes.map((type) => (
                <div key={type.id} className="flex items-start space-x-3">
                  <Checkbox 
                    id={type.id}
                    checked={notifications[type.id] || false}
                    onCheckedChange={() => toggleNotification(type.id)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor={type.id} className="font-normal">
                      {type.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {type.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Multiple Selection">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="select-all"
              checked={allFruitsSelected}
              onCheckedChange={toggleAllFruits}
              ref={(el) => {
                if (el) {
                  // Using type assertion to access indeterminate property
                  (el as HTMLButtonElement & { indeterminate?: boolean }).indeterminate = someFruitsSelected;
                }
              }}
            />
            <Label htmlFor="select-all">
              {allFruitsSelected ? 'Deselect all' : 'Select all'}
            </Label>
          </div>
          
          <div className="space-y-2">
            {fruits.map((fruit) => (
              <div key={fruit.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={fruit.id}
                  checked={selectedFruits.has(fruit.id)}
                  onCheckedChange={() => toggleFruit(fruit.id)}
                />
                <Label htmlFor={fruit.id}>
                  {fruit.label}
                </Label>
              </div>
            ))}
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Selected: {selectedFruits.size} of {fruits.length}</p>
            {selectedFruits.size > 0 && (
              <p className="mt-1">
                {Array.from(selectedFruits)
                  .map(id => fruits.find(f => f.id === id)?.label)
                  .join(', ')}
              </p>
            )}
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Form Integration">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Sign up</h3>
              <p className="text-sm text-muted-foreground">
                Create an account to get started.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={formData.terms}
                    onCheckedChange={(checked) => 
                      setFormData({...formData, terms: checked as boolean})
                    }
                    aria-invalid={!!formErrors.terms}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="terms" className="font-normal">
                      I agree to the Terms of Service
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      You must accept our terms and conditions to continue.
                    </p>
                    {formErrors.terms && (
                      <p className="text-sm text-destructive flex items-center gap-1.5">
                        <AlertCircle className="h-4 w-4" />
                        {formErrors.terms}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="privacy"
                    checked={formData.privacy}
                    onCheckedChange={(checked) => 
                      setFormData({...formData, privacy: checked as boolean})
                    }
                    aria-invalid={!!formErrors.privacy}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="privacy" className="font-normal">
                      I have read the Privacy Policy
                    </Label>
                    {formErrors.privacy && (
                      <p className="text-sm text-destructive flex items-center gap-1.5">
                        <AlertCircle className="h-4 w-4" />
                        {formErrors.privacy}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 pt-2">
                  <Checkbox
                    id="marketing"
                    checked={formData.marketing}
                    onCheckedChange={(checked) => 
                      setFormData({...formData, marketing: checked as boolean})
                    }
                  />
                  <Label htmlFor="marketing" className="font-normal">
                    Subscribe to our newsletter
                  </Label>
                </div>
              </div>
              
              {formSubmitted ? (
                <div className="rounded-md bg-success/10 p-4 text-sm text-success-foreground flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <p>Form submitted successfully!</p>
                </div>
              ) : (
                <div className="flex items-center gap-3 pt-2">
                  <Button type="submit">Submit</Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Reset
                  </Button>
                </div>
              )}
            </div>
          </div>
        </form>
      </ComponentVariant>
    </ComponentShowcase>
  );
}
