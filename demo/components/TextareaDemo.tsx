import React, { useState } from 'react';
import { Textarea } from '../../components/Textarea';
import { Label } from '../../components/Label';
import { Button } from '../../components/Button';
import { ComponentShowcase, ComponentVariant } from './ComponentShowcase';

type FormData = {
  name: string;
  email: string;
  message: string;
  feedback: string;
  bio: string;
};

export function TextareaDemo() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: 'I would like to know more about your product...',
    feedback: 'The product is great, but I have a few suggestions...',
    bio: 'I am a software developer with 5+ years of experience...',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const MAX_CHARS = 280;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'bio') {
      setCharacterCount(value.length);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      alert('Form submitted successfully!');
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: 'I would like to know more about your product...',
      feedback: 'The product is great, but I have a few suggestions...',
      bio: 'I am a software developer with 5+ years of experience...',
    });
    setCharacterCount(0);
  };

  return (
    <ComponentShowcase 
      title="Textarea" 
      description="A multi-line text input component that allows users to enter and edit multiple lines of text."
    >
      <ComponentVariant title="Basic Usage">
        <div className="space-y-6">
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              className="mt-1"
              rows={4}
            />
          </div>
          
          <div>
            <Label htmlFor="default-value">With Default Value</Label>
            <Textarea
              id="default-value"
              value={formData.message}
              onChange={handleChange}
              name="message"
              className="mt-1"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="disabled">Disabled</Label>
            <Textarea
              id="disabled"
              placeholder="This textarea is disabled"
              disabled
              className="mt-1"
              rows={2}
            />
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Sizes">
        <div className="space-y-6">
          <div>
            <Label htmlFor="small-textarea">Small</Label>
            <Textarea
              id="small-textarea"
              placeholder="Small textarea..."
              className="mt-1 text-sm h-20"
            />
          </div>
          
          <div>
            <Label htmlFor="default-textarea">Default</Label>
            <Textarea
              id="default-textarea"
              placeholder="Default textarea..."
              className="mt-1 h-24"
            />
          </div>
          
          <div>
            <Label htmlFor="large-textarea">Large</Label>
            <Textarea
              id="large-textarea"
              placeholder="Large textarea..."
              className="mt-1 text-lg p-4 h-32"
            />
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="With Character Count">
        <div>
          <div className="flex justify-between items-center">
            <Label htmlFor="bio">Bio</Label>
            <span className={`text-xs ${characterCount > MAX_CHARS ? 'text-destructive' : 'text-muted-foreground'}`}>
              {characterCount}/{MAX_CHARS}
            </span>
          </div>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className={`mt-1 ${characterCount > MAX_CHARS ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            rows={4}
          />
          {characterCount > MAX_CHARS && (
            <p className="mt-1 text-xs text-destructive">
              Bio must be less than {MAX_CHARS} characters
            </p>
          )}
        </div>
      </ComponentVariant>

      <ComponentVariant title="With Form">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="feedback">Your Feedback</Label>
              <Textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                className="mt-1"
                rows={5}
                required
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Please provide detailed feedback about your experience.
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleReset}
              disabled={isSubmitting}
            >
              Reset
            </Button>
          </div>
        </form>
      </ComponentVariant>

      <ComponentVariant title="With Error State">
        <div className="space-y-6">
          <div>
            <Label htmlFor="error-textarea">Description</Label>
            <Textarea
              id="error-textarea"
              placeholder="Enter a description..."
              className="mt-1 border-destructive focus-visible:ring-destructive"
              rows={3}
            />
            <p className="mt-1 text-sm text-destructive">
              This field is required
            </p>
          </div>
          
          <div className="rounded-md border border-destructive/20 bg-destructive/5 p-4">
            <h3 className="text-sm font-medium text-destructive">Form Errors</h3>
            <p className="mt-1 text-sm text-destructive">
              Please fix the following errors:
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm text-destructive">
              <li>Description is required</li>
              <li>Description must be at least 10 characters</li>
            </ul>
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="With Helper Text">
        <div className="space-y-6">
          <div>
            <Label htmlFor="project-details">Project Details</Label>
            <p className="text-sm text-muted-foreground mb-1">
              Provide a detailed description of your project requirements.
            </p>
            <Textarea
              id="project-details"
              placeholder="Describe your project..."
              className="mt-1"
              rows={5}
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="api-docs">API Documentation</Label>
              <span className="text-xs text-muted-foreground">Markdown supported</span>
            </div>
            <Textarea
              id="api-docs"
              placeholder="## API Endpoints\n\n### GET /users\nReturns a list of users..."
              className="mt-1 font-mono text-sm"
              rows={8}
            />
          </div>
        </div>
      </ComponentVariant>
    </ComponentShowcase>
  );
}
