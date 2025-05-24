"use client";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "./Dialog";
import { Button } from "./Button";
import React, { forwardRef } from "react";
import { useConfirmStore } from "../hooks/useConfirm";
import { cn } from "../utils";

export interface ConfirmDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  // The component doesn't accept any props directly;
  // all configuration is handled through the useConfirmStore
  className?: string;
}

export interface ConfirmDialogExtraContentProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * A dialog component that displays a confirmation message with confirm/cancel buttons.
 * Configured through the useConfirmStore.
 */
const ConfirmDialog = forwardRef<HTMLDivElement, ConfirmDialogProps>((
  { className, ...props }, 
  ref
) => {
  const {
    open,
    title,
    description,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    hide,
    extraContent,
  } = useConfirmStore();

  // Local state for checkbox (if present)
  const [deleteFile, setDeleteFile] = React.useState(false);
  React.useEffect(() => {
    setDeleteFile(false); // reset on open
  }, [open]);

  const handleConfirm = () => {
    if (onConfirm) onConfirm({ deleteFile });
    hide();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    hide();
  };

  return (
    <div ref={ref} className={cn(className)} {...props}>
      <Dialog open={open} onOpenChange={hide}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {extraContent && (
            <div className="mb-4">
              {React.cloneElement(extraContent as React.ReactElement, {
                // onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDeleteFile(e.target.checked),
              })}
            </div>
          )}
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              {cancelText}
            </Button>
            <Button onClick={handleConfirm}>{confirmText}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
});

ConfirmDialog.displayName = 'ConfirmDialog';

export { ConfirmDialog };
