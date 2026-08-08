import { Container, Group } from '@mantine/core'
import { SiteLogo } from 'components/SiteLogo'
import { Navbar } from 'layout/Navbar'
import React from 'react'

export const Header = () => {
  return (
    <Container h='100%' px={{ base: 'md', sm: 'xl' }}>
      <Group h='100%' justify='space-between' wrap='nowrap'>
        <SiteLogo />
        <Navbar />
      </Group>
    </Container>
  )
}
