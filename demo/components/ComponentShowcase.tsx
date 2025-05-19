import React from 'react';
import Card from '../../components/Card';

interface ComponentShowcaseProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function ComponentShowcase({
  title,
  description,
  children,
  className = '',
}: ComponentShowcaseProps) {
  return (
    <section className={`mb-12 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      <Card className="p-6">
        <div className="flex flex-wrap gap-6">{children}</div>
      </Card>
    </section>
  );
}

interface ComponentVariantProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ComponentVariant({
  title,
  children,
  className = '',
}: ComponentVariantProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <h3 className="text-sm font-medium text-muted-foreground mb-3">{title}</h3>
      <div className="flex flex-wrap gap-4">{children}</div>
    </div>
  );
}
