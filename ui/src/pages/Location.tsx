import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Image, Link, Stack, Text } from '@chakra-ui/react'
import { ContentCard } from 'components/ContentCard'
import { Heading2 } from 'components/Heading2'
import { PageHeading } from 'components/PageHeading'
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
      <PageHeading>Location</PageHeading>
      <ContentCard>
        <Stack direction={['column', null, 'row']} w={'full'}>
          <Box height={['300px', null, '500px']} w={['full', null, 3 / 5]}>
            <GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyAZnyic_SEgIQSTx_mjXSH3QLkaLQT7GM4' }} defaultCenter={location} defaultZoom={18}>
              <Marker lat={location.lat} lng={location.lng} text={location.address} />
            </GoogleMapReact>
          </Box>
          <Box h={['300px', null, 'full']} w={['full', null, 2 / 5]} p={5}>
            <Heading2>How to find us</Heading2>
            <Text my={'5'}>
              We are located at{' '}
              <Link href={'https://web.makespace.org/'} target='_blank' variant={'bold'} isExternal={true}>
                Makespace <ExternalLinkIcon mx='2px' />
              </Link>
              in central Cambridge.
            </Text>
            <Text my={'3'}>Our address is:</Text>
            <Text>16 Mill Lane</Text>
            <Text>Cambridge</Text>
            <Text>CB2 1RX</Text>
          </Box>
        </Stack>
      </ContentCard>
    </>
  )
}
