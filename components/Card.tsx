import React, { ReactNode } from 'react';

interface CardProps {
  header?: ReactNode;
  title?: string;
  footer?: ReactNode;
  children?: ReactNode;
}

const Card: React.FC<CardProps> = ({ header, title, footer, children }) => {
  return (
    <div className="border rounded-lg shadow-md bg-white">
      {header && <div className="p-4 border-b">{header}</div>}
      {title && <div className="p-4 border-b font-bold">{title}</div>}
      {children && <div className="p-4">{children}</div>}
      {footer && <div className="p-4 border-t">{footer}</div>}
    </div>
  );
};

export default Card;