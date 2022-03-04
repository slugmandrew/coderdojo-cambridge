import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, Image, Link, Text } from '@chakra-ui/react'
import GoogleMapReact from 'google-map-react'
import logo from 'image/coderdojo-cambridge-logo_trans_round.png'
import React, { FC } from 'react'

const Marker: FC<{ lng: number; text: string; lat: number }> = () => {
  return (
    <>
      <Image w={'40px'} src={logo} fit={'contain'} />
    </>
  )
}

export const Location = () => {
  const location = {
    address: '16 Mill Lane, Cambridge, CB2 1RX',
    lat: 52.202,
    lng: 0.1164,
  }

  return (
    <>
      <Heading size={'2xl'} my={5}>
        Location
      </Heading>
      <Flex rounded={6} bgColor={'white'} border={'1px solid'} borderColor={'gray.200'} h={500} overflow={'auto'}>
        <Box height={'full'} w={2 / 3}>
          <GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyAZnyic_SEgIQSTx_mjXSH3QLkaLQT7GM4' }} defaultCenter={location} defaultZoom={18}>
            <Marker lat={location.lat} lng={location.lng} text={location.address} />
          </GoogleMapReact>
        </Box>
        <Box h={'full'} w={1 / 3} p={5}>
          <Heading size={'lg'} my={5} color={'custom.orange'}>
            How to find us
          </Heading>
          <Text my={'5'}>
            We are located at{' '}
            <Link href={'https://web.makespace.org/'} target="_blank" variant={'bold'} isExternal={true}>
              Makespace <ExternalLinkIcon mx="2px" />
            </Link>
            in central Cambridge.
          </Text>
          <Text my={'3'}>Our address is:</Text>
          <Text>16 Mill Lane</Text>
          <Text>Cambridge</Text>
          <Text>CB2 1RX</Text>
        </Box>
      </Flex>
    </>
  )
}
