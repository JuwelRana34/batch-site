// lib/apiClient.ts
export const apiClient = async <T = any>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'API request failed');
  }

  return res.json();
};
