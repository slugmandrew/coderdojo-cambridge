import { Anchor, Box, SimpleGrid, Text } from '@mantine/core'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ContentCard } from 'components/ContentCard'
import { Heading2 } from 'components/Heading2'
import { PageHeading } from 'components/PageHeading'
import { Paragraph } from 'components/Paragraph'
import React from 'react'

const mapUrl = 'https://www.openstreetmap.org/export/embed.html?bbox=0.1114%2C52.199%2C0.1214%2C52.205&layer=mapnik&marker=52.202%2C0.1164'
const largerMapUrl = 'https://www.openstreetmap.org/?mlat=52.202&mlon=0.1164#map=18/52.202/0.1164'

export const Location = () => {
  return (
    <>
      <PageHeading>Location</PageHeading>
      <ContentCard>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={0}>
          <Box h={500}>
            <Box
              component='iframe'
              title='Map showing Code Club Cambridge at 16 Mill Lane'
              src={mapUrl}
              loading='lazy'
              referrerPolicy='no-referrer'
              w='100%'
              h='100%'
              style={{ border: 0 }}
            />
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
            <Anchor href={largerMapUrl} target='_blank' rel='noreferrer' fw={700}>
              View a larger map <FontAwesomeIcon icon={faExternalLinkAlt} />
            </Anchor>

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
