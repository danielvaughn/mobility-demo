
const getApiUrl = () => {
  const protocol = import.meta.env.VITE_API_PROTOCOL
  const domain = import.meta.env.VITE_API_DOMAIN
  const port = import.meta.env.VITE_API_PROTOCOL ? `:${import.meta.env.VITE_API_PROTOCOL}` : ''

  return `${protocol}://${domain}${port}`
}

const getHeaders = () => {
  const headers = { 'Content-Type': 'application/json' }
  const token = window.localStorage.getItem('t')

  if (token) {
    // headers.Authorization = `Bearer ${token}`
    headers['x-auth'] = token
  }

  return headers
}

export const GET = async (path, query = {}) => {
  const url = new URL(`${getApiUrl()}/${path}`)
  const headers = getHeaders()

  Object.entries(query).forEach((param) => {
    url.searchParams.append(...param)
  })

  const response = await fetch(url, {
    method: 'GET',
    headers,
  })

  let json = {}
  try {
    json = await response.json()
  } catch (error) {
    // do nothing - a successful response will sometimes be a 204 empty: DanielV
  }

  if (response.status >= 400) {
    const error = new Error(json.message)
    error.status = response.status
    throw error
  }

  return json
}
