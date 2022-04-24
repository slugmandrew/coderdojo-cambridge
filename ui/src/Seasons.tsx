import { Box, Text } from '@chakra-ui/react'
import { PageHeading } from 'components/PageHeading'
import { Paragraph } from 'components/Paragraph'
import { ProjectGrid } from 'components/ProjectGrid'
import { CurrentSeason } from 'CurrentSeason'
import data from 'data/ProjectData'
import React from 'react'

export const Seasons = () => (
  <>
    <PageHeading>Seasons</PageHeading>
    <Box w={'container.sm'}>
      <Paragraph>
        Every 3-4 months we introduce <b>a new theme</b> into the dojo, which runs alongside our usual activities.
      </Paragraph>
      <Paragraph>
        It's a chance for everybody to <b>learn</b> a <i>new technology or language</i>, and have some fun with something new!
      </Paragraph>
      <Paragraph>
        <b>What new technology or subject would you like to see in the future?</b>
      </Paragraph>
    </Box>
    <CurrentSeason />
    <Text fontWeight={'bold'} my={5}>
      Here are some of the projects we'll be working through:
    </Text>
    <ProjectGrid projects={data.raspberryPiProjects} />
  </>
)
