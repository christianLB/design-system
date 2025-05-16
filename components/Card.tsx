import React, { ReactNode } from 'react'
import { cn } from '../src/lib/utils'
import { tokens } from '../src/lib/tokens'

export interface CardProps {
  variant?: 'default' | 'muted' | 'destructive' | 'outline'
  header?: ReactNode
  title?: string
  footer?: ReactNode
  children?: ReactNode
  className?: string
}

const Card: React.FC<CardProps> = ({
  header,
  title,
  footer,
  children,
  variant = 'default',
  className,
}) => {
  const cardVariants = {
    default: cn(
      'border',
      tokens.colors.border,
      tokens.colors.background,
      tokens.shadow.md
    ),
    muted: cn(
      'border',
      tokens.colors.border,
      tokens.colors.backgroundMuted
    ),
    destructive: cn(
      'border',
      tokens.colors.borderDestructive,
      'bg-destructive/10',
      'text-destructive',
      'dark:bg-destructive/20',
      'dark:text-destructive-foreground'
    ),
    outline: cn(
      'border',
      'border-primary',
      tokens.colors.background,
      'ring-1 ring-primary/10'
    ),
  }

  
  const contentClass = cn(
    'p-4',
    'first:rounded-t-lg last:rounded-b-lg',
    'first:border-t-0 last:border-b-0',
    'border-border/50'
  )

  return (
    <div className={cn(tokens.radius.lg, cardVariants[variant], className)}>
      {header && (
        <div className={cn(contentClass, 'border-b pb-3')}>
          {header}
        </div>
      )}
      {title && (
        <div className={cn(contentClass, 'border-b pb-3 font-semibold')}>
          {title}
        </div>
      )}
      {children && (
        <div className={contentClass}>
          {children}
        </div>
      )}
      {footer && (
        <div className={cn(contentClass, 'border-t pt-3 text-sm text-muted-foreground')}>
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card