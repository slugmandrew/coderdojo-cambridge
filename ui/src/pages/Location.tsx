import { Anchor, Box, SimpleGrid, Text } from '@mantine/core'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

  const [, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => setMap(null), [])

  return (
    <>
      <PageHeading>Location</PageHeading>
      <ContentCard>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={0}>
          <Box h={500}>
            {isLoaded ? (
              <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18} onLoad={onLoad} onUnmount={onUnmount}>
                <Marker position={center} title='CoderDojo, 16 Mill Lane, Cambridge, CB2 1RX' icon={logo} />
              </GoogleMap>
            ) : null}
          </Box>
          <Box p='md'>
            <Heading2>How to find us</Heading2>
            <Text my='md'>
              We are located at{' '}
              <Anchor href='https://web.makespace.org/' target='_blank' fw={700}>
                Makespace <FontAwesomeIcon icon={faExternalLinkAlt} />
              </Anchor>{' '}
              in central Cambridge.
            </Text>
            <Text my='sm'>Our address is:</Text>
            <Text>16 Mill Lane</Text>
            <Text>Cambridge</Text>
            <Text>CB2 1RX</Text>

            <Heading2>Get here by bus</Heading2>
            <Paragraph>
              Numbers 1, 2, 3, 4, 5, 6, 7 and 8 all stop at Drummer Street nearby, as well as the guided busway. From there it's just a 5 minute walk.
            </Paragraph>
          </Box>
        </SimpleGrid>
      </ContentCard>
    </>
  )
}
