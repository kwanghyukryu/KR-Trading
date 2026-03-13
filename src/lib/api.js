const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export async function apiRequest(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const message = data?.error || `Request failed: ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}
