import {
  type SIWESession,
  type SIWEVerifyMessageArgs,
  getAddressFromMessage,
  getChainIdFromMessage,
} from '@web3modal/siwe'

const BASE_URL = 'http://localhost:3001/api/v1/auth'

export const fetchSession = async (): Promise<SIWESession | null> => {
  const endpoint = BASE_URL + '/siwe/session'
  const token = getAuthToken()

  try {
    const fetchSessionRes = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (fetchSessionRes.ok) {
      return (await fetchSessionRes.json()) as SIWESession
    }
  } catch (error) {
    const message = (error as unknown as Error)?.message ?? 'Failed to fetch session'
    throw new Error(message)
  }
  return null
}

export const fetchNonce = async (address?: string) => {
  const endpoint = BASE_URL + '/siwe/nonce/' + address
  const res = await fetch(endpoint, {})
  const json = (await res.json()) as { nonce: string }
  return json.nonce
}

export const verifyMessageAndCreateSession = async (params: SIWEVerifyMessageArgs) => {
  const endpoint = BASE_URL + '/siwe/verify'

  const { message, signature } = params
  const address = getAddressFromMessage(message)
  const chainId = getChainIdFromMessage(message)

  const body = {
    address,
    chainId,
    message,
    signature,
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const json = (await res.json()) as { token: string }

  if (json.token) {
    setAuthToken(json.token)
  }
  return json
}

export const removeSession = async () => {
  const endpoint = BASE_URL + '/siwe/session'

  setAuthToken('')
  await fetch(endpoint, {
    method: 'DELETE',
  })
}

export const setAuthToken = (token: string) => {
  localStorage.setItem('siwe-token', token)
}

export const getAuthToken = () => {
  return localStorage.getItem('siwe-token')
}
