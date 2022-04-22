import { Box } from '@chakra-ui/react'
import { Paragraph } from 'components/Paragraph'
import { CurrentSeason } from 'CurrentSeason'
import React from 'react'

export const Home = () => (
  <>
    <Box w={'container.sm'}>
      <Paragraph>Welcome to the home of the Cambridge @ Makespace CoderDojo!</Paragraph>
      <Paragraph>We are a community-run coding club for young people aged 7-17.</Paragraph>
      <Paragraph>Our sessions run every month, on the first Saturday of the month.</Paragraph>
      <Paragraph>Here's what's happening at the club right now:</Paragraph>
    </Box>
    <CurrentSeason />
  </>
)
