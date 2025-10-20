"use client";

import { Toaster as ToasterSonner } from "@/components/ui/sonner";
// import { baseAxiosResponseInterceptors } from "@/services/baseAxios";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import React, { useEffect } from "react";
import "../style/toast.css";
import { Toaster } from "@/components/ui/toaster";
interface NotificationProviderProps {
  children: React.ReactNode;
}

export default function NotificationProvider({
  children,
}: NotificationProviderProps) {
  // useEffect(() => {
  //   baseAxiosResponseInterceptors();
  // }, []);

  return (
    <>
      {children}
      <ToasterSonner
        theme="light"
        expand={true}
        visibleToasts={4}
        icons={{
          success: <CheckCircle color="green" />,
          error: <XCircle color="red" />,
          warning: <AlertTriangle color="orange" />,
        }}
        toastOptions={{
          classNames: {
            description: "sonner-toast-description",
            toast: "sonner-toast",
            success: "sonner-toast-success",
            error: "sonner-toast-error",
            warning: "sonner-toast-warning",
          },
        }}
      />
      <Toaster />
    </>
  );
}
