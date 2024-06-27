import {
  type SIWESession,
  type SIWEVerifyMessageArgs,
  getAddressFromMessage,
  getChainIdFromMessage,
} from '@web3modal/siwe'

const BASE_URL = 'http://localhost:3001/api/v1/auth'

export const fetchSession = async () => {
  const endpoint = BASE_URL + '/siwe/session'
  const token = getAuthToken()

  let res = null
  try {
    const fetchSessionRes = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (fetchSessionRes.ok) {
      res = await fetchSessionRes.json()
    }
  } catch (error) {}

  return res
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

const setAuthToken = (token: string) => {
  localStorage.setItem('siwe-token', token)
}

const getAuthToken = () => {
  return localStorage.getItem('siwe-token')
}
