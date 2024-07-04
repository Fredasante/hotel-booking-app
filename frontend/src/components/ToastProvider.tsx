import React from "react";
import { Toaster } from "sonner";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster visibleToasts={1} position="top-right" richColors />
      {children}
    </>
  );
};

export default ToastProvider;
