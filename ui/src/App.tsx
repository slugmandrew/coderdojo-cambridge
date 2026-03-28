import { AppShell, Footer as MantineFooter, Header as MantineHeader } from '@mantine/core'
import { Footer as SiteFooter } from 'layout/Footer'
import { Header as SiteHeader } from 'layout/Header'
import { Main } from 'layout/Main'
import { Navbar } from 'layout/Navbar'
import React from 'react'

export const App = () => {
  return (
    <AppShell
      padding={0}
      header={
        <MantineHeader height={{ base: 168, md: 188 }} p={0}>
          <SiteHeader />
          <Navbar />
        </MantineHeader>
      }
      footer={
        <MantineFooter height={{ base: 240, md: 156 }} p={0}>
          <SiteFooter />
        </MantineFooter>
      }>
      <Main />
    </AppShell>
  )
}
