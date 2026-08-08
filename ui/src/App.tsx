import { AppShell } from '@mantine/core'
import { Footer as SiteFooter } from 'layout/Footer'
import { Header as SiteHeader } from 'layout/Header'
import { Main } from 'layout/Main'
import React from 'react'

export const App = () => {
  return (
    <AppShell padding={0} header={{ height: 76 }}>
      <AppShell.Header p={0}>
        <SiteHeader />
      </AppShell.Header>
      <AppShell.Main>
        <Main />
        <SiteFooter />
      </AppShell.Main>
    </AppShell>
  )
}
