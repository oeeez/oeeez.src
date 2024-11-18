import { useState, useCallback } from 'react'
import { api } from '../services/api'

interface ApiResponse<T> {
  data: T | null
  error: Error | null
  loading: boolean
}

export function useApi<T>() {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: false,
  })

  const request = useCallback(async (
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: any
  ) => {
    setState(prev => ({ ...prev, loading: true }))
    try {
      const response = await api[method](url, data)
      setState({ data: response.data, error: null, loading: false })
      return response.data
    } catch (error) {
      setState({ data: null, error: error as Error, loading: false })
      throw error
    }
  }, [])

  return {
    ...state,
    get: (url: string) => request('get', url),
    post: (url: string, data: any) => request('post', url, data),
    put: (url: string, data: any) => request('put', url, data),
    delete: (url: string) => request('delete', url),
  }
}
