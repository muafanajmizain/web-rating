// src/components/SWRProvider.js
'use client';

import { SWRConfig } from 'swr';
import { swrConfig, authFetcher } from '@/lib/swr-config';

export default function SWRProvider({ children }) {
  return (
    <SWRConfig
      value={{
        ...swrConfig,
        fetcher: authFetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
}
