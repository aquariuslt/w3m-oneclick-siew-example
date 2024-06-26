'use client'

import React from 'react'
import type { NextPage } from 'next'
import { Console } from '@/components/console/console'
import { ConnectButton } from '@/components/wc/connect-button'

const Home: NextPage = () => {
  return (
    <div className="container p-4 h-screen flex flex-col">
      <section className="w-full flex-row">
        <div className="flex flex-row-reverse">
          <ConnectButton />
        </div>
      </section>

      <section className="w-full mt-auto">
        <Console />
      </section>
    </div>
  )
}

export default Home
