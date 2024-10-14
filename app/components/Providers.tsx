// components/CartProvider.tsx
"use client";
import { CartProvider as USCProvider } from "use-shopping-cart";
import { ReactNode } from "react";

export default function CartProvider({ children }: { children: ReactNode }) {
  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe="pk_test_51Q9MQn2LE9Oi7HHjyDN3SucYK2iVuwcQQbMqq1zp8saz9P7R32c3nI1p1VVTw5ObNn5DMfGmKuc6ZjrTPQoIX4wQ00a9MIHLHL"
      successUrl="http://localhost:3000/stripe/success"
      cancelUrl="http://localhost:3000/stripe/cancel"
      currency="INR"
      billingAddressCollection={false}
      language="en-US"
      shouldPersist={true}  // Added this line to persist cart state
    >
      {children}
    </USCProvider>
  );
}
