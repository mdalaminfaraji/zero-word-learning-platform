"use client";
import React from "react";

import { ApolloProvider as GraphQlApolloProvider } from "@apollo/client";
import apolloClient from "../../lib/apoloclient";

const ApolloProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <GraphQlApolloProvider client={apolloClient}>
      {children}
    </GraphQlApolloProvider>
  );
};

export default ApolloProvider;
