import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Link, Stack, Text } from '@chakra-ui/react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { ContentCard } from 'components/ContentCard'
import { Heading2 } from 'components/Heading2'
import { PageHeading } from 'components/PageHeading'
import { Paragraph } from 'components/Paragraph'
import logo from 'image/coderdojo-cambridge-logo_trans_round_40px.png'
import React, { useCallback, useState } from 'react'

const containerStyle = {
  width: '100%',
  height: '100%',
}

const center = {
  lat: 52.202,
  lng: 0.1164,
}

export const Location = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAZnyic_SEgIQSTx_mjXSH3QLkaLQT7GM4',
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = useCallback((map) => setMap(null), [])

  return (
    <>
      <PageHeading>Location</PageHeading>
      <ContentCard>
        <Stack direction={['column', null, 'row']} w={'full'}>
          <Box height={['300px', null, '500px']} w={['full', null, 3 / 5]}>
            {isLoaded ? (
              <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18} onLoad={onLoad} onUnmount={onUnmount}>
                <Marker position={center} title={'CoderDojo, 16 Mill Lane, Cambridge, CB2 1RX'} icon={logo} />
              </GoogleMap>
            ) : (
              <></>
            )}
          </Box>
          <Box h={['300px', null, 'full']} w={['full', null, 2 / 5]} p={5}>
            <Heading2>How to find us 📌</Heading2>
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

            <Heading2>Get here by bus 🚌</Heading2>
            <Paragraph>
              Numbers 1, 2, 3, 4, 5, 6, 7 and 8 all stop at Drummer Street nearby, as well as the guided busway. From there it's just a 5 minute walk.
            </Paragraph>
          </Box>
        </Stack>
      </ContentCard>
    </>
  )
}
