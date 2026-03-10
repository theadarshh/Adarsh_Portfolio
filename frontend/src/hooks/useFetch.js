import { useState, useEffect, useCallback } from 'react'

export function useFetch(fn, fallback = null) {
  const [data, setData]       = useState(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const load = useCallback(async () => {
    setLoading(true); setError(null)
    try { setData(await fn()) }
    catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }, [fn])

  useEffect(() => { load() }, [load])
  return { data, loading, error, refetch: load }
}
