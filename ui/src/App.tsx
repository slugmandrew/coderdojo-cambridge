import { AppShell } from '@mantine/core'
import { Footer as SiteFooter } from 'layout/Footer'
import { Header as SiteHeader } from 'layout/Header'
import { Main } from 'layout/Main'
import { Navbar } from 'layout/Navbar'
import React from 'react'

export const App = () => {
  return (
    <AppShell padding={0} header={{ height: { base: 168, md: 188 } }}>
      <AppShell.Header p={0}>
        <SiteHeader />
        <Navbar />
      </AppShell.Header>
      <AppShell.Main>
        <Main />
        <SiteFooter />
      </AppShell.Main>
    </AppShell>
  )
}
