import * as React from 'react';
import { motion } from 'framer-motion';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Dialog = ({ isOpen, onClose, children, className }: DialogProps) => {
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <motion.div
      className="dialog-overlay"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className={`dialog-content ${className || ''}`}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <button className="dialog-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
};

export const DialogHeader = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={`dialog-header ${props.className || ''}`} />
);

export const DialogTitle = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 {...props} className={`dialog-title ${props.className || ''}`} />
);

export const DialogDescription = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p {...props} className={`dialog-description ${props.className || ''}`} />
);

export const DialogFooter = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={`dialog-footer ${props.className || ''}`} />
);
