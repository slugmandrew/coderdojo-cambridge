import { Box, Stack } from '@mantine/core'
import { ContentCard } from 'components/ContentCard'
import { Heading2 } from 'components/Heading2'
import { Heading3 } from 'components/Heading3'
import { PageHeading } from 'components/PageHeading'
import { Paragraph } from 'components/Paragraph'
import { TextLink } from 'components/TextLink'
import { NavLink } from 'layout/Navbar'
import React from 'react'

export const Parents = () => (
  <>
    <PageHeading>Parents</PageHeading>
    <Heading2>Information For Parents</Heading2>

    <Stack spacing='md'>
      <ContentCard noMargin>
        <Box p='md'>
          <Heading3>What is Coderdojo?</Heading3>
          <Paragraph>
            <TextLink href='https://coderdojo.com/'>CoderDojo</TextLink> is a volunteer-led international organisation dedicated to providing opportunities for all children to learn to code.
          </Paragraph>
          <Paragraph>
            With the help of volunteers, we run monthly coding sessions on the second Saturday of every month from the classroom at <TextLink href='https://web.makespace.org/'>Makespace Cambridge</TextLink>, UK.
          </Paragraph>
          <Paragraph>The club is open to all abilities and we code in different languages and learn a range of different skills relating to coding and computer science.</Paragraph>
          <Paragraph>
            We believe everyone should be able to <i>really</i> control a computer and understand how it works. That knowledge enables us to have a bigger impact on the world around us, and learning early is the best time to do it!
          </Paragraph>
        </Box>
      </ContentCard>
      <ContentCard>
        <Box p='md'>
          <Heading3>Who are the volunteers?</Heading3>
          <Paragraph>We are a group of local people that are passionate about coding and sharing our knowledge.</Paragraph>
          <Paragraph>
            We give up our time for free, because we enjoy doing it and find it rewarding. More detailed information can be found on the <NavLink to='mentors'>Mentors</NavLink> page.
          </Paragraph>
        </Box>
      </ContentCard>
      <ContentCard>
        <Box p='md'>
          <Heading3>Can my child attend?</Heading3>
          <Paragraph>
            <strong>Of course!</strong> The only real restriction is that they should be aged between 7 and 17. Younger children are welcome to attend alongside older siblings, so long as you are willing to look after them and keep them close by.
          </Paragraph>
        </Box>
      </ContentCard>
      <ContentCard>
        <Box p='md'>
          <Heading3>How much does it cost??</Heading3>
          <Paragraph>
            <strong>It's completely free and always will be.</strong>
          </Paragraph>
          <Paragraph>There is no financial incentive for mentors, and we are not paid for our time.</Paragraph>
          <Paragraph>
            Parents sometimes express a desire to make a donation to the club in order to help finance equipment and other resources. If you would like to make a donation, please do get in touch, or speak to us at the next session. We are always somewhat limited by what equipment we have so any financial assistance would help greatly, ensuring we can provide a high-quality service for your children and many others for years to come.
          </Paragraph>
        </Box>
      </ContentCard>
      <ContentCard>
        <Box p='md'>
          <Heading3>Do I have to stay with my child for the entire session?</Heading3>
          <Paragraph>
            <strong>For children aged 7-12</strong>, you must come with them and stay for the duration of the session.
          </Paragraph>
          <Paragraph>
            <strong>For teens aged 13 and up</strong>, you must come with them on their first visit, but can leave them to it after that. It is also recommended that you aren't too far away, so that we can contact you in case of emergency.
          </Paragraph>
          <Paragraph>
            Official guidance on the CoderDojo portal is <TextLink href='https://help.coderdojo.com/cdkb/s/article/Do-parents-need-to-stay-for-the-duration-of-a-Dojo'>here</TextLink>.
          </Paragraph>
        </Box>
      </ContentCard>
      <ContentCard>
        <Box p='md'>
          <Heading3>Do I have to take part?</Heading3>
          <Paragraph>
            <strong>No.</strong> We have seating for parents if you just want to sit and read.
          </Paragraph>
          <Paragraph>Some parents find that their ninjas respond well when they work together on a project. Some parents find the opposite, and prefer to leave them to it.</Paragraph>
          <Paragraph>It's completely up to you, though we would probably say the parents that get involved are often learning and having as much fun (or more!) as the ninjas do.</Paragraph>
        </Box>
      </ContentCard>
      <ContentCard>
        <Box p='md'>
          <Heading3>Do I need a ticket?</Heading3>
          <Paragraph>
            <strong>No.</strong> Only ninjas need tickets.
          </Paragraph>
          <Paragraph>
            Please ensure your children all have tickets by booking on <TextLink href='https://zen.coderdojo.com/dojos/gb/cambridge/cambridge-makespace'>our page the Zen Portal</TextLink>
          </Paragraph>
        </Box>
      </ContentCard>
      <ContentCard>
        <Box p='md'>
          <Heading3>How do I get there?</Heading3>
          <Paragraph>We're located in central Cambridge, near the river on Mill Lane.</Paragraph>
          <Paragraph>
            For a map and address please see the <NavLink to='/location'>Location</NavLink> page.
          </Paragraph>
        </Box>
      </ContentCard>
      <ContentCard>
        <Box p='md'>
          <Heading3>Where can I find out more?</Heading3>
          <Paragraph>This website is solely dedicated to our local dojo.</Paragraph>
          <Paragraph>
            More general information can be found on the CoderDojo portal: <TextLink href='https://help.coderdojo.com/cdkb/s/topic/0TO8d000000PD5fGAG/attending-a-dojo'>Attending a Dojo</TextLink>
          </Paragraph>
          <Paragraph>
            You can also download the in-depth PDF guide here: <TextLink href='./pdf/CoderDojo_Parents_Handbook_DIGITAL.pdf'>Parents' guide to CoderDojo</TextLink>
          </Paragraph>
        </Box>
      </ContentCard>
    </Stack>
  </>
)
