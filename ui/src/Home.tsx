import { Box, Flex, Image, Stack } from '@chakra-ui/react'
import { ContentCard } from 'components/ContentCard'
import { Paragraph } from 'components/Paragraph'
import { SubHeading } from 'components/SubHeading'
import { CurrentSeason } from 'CurrentSeason'
import laptopHands from 'image/laptop_hands.png'
import React from 'react'

export const Home = () => (
  <>
    <ContentCard>
      <Stack direction={['column', null, 'row']}>
        <Flex w={['full', null, '50%']} maxH={['250px', null, 'fit-content']}>
          <Image src={laptopHands} objectFit={'cover'} />
        </Flex>
        <Box p={5}>
          <SubHeading>Welcome to our dojo!</SubHeading>
          <Paragraph>We are a free, community-run coding club for young people aged 7-17. </Paragraph>
          <Paragraph>
            We are located in <b>Central Cambridge</b> and sessions run every month, on the <b>first Saturday of the month</b>.
          </Paragraph>
          <Paragraph>We learn to code in Scratch, Python, HTML, Java, Unity (C#) and more!</Paragraph>
          <Paragraph>Here's what's happening at the club right now:</Paragraph>
        </Box>
      </Stack>
    </ContentCard>

    <CurrentSeason />
  </>
)
