import React, { type PropsWithChildren } from 'react'

import { createAppKit } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

import { metadata, networks, projectId, wagmiAdapter } from '@/constants/wallet'

const queryClient = new QueryClient()

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    '--w3m-accent': '#000000'
  }
})

const WalletProvider: React.FC<PropsWithChildren> = (props) => {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} {...props}>
      <QueryClientProvider client={queryClient} {...props} />
    </WagmiProvider>
  )
}

export default WalletProvider
