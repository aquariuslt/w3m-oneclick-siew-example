import React, { useEffect, useState } from 'react'
import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react'
import { useSession } from '@/hooks/use-session'

export const SiweGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, isSuccess: isInitSessionSuccess, isError: isInitSessionError } = useSession()
  const [loading, setLoading] = useState<boolean>(true)
  const { open: isWeb3ModalOpen, loading: isWeb3ModalLoading } = useWeb3ModalState()
  const { open: openWeb3Modal, close: closeWeb3Modal } = useWeb3Modal()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      if (isInitSessionSuccess && session === null) {
        console.log(`[debug]: will open web3 modal since not signed in`)
        void openWeb3Modal()
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [isInitSessionSuccess, session])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      if (!isWeb3ModalLoading) {
        if (!isWeb3ModalOpen && session === null) {
          console.log(`[debug]: will open web3 modal when modal close without session`)
          void openWeb3Modal()
        }
      }
      if (session && isWeb3ModalOpen) {
        void closeWeb3Modal()
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [isWeb3ModalOpen, isWeb3ModalLoading, session])

  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center">Loading...</div>
  }

  if (isInitSessionError) {
    return <div className="w-full h-screen flex items-center justify-center">Error...</div>
  }

  if (session === null) {
    return <div className="w-full h-screen flex items-center justify-center filter blur-md">{children}</div>
  }

  return <>{children}</>
}
