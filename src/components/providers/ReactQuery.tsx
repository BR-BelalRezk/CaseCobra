"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const client = new QueryClient();
export default function ReactQuery({
  children,
}:CHILDREN) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
