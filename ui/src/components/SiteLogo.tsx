import { Anchor, Group, Image, Stack, Text } from '@mantine/core'
import logo from 'image/coderdojo-cambridge-logo_trans_round.png'
import React from 'react'
import { Link as RouterLink } from 'react-router'

export const SiteLogo = () => {
  return (
    <Anchor component={RouterLink} to='/' className='site-logo' underline='never'>
      <Group gap='sm' wrap='nowrap' align='center'>
        <Image src={logo} fit='contain' alt='' h={58} w={58} />
        <Stack gap={0}>
          <Text className='site-logo-name' fw={900} c='gray.9' lh={1}>
            Code Club Cambridge
          </Text>
          <Text className='site-logo-tagline' c='dojoTeal.7' fw={800} tt='uppercase' lts={0.6}>
            At Makespace · Ages 7–17
          </Text>
        </Stack>
      </Group>
    </Anchor>
  )
}
