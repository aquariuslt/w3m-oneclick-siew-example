'use client'

import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useAccount } from 'wagmi'
import { Console } from '@/components/console/console'
import { ConnectButton } from '@/components/wc/connect-button'

const Home: NextPage = () => {
  const [debugData, setDebugData] = useState<object>({})

  const { address, status, chainId } = useAccount()

  useEffect(() => {
    setDebugData(v => ({
      ...v,
      account: {
        address,
        status,
        chainId,
      },
    }))
  }, [address, status, chainId])

  return (
    <div className="container p-4 h-screen flex flex-col">
      <section className="w-full flex-row">
        <div className="flex flex-row-reverse">
          <ConnectButton />
        </div>
      </section>

      <section className="w-full mt-auto">
        <Console data={JSON.stringify(debugData, null, 2)} />
      </section>
    </div>
  )
}

export default Home
