"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { SessionProvider } from "next-auth/react";
import { Header } from "@/components/header";

export default function MainProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <SessionProvider>
      <Provider store={store}>
        <Header />
        {children}
      </Provider>
    // </SessionProvider>
  );
}
