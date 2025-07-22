// lib/useAdminAccess.ts
import { useEffect, useState } from 'react'

export function useAdminAccess() {
  const [access, setAccess] = useState(false)

  useEffect(() => {
    const auth = window.sessionStorage.getItem('admin_access')
    if (auth === 'true') setAccess(true)
  }, [])

  const verify = (input: string) => {
    if (input === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      window.sessionStorage.setItem('admin_access', 'true')
      setAccess(true)
    }
  }

  return { access, verify }
}
