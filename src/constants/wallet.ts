import { arbitrum, mainnet, monadTestnet, sepolia, type AppKitNetwork } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

import type { CreateAppKit } from '@reown/appkit/react'

export const RPC_URL = import.meta.env.VITE_MONAD_RPC || monadTestnet.rpcUrls.default.http[0]

// Get projectId from https://cloud.reown.com
export const projectId = import.meta.env.VITE_PROJECT_ID // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const metadata: CreateAppKit['metadata'] = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: location.origin, // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// for custom networks visit -> https://docs.reown.com/appkit/react/core/custom-networks
export const networks = [mainnet, arbitrum, sepolia] as [AppKitNetwork, ...AppKitNetwork[]]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks
})

export const wagmiConfig = wagmiAdapter.wagmiConfig
