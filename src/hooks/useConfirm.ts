import { create } from "zustand";
import { ReactNode } from "react";

interface ConfirmDialogState {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: (options?: unknown) => void;
  onCancel?: () => void;
  extraContent?: React.ReactNode;
  extraState?: unknown;

  show: (options: {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: (options?: unknown) => void;
    onCancel?: () => void;
    extraContent?: React.ReactNode;
    extraState?: unknown;
  }) => void;

  hide: () => void;
}

export const useConfirmStore = create<ConfirmDialogState>((set) => ({
  open: false,
  title: "",
  description: "",
  confirmText: "Confirmar",
  cancelText: "Cancelar",
  onConfirm: undefined,
  onCancel: undefined,
  extraContent: undefined,
  extraState: undefined,

  show: (options) =>
    set({
      open: true,
      ...options,
      extraContent: options.extraContent,
      extraState: options.extraState,
    }),

  hide: () =>
    set({
      open: false,
      title: "",
      description: "",
      confirmText: "Confirmar",
      cancelText: "Cancelar",
      onConfirm: undefined,
      onCancel: undefined,
      extraContent: undefined,
      extraState: undefined,
    }),
}));

export const useConfirm = () => {
  const { show } = useConfirmStore();
  return show;
};
