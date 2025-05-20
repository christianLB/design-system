"use client";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "./Dialog";
import { Button } from "./Button";
import React from "react";
import { useConfirmStore } from "../hooks/useConfirm";

export interface ConfirmDialogProps {
  // The component doesn't accept any props directly;
  // all configuration is handled through the useConfirmStore
}

export interface ConfirmDialogExtraContentProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * A dialog component that displays a confirmation message with confirm/cancel buttons.
 * Configured through the useConfirmStore.
 */
export function ConfirmDialog({}: ConfirmDialogProps) {
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
    <Dialog open={open} onOpenChange={hide}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {extraContent && (
          <div className="mb-2">
            {React.cloneElement(extraContent as React.ReactElement, {
              // onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDeleteFile(e.target.checked),
            })}
          </div>
        )}
        <DialogFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleCancel}>
            {cancelText}
          </Button>
          <Button onClick={handleConfirm}>{confirmText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
