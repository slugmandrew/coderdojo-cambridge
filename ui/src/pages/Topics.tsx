import { Box, Text } from '@mantine/core'
import { ContentCard } from 'components/ContentCard'
import { Heading2 } from 'components/Heading2'
import { PageHeading } from 'components/PageHeading'
import { Paragraph } from 'components/Paragraph'
import { ProjectGrid } from 'components/ProjectGrid'
import data from 'data/ProjectData'
import React from 'react'
import { Christmas } from 'topics/Christmas'
import { SenseHat } from 'topics/SenseHat'
import { Python } from 'topics/Python'
import { MicroBit } from 'topics/MicroBit'
import { Stories } from 'topics/Stories'
import { WebDesign } from '../topics/WebDesign'
import { Printing } from '../topics/Printing'

export const Topics = () => (
  <>
    <PageHeading>Topics</PageHeading>

    <ContentCard>
      <Box p='md'>
        <Heading2>Keeping it fresh</Heading2>
        <Paragraph>We like to work with many different languages and technologies, so we can keep things interesting and fun for everybody.</Paragraph>
        <Paragraph>
          As young coders are all of different ages and abilities, there is no set curriculum. We have projects that are suitable for beginners, and some that
          are more advanced.
        </Paragraph>
        <Paragraph>
          <b>What new technology or subject would you like to see in the future?</b>
        </Paragraph>
      </Box>
    </ContentCard>

    <ContentCard>
      <Box p='md'>
        <Printing />
        <Text fw={700} my='md' c='clubOrange.6'>
          Project List:
        </Text>
        <ProjectGrid projects={data.printingProjects} />
      </Box>
    </ContentCard>

    <ContentCard>
      <Box p='md'>
        <WebDesign />
      </Box>
    </ContentCard>

    <ContentCard>
      <Box p='md'>
        <Stories />
        <Text fw={700} my='md' c='clubOrange.6'>
          Project List:
        </Text>
        <ProjectGrid projects={data.storyProjects} />
      </Box>
    </ContentCard>

    <ContentCard>
      <Box p='md'>
        <MicroBit />
        <Text fw={700} my='md' c='clubOrange.6'>
          Project List:
        </Text>
        <ProjectGrid projects={data.microBitProjects} />
      </Box>
    </ContentCard>
    <ContentCard>
      <Box p='md'>
        <Christmas />
        <Text fw={700} my='md' c='clubOrange.6'>
          Project List:
        </Text>
        <ProjectGrid projects={data.christmasProjects} />
      </Box>
    </ContentCard>
    <ContentCard>
      <Box p='md'>
        <Python />
        <Text fw={700} my='md' c='clubOrange.6'>
          Project List:
        </Text>
        <ProjectGrid projects={data.pythonProjects} />
      </Box>
    </ContentCard>
    <ContentCard>
      <Box p='md'>
        <SenseHat />
        <Text fw={700} my='md'>
          Project List:
        </Text>
        <ProjectGrid projects={data.raspberryPiProjects} />
      </Box>
    </ContentCard>
  </>
)
