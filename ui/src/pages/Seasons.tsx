import { Box, Text } from '@chakra-ui/react'
import { ContentCard } from 'components/ContentCard'
import { Heading2 } from 'components/Heading2'
import { PageHeading } from 'components/PageHeading'
import { Paragraph } from 'components/Paragraph'
import { ProjectGrid } from 'components/ProjectGrid'
import data from 'data/ProjectData'
import { NavLink } from 'layout/Navbar'
import React from 'react'
import { Christmas } from 'seasons/Christmas'
import { Season01 } from 'seasons/Season01'
import { Season02 } from 'seasons/Season02'
import { Season03 } from 'seasons/Season03'

export const Seasons = () => (
  <>
    <PageHeading>Seasons</PageHeading>

    <ContentCard>
      <Box p={5} pb={5}>
        <Heading2>Keeping it fresh</Heading2>
        <Paragraph>
          Every few months we introduce <b>a new theme</b> into the dojo, which runs <b>alongside our usual activities</b>.
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
        <Season03 />
        <Text fontWeight={'bold'} my={5} color={'custom.orange'}>
          Project List:
        </Text>
        <ProjectGrid projects={data.microBitProjects} />
      </Box>
    </ContentCard>
    <ContentCard>
      <Box p={5}>
        <Christmas />
        <Text fontWeight={'bold'} my={5} color={'custom.orange'}>
          Project List:
        </Text>
        <ProjectGrid projects={data.christmasProjects} />
      </Box>
    </ContentCard>
    <ContentCard>
      <Box p={5}>
        <Season02 />
        <Text fontWeight={'bold'} my={5} color={'custom.orange'}>
          Project List:
        </Text>
        <ProjectGrid projects={data.pythonProjects} />
      </Box>
    </ContentCard>
    <ContentCard>
      <Box p={5}>
        <Season01 />
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
