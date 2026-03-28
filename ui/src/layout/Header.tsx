import { Container } from '@mantine/core'
import { SiteLogo } from 'components/SiteLogo'
import React from 'react'

export const Header = () => {
  return (
    <Container fluid px="md" py="xl">
        <SiteLogo />
        {/*<SiteLink />*/}
    </Container>
  )
}
