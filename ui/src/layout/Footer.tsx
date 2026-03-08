import { Anchor, Box, Container, Group, Text } from '@mantine/core'
import React from 'react'

export const Footer = () => (
  <Box bg='#f1f3f5' mt='xl' py='xl' style={{ borderTop: '1px solid #dee2e6' }}>
    <Container size='xl'>
      <Group spacing='md'>
        <Anchor href='https://zen.coderdojo.com/dojos/gb/cambridge/cambridge-makespace'>Cambridge @ Makespace Dojo</Anchor>
        <Anchor href='https://web.makespace.org'>Makespace</Anchor>
        <Anchor href='https://www.raspberrypi.org/'>Raspberry Pi</Anchor>
        <Anchor href='https://www.coolestprojects.org/'>Coolest Projects</Anchor>
      </Group>
      <Text c='dimmed' size='sm' mt='sm'>Community-run coding club for ages 7–17.</Text>
    </Container>
  </Box>
)

