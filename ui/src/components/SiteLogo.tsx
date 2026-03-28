import { Box, Group, Image, Stack, Text, Title } from '@mantine/core'
import logo from 'image/coderdojo-cambridge-logo.jpg'
import React from 'react'

export const SiteLogo = () => {
  return (
    <Group spacing='md' noWrap align='center'>
      <Box
        h={80}
        w={80}
        sx={(theme) => ({
          [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            height: 110,
            width: 110,
          },
        })}>
        <Image src={logo} fit='contain' alt='CoderDojo Cambridge logo' />
      </Box>
      <Stack spacing={0}>
        <Title order={1} sx={{ fontFamily: 'Big Shoulders Display, sans-serif', color: '#495057', lineHeight: 1 }}>
          CoderDojo Cambridge @ Makespace
        </Title>
        <Text size='lg' color='dojoTeal.7'>
          Code club for 7-17 year olds
        </Text>
      </Stack>
    </Group>
  )
}
