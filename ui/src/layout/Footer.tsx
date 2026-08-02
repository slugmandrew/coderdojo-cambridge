import { Anchor, Container, Divider, Stack } from '@mantine/core'
import React from 'react'

export const Footer = () => {
  return (
    <Container
      component='footer'
      fluid
      px='xl'
      py='xl'
      style={(theme) => ({ backgroundColor: theme.colors.gray[0], borderTop: `1px solid ${theme.colors.gray[3]}` })}>
      <Stack gap='sm'>
        <Anchor href={'https://zen.coderdojo.com/dojos/gb/cambridge/cambridge-makespace'} c='dojoOrange.6'>
          Cambridge @ Makespace Dojo
        </Anchor>
        <Divider />
        <Anchor href={'https://web.makespace.org'} c='dimmed'>
          Makespace
        </Anchor>
        <Anchor href={'https://www.raspberrypi.org/'} c='red.7'>
          Raspberry Pi
        </Anchor>
        <Anchor href={'https://www.coolestprojects.org/'} c='violet.7'>
          Coolest Projects
        </Anchor>
        <Anchor target={'_blank'} href={'https://astro-pi.org/mission-zero/'} c='pink.6'>
          ASTRO PI :: MISSION ZERO
        </Anchor>
        <Anchor target={'_blank'} href={'https://twitter.com/CoderDojoCamUK/'} c='blue.6'>
          Twitter
        </Anchor>
      </Stack>
    </Container>
  )
}
