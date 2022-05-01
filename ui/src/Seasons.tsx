import { Box, Text } from '@chakra-ui/react'
import { ContentCard } from 'components/ContentCard'
import { PageHeading } from 'components/PageHeading'
import { Paragraph } from 'components/Paragraph'
import { ProjectGrid } from 'components/ProjectGrid'
import { SubHeading } from 'components/SubHeading'
import { CurrentSeason } from 'CurrentSeason'
import data from 'data/ProjectData'
import { NavLink } from 'Navbar'
import React from 'react'

export const Seasons = () => (
  <>
    <PageHeading>Seasons</PageHeading>

    <ContentCard>
      <Box p={5} pb={5}>
        <SubHeading>Keeping it fresh</SubHeading>
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
    </ContentCard>

    <ContentCard>
      <Box p={5}>
        <CurrentSeason />
        <Text>
          More information about seasons can be found on the <NavLink to={'seasons'}>Seasons</NavLink> page
        </Text>
        <Text fontWeight={'bold'} my={5}>
          Here are some of the projects we'll be working through:
        </Text>
        <ProjectGrid projects={data.raspberryPiProjects} />
      </Box>
    </ContentCard>
  </>
)
