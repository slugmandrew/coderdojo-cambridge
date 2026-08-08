import { AppShell } from '@mantine/core'
import { MentorProvider } from 'auth/MentorContext'
import { ScrollToTop } from 'components/ScrollToTop'
import { ProjectCatalogProvider } from 'data/ProjectCatalog'
import { Footer as SiteFooter } from 'layout/Footer'
import { Header as SiteHeader } from 'layout/Header'
import { Main } from 'layout/Main'
import React from 'react'

export const App = () => {
  return (
    <MentorProvider>
      <ProjectCatalogProvider>
        <ScrollToTop />
        <AppShell padding={0} header={{ height: 84 }}>
          <AppShell.Header p={0}>
            <SiteHeader />
          </AppShell.Header>
          <AppShell.Main>
            <Main />
            <SiteFooter />
          </AppShell.Main>
        </AppShell>
      </ProjectCatalogProvider>
    </MentorProvider>
  )
}
