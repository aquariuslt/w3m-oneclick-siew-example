# SIWE One-Click Auth Example

This is a monorepo example of a SIWE application with one-click authentication refer to
[Web3Modal - React SIWE One-Click Auth](https://docs.walletconnect.com/appkit/react/core/siwe).

Client: create from `create-next-app` with tailwind css, wagmi, @web3modal
Server: create from `@nestjs/cli` with jwt sign flow



> It's non-production ready and only for educational purposes.
> Use optimism-sepolia as dev network




## Getting Started

### Install dependencies

```bash
cd /path/to/project
yarn install
```

### Start the client

> Pre-requisite: Make sure you have your own WALLETCONNECT_PROJECT_ID
> `cp .env.example .env` and update the `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

```bash
cd apps/client
yarn dev
```

client will run at http://localhost:3000

### Start the server

> Pre-requisite: 
> `cp .env.example .env` and update the `JWT_SECRET` (e.g. 123456)


```bash
cd apps/server
yarn start
```

client will run at http://localhost:3001




### Test Flow

open browser at http://localhost:3000 

> You can check console log to see how siwe related functions are called