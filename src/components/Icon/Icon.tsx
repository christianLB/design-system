import React from 'react';
import * as Icons from 'lucide-react';

export type IconName = keyof typeof Icons;
export type IconSize = 'sm' | 'md' | 'lg';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  name: IconName;
  size?: IconSize;
  color?: string;
  'aria-hidden'?: boolean;
}

const sizeMap: Record<IconSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

const iconSet = Icons as unknown as Record<IconName, React.FC<{ size?: number; color?: string }>>;

export const Icon = ({ name, size = 'md', color = 'currentColor', ...props }: IconProps) => {
  const LucideIcon = iconSet[name];
  if (!LucideIcon) return null;
  return <LucideIcon size={sizeMap[size]} color={color} {...props} />;
};
