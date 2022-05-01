import { Flex, VStack } from '@chakra-ui/react'
import { SiteLogo } from 'components/SiteLogo'
import React from 'react'

export const Header = () => {
  return (
    <Flex w={'full'} h={'full'} padding={5}>
      <VStack spacing={5} w={'full'} h={'full'}>
        <SiteLogo />
        {/*<SiteLink />*/}
      </VStack>
    </Flex>
  )
}
