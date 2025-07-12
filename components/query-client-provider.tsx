'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

type TQueryClientProviderProps = {
    children: React.ReactNode;
};

export function QueryClientProviderWrapper({ children }: TQueryClientProviderProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // With SSR, we usually want to set some default staleTime
                        // above 0 to avoid refetching immediately on the client
                        staleTime: 60 * 1000, // 1 minute
                        retry: 2,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
} 