const getApiUrl = (path) => {
  const protocol = import.meta.env.VITE_API_PROTOCOL
  const domain = import.meta.env.VITE_API_DOMAIN
  const port = import.meta.env.VITE_API_PORT ? `:${import.meta.env.VITE_API_PORT}` : ''
  const urlPath = path.startsWith('/') ? path.substring(1) : path

  const url = `${protocol}://${domain}${port}/${urlPath}`

  return new URL(url)
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
  const url = getApiUrl(path)
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

export const POST = async (path, body = {}) => {
  const url = getApiUrl(path)
  const headers = await getHeaders()

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  let json = {}
  try {
    json = await response.json()
  } catch (error) {
    switch (response.status) {
      case 401:
        throw new Error('Sorry, your username and/or password does not match our records. Please try again.')
      default:
        throw new Error('Sorry, we encountered an unexpected error. Please try again later.')
    }
  }

  return json
}
