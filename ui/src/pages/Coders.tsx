import { Box, Image, Stack } from '@mantine/core'
import { ContentCard } from 'components/ContentCard'
import { Heading2 } from 'components/Heading2'
import { Heading3 } from 'components/Heading3'
import { PageHeading } from 'components/PageHeading'
import { Paragraph } from 'components/Paragraph'
import { TextLink } from 'components/TextLink'
import group from 'image/characters/code_club_group.png'
import React from 'react'

export const Coders = () => (
  <Box>
    <PageHeading>Coders</PageHeading>

    <Heading2>Information for coders</Heading2>

    <Image src={group} fit='contain' alt='A group of young coders' mb='md' />

    <Stack gap='md'>
      <ContentCard noMargin>
        <Box p='md'>
          <Heading3>Who can come?</Heading3>
          <Paragraph>
            Code Club is for <strong>young people aged between 7 and 17</strong>, whether you are completely new to coding or already have lots of experience.
          </Paragraph>
        </Box>
      </ContentCard>
      <ContentCard>
        <Box p='md'>
          <Heading3>How to join Code Club</Heading3>
          <Paragraph>
            Start by visiting our <TextLink href='https://codeclub.org/en/clubs/gb/cambridge/cambridge-makespace'>Code Club page</TextLink> and subscribing for
            updates.
          </Paragraph>
          <Paragraph>Once sessions are announced, you can book a place for the date you would like to attend.</Paragraph>
          <Paragraph>
            <strong>
              Every young coder MUST have a ticket for each session they attend. Parents do not need a ticket, but must also attend for children under 12.
            </strong>
          </Paragraph>
        </Box>
      </ContentCard>
      <ContentCard>
        <Box p='md'>
          <Heading3>What do young coders do?</Heading3>
          <Paragraph>Young coders come to club sessions to develop their coding skills.</Paragraph>
          <Paragraph>
            They work on a project of their own choosing in order to learn something new, have fun, and maybe make some friends along the way.
          </Paragraph>
          <Paragraph>
            <strong>You can work on any kind of project you like</strong> at the club, so feel free to bring along anything you have already been working on!
          </Paragraph>
        </Box>
      </ContentCard>
      <ContentCard>
        <Box p='md'>
          <Heading3>Learning together</Heading3>
          <Paragraph>
            Code Club is a place for <strong>immersive learning</strong>: somewhere to practise a skill with others, support each other, and get better as a
            team.
          </Paragraph>
          <Paragraph>
            Coders need to <strong>focus</strong>, <strong>work hard, and never give up</strong> if things get tough. This is how you master a new skill.
          </Paragraph>
        </Box>
      </ContentCard>
    </Stack>
  </Box>
)
