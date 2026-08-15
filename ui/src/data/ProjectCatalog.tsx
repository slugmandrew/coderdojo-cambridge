import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Project } from 'types/Project'

export type ProjectCatalog = {
  projects: Project[]
}

const emptyCatalog: ProjectCatalog = {
  projects: [],
}

const ProjectCatalogContext = createContext<{ catalog: ProjectCatalog; loading: boolean; refresh: () => Promise<void> } | undefined>(undefined)

export const ProjectCatalogProvider = ({ children }: { children: ReactNode }) => {
  const [catalog, setCatalog] = useState(emptyCatalog)
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    try {
      const response = await fetch('/api/projects')
      if (!response.ok) throw new Error('Projects could not be loaded')
      setCatalog((await response.json()) as ProjectCatalog)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void refresh().catch(() => undefined)
  }, [])

  return <ProjectCatalogContext.Provider value={{ catalog, loading, refresh }}>{children}</ProjectCatalogContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProjectCatalog = () => {
  const value = useContext(ProjectCatalogContext)
  if (!value) throw new Error('useProjectCatalog must be used inside ProjectCatalogProvider')
  return value
}
