'use client'

import React, { type PropsWithChildren } from 'react'
import { fetchNonce, fetchSession, removeSession, verifyMessageAndCreateSession } from '@/apis/auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  type SIWECreateMessageArgs,
  type SIWEVerifyMessageArgs,
  createSIWEConfig,
  formatMessage,
} from '@web3modal/siwe'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider } from 'wagmi'
import { optimismSepolia } from 'wagmi/chains'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal SIWE Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const chains = [optimismSepolia] as const
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

// 2.5 Create SIWE config
async function getNonce(address?: string) {
  //...
  const nonce = await fetchNonce(address)
  console.log(`[debug]: 0. call get nonce with params: ${address}, result: ${nonce}`)
  return nonce
}

async function getMessageParams() {
  console.log(`[debug]: 1. call get message params`)
  return {
    domain: window.location.host,
    uri: window.location.origin,
    chains: [optimismSepolia.id],
    statement: 'Please sign with your account',
  }
}

/* Use your SIWE server to verify if the message and the signature are valid */
async function verifyMessage({ message, signature }: SIWEVerifyMessageArgs) {
  //...
  console.log(`[debug]: 3. call verify message with params:`, message, signature)
  const result = await verifyMessageAndCreateSession({ message, signature })
  // TODO: read and set token for compose in common request
  console.log(`[debug]: 3. call verify message with result:`, result)

  return true
}

/* Function that returns the user's session - this should come from your SIWE backend */
async function getSession() {
  //...
  console.log(`[debug]: 4. call get session`)
  const session = await fetchSession()
  console.log(`[debug]: 4. call get session with result:`, session)
  return session
}

async function signOut() {
  //...
  console.log(`[debug]: other. call sign out`)
  await removeSession()
  return true
}

/* Create a SIWE configuration object */
const siweConfig = createSIWEConfig({
  getMessageParams,
  createMessage: ({ address, ...args }: SIWECreateMessageArgs) => formatMessage(args, address),
  getNonce,
  getSession,
  verifyMessage,
  signOut,
})

// 3. Create modal
createWeb3Modal({
  themeMode: 'light',
  wagmiConfig,
  siweConfig,
  projectId,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
  enableOnramp: false, // Optional - false as default
})

export const Web3ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <WagmiProvider config={wagmiConfig} initialState={undefined}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
