"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CssBaseline } from "@mui/material";
import ThemeProviders from "@/providers/ThemeProviders";
import ApolloProvider from "@/providers/apolloProvider";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProviders>
      <AppRouterCacheProvider>
        <ApolloProvider>{children}</ApolloProvider>
      </AppRouterCacheProvider>
      <CssBaseline />
    </ThemeProviders>
  );
}
