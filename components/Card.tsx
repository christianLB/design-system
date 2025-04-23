import React, { ReactNode } from 'react'

import { cn } from '../lib/utils'

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
    default: 'border bg-background shadow-md',
    muted: 'border bg-muted',
    destructive: 'border-destructive bg-destructive text-destructive-foreground',
    outline: 'border border-primary bg-background',
  }
  return (
    <div className={cn('rounded-lg', cardVariants[variant],className)}>
      {header && <div className="border-b p-4">{header}</div>}
      {title && <div className="border-b p-4 font-bold">{title}</div>}
      {children && <div className="p-4">{children}</div>}
      {footer && <div className="border-t p-4">{footer}</div>}
    </div>
  )
}

export default Card