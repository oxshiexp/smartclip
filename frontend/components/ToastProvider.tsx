"use client";

import * as React from "react";
import { XCircle } from "lucide-react";

import {
  ToastProvider as RadixToastProvider,
  ToastViewport,
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
} from "@/components/ui/toast";

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
}

interface ToastContextValue {
  pushToast: (toast: Omit<ToastMessage, "id">) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = React.useState<ToastMessage[]>([]);

  const pushToast = React.useCallback((toast: Omit<ToastMessage, "id">) => {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: toast.title, description: toast.description },
    ]);
  }, []);

  return (
    <ToastContext.Provider value={{ pushToast }}>
      <RadixToastProvider swipeDirection="right">
        {children}
        {messages.map((toast) => (
          <Toast key={toast.id} duration={4000}>
            <div className="grid gap-1">
              <ToastTitle>{toast.title}</ToastTitle>
              {toast.description ? (
                <ToastDescription>{toast.description}</ToastDescription>
              ) : null}
            </div>
            <ToastClose>
              <XCircle className="h-4 w-4" />
            </ToastClose>
          </Toast>
        ))}
        <ToastViewport />
      </RadixToastProvider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
