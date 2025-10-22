import AuthProvider from "@/provider/AuthProvider";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
