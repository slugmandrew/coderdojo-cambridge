import { Box, Center, Image, SimpleGrid } from '@chakra-ui/react'
import { ContentCard } from 'components/ContentCard'
import { Heading2 } from 'components/Heading2'
import { Heading3 } from 'components/Heading3'
import { PageHeading } from 'components/PageHeading'
import { Paragraph } from 'components/Paragraph'
import { TextLink } from 'components/TextLink'
import ninjaYinYang from 'image/ninjas_yin_yang.png'
import React from 'react'

export const Ninjas = () => (
  <Box>
    <PageHeading>Ninjas</PageHeading>

    <Heading2>Information For Ninjas</Heading2>
    <Paragraph>Ninjas are the young people that attend the dojo. If you're aged between 7 and 17 then that's you!</Paragraph>

    <SimpleGrid columns={[null, 1, 1, 2]} spacingX={5}>
      <ContentCard>
        <Image src={ninjaYinYang} fit={'cover'} />
      </ContentCard>
      <ContentCard>
        <Box p={5} pb={10}>
          <Heading3>How To Become A Ninja</Heading3>
          <Paragraph>
            The first thing to do is register on the{' '}
            <TextLink href={'https://zen.coderdojo.com/dojos/gb/cambridge/cambridge-makespace'}>CoderDojo Portal HERE</TextLink>.
          </Paragraph>
          <Paragraph>
            Once you have done that you can register for the individual sessions as they are announced. Keep an eye on your inbox and on Twitter for
            announcements.
          </Paragraph>
          <Paragraph>
            <strong>
              All ninjas MUST have a ticket for every session they attend. Parents do not need a ticket, but must also attend for children under 12.
            </strong>
          </Paragraph>
        </Box>
      </ContentCard>
      <ContentCard>
        <Box p={5} pb={10}>
          <Heading3>What Do Ninjas Do?</Heading3>
          <Paragraph>Ninjas come to dojo sessions to train their coding skills.</Paragraph>
          <Paragraph>
            They work on a project of their own choosing in order to learn some new skills, have some fun, and maybe make some friends along the way.
          </Paragraph>
          <Paragraph>
            You can work on any kind of project you like at the dojo, so feel free to bring along anything you have already been working on!
          </Paragraph>
        </Box>
      </ContentCard>
      <ContentCard>
        <Box p={5} pb={10}>
          <Heading3>Why Are They Called Ninjas?</Heading3>
          <Paragraph>Because it's CoderDojo, of course!</Paragraph>
          <Paragraph>
            A 'dojo' is somewhere that martial artists train, but really it's any place for any kind of <strong>immersive learning</strong> - somewhere to train
            a skill with others, to support each other and get better as a team.
          </Paragraph>
          <Paragraph>Ninjas need to focus, work hard abd be disciplined.</Paragraph>
        </Box>
      </ContentCard>
    </SimpleGrid>

    <Center></Center>
  </Box>
)
