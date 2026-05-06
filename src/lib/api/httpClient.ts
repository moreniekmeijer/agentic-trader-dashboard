export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

function buildUrl(path: string): string {
  if (!API_BASE_URL) {
    return path
  }
  return `${API_BASE_URL}${path}`
}

export async function getJson(path: string): Promise<unknown> {
  const response = await fetch(buildUrl(path), {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Request failed for ${path}: ${response.status}`)
  }

  return response.json()
}

