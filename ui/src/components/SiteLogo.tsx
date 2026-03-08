import { Box, Group, Image, Stack, Text, Title } from '@mantine/core'
import logo from 'image/coderdojo-cambridge-logo.jpg'
import React from 'react'

export const SiteLogo = () => (
  <Group spacing='md' noWrap>
    <Box w={72} h={72}>
      <Image src={logo} fit='contain' />
    </Box>
    <Stack spacing={2}>
      <Title order={2} ff='Big Shoulders Display' c='gray.8'>
        CoderDojo Cambridge @ Makespace
      </Title>
      <Text c='teal.7' fw={500}>
        Code club for 7-17 year olds
      </Text>
    </Stack>
  </Group>
)


