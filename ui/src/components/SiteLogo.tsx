import { Box, Group, Image, Stack, Text, Title } from '@mantine/core'
import logo from 'image/coderdojo-cambridge-logo.jpg'
import React from 'react'

export const SiteLogo = () => {
  return (
    <Group gap='md' wrap='nowrap' align='center'>
      <Box h={{ base: 80, md: 110 }} w={{ base: 80, md: 110 }}>
        <Image src={logo} fit='contain' alt='CoderDojo Cambridge logo' />
      </Box>
      <Stack gap={0}>
        <Title order={1} style={{ fontFamily: 'Big Shoulders Display, sans-serif', color: '#495057', lineHeight: 1 }}>
          CoderDojo Cambridge @ Makespace
        </Title>
        <Text size='lg' c='dojoTeal.7'>
          Code club for 7-17 year olds
        </Text>
      </Stack>
    </Group>
  )
}
