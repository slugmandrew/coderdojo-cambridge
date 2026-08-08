import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export type Mentor = { subject: string; email: string; name?: string; picture?: string }
type AuthResponse = { configured: boolean; authenticated: boolean; mentor?: Mentor }
type MentorContextValue = AuthResponse & { loading: boolean; refresh: () => Promise<void>; signOut: () => Promise<void> }

const MentorContext = createContext<MentorContextValue | undefined>(undefined)

const fetchAuth = async (): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/me')
  if (!response.ok) throw new Error()
  return (await response.json()) as AuthResponse
}

export const MentorProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthResponse>({ configured: false, authenticated: false })
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    try {
      setState(await fetchAuth())
    } catch {
      setState({ configured: false, authenticated: false })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let active = true
    void fetchAuth()
      .then((nextState) => active && setState(nextState))
      .catch(() => active && setState({ configured: false, authenticated: false }))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  const signOut = async () => {
    await fetch('/auth/logout', { method: 'POST' })
    await refresh()
  }

  return <MentorContext.Provider value={{ ...state, loading, refresh, signOut }}>{children}</MentorContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMentor = () => {
  const value = useContext(MentorContext)
  if (!value) throw new Error('useMentor must be used inside MentorProvider')
  return value
}
