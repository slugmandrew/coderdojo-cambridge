import { Box, Image, Stack } from '@mantine/core'
import { ContentCard } from 'components/ContentCard'
import { Heading2 } from 'components/Heading2'
import { Heading3 } from 'components/Heading3'
import { PageHeading } from 'components/PageHeading'
import { Paragraph } from 'components/Paragraph'
import { TextLink } from 'components/TextLink'
import group from 'image/characters/dojo_group.png'
import React from 'react'

export const Ninjas = () => (
  <Box>
    <PageHeading>Ninjas</PageHeading>

    <Heading2>Information For Ninjas</Heading2>

    <Image src={group} fit='contain' alt='Ninja group' mb='md' />

    <Stack gap='md'>
      <ContentCard noMargin>
        <Box p='md'>
          <Heading3>What is a Ninja?</Heading3>
          <Paragraph>
            Ninjas are the <strong>young people that attend the dojo</strong>. If you're <strong>aged between 7 and 17</strong>, then that's you!
          </Paragraph>
        </Box>
      </ContentCard>
      <ContentCard>
        <Box p='md'>
          <Heading3>How to become a Ninja</Heading3>
          <Paragraph>
            The first thing to do is register on the{' '}
            <TextLink href='https://zen.coderdojo.com/dojos/gb/cambridge/cambridge-makespace'>CoderDojo Portal HERE</TextLink>.
          </Paragraph>
          <Paragraph>
            Once you have done that you can register for the individual sessions as they are announced. Keep an eye on your email inbox and on{' '}
            <TextLink href='https://twitter.com/CoderDojoCamUK'>Twitter</TextLink> for announcements.
          </Paragraph>
          <Paragraph>
            <strong>
              All ninjas MUST have a ticket for every session they attend. Parents do not need a ticket, but must also attend for children under 12.
            </strong>
          </Paragraph>
        </Box>
      </ContentCard>
      <ContentCard>
        <Box p='md'>
          <Heading3>What do Ninjas do?</Heading3>
          <Paragraph>Ninjas come to dojo sessions to train their coding skills.</Paragraph>
          <Paragraph>
            They work on a project of their own choosing in order to learn something new, have fun, and maybe make some friends along the way.
          </Paragraph>
          <Paragraph>
            <strong>You can work on any kind of project you like</strong> at the dojo, so feel free to bring along anything you have already been working on!
          </Paragraph>
        </Box>
      </ContentCard>
      <ContentCard>
        <Box p='md'>
          <Heading3>Why are they called Ninjas?</Heading3>
          <Paragraph>Because it's CoderDojo, of course!</Paragraph>
          <Paragraph>
            A 'dojo' is somewhere that martial artists train, but really it's any place for any kind of <strong>immersive learning</strong> - somewhere to train
            a skill with others, and support each other and get better as a team.
          </Paragraph>
          <Paragraph>
            Ninjas need to <strong>focus</strong>, <strong>work hard, and never give up</strong> if things get tough. This is how you become a master.
          </Paragraph>
        </Box>
      </ContentCard>
    </Stack>
  </Box>
)
