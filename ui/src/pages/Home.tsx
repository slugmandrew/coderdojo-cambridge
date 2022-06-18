import { Box, Button, chakra, Flex, Image, Link, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ContentCard } from 'components/ContentCard'
import { Paragraph } from 'components/Paragraph'
import { SubHeading } from 'components/SubHeading'
import laptopHands from 'image/laptop_hands.png'
import { NavLink } from 'layout/Navbar'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Season02 } from 'seasons/Season02'

export const Home = () => (
  <>
    <Stack direction={['column', 'column', 'row', 'row']} spacing={[0, 0, 5, 5]}>
      <Flex w={['full', 'full', '50%', 3 / 5, 2 / 3]}>
        <ContentCard>
          <Stack direction={['column', 'column', 'column', 'column', 'row']}>
            <Flex w={['full', 'full', 'full', 'full', 2 / 5]} maxH={['200px', '250px', '200px', '200px', 'fit-content']}>
              <Image src={laptopHands} objectFit={'cover'} />
            </Flex>
            <Box w={['full', 'full', 'full', 'full', 3 / 5]} px={5}>
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
      </Flex>
      <Box w={['full', 'full', '50%', 2 / 5, 1 / 3]}>
        <ContentCard>
          <Box px={5} pb={10} w={'full'}>
            <SubHeading color={'custom.teal'} center>
              2022 Calendar 📆
            </SubHeading>
            <VStack>
              <chakra.p>Saturday 5th February - We're Back! ✔</chakra.p>
              <chakra.p color={'green.500'}>
                Saturday <chakra.span fontWeight={'bold'}>5th March</chakra.span> (Springtime Pi #1) ✔
              </chakra.p>
              <chakra.p color={'green.500'}>
                Saturday <chakra.span fontWeight={'bold'}>2nd April</chakra.span> (Springtime Pi #2) ✔
              </chakra.p>
              <chakra.p color={'green.500'}>
                Saturday <chakra.span fontWeight={'bold'}>7th May</chakra.span> (Springtime Pi #3) ✔
              </chakra.p>
              <chakra.p color={'green.500'}>
                Saturday <chakra.span fontWeight={'bold'}>4th June</chakra.span> (Springtime Pi #4)
              </chakra.p>
              <chakra.p color={'gray.500'}>Future dates (possibly subject to change):</chakra.p>
              <chakra.p color={'gray.500'}>
                Saturday <chakra.span fontWeight={'bold'}>2nd July</chakra.span>
              </chakra.p>
              <chakra.p color={'gray.500'}>
                Saturday <chakra.span fontWeight={'bold'}>6th August</chakra.span>
              </chakra.p>
              <chakra.p color={'gray.500'}>
                Saturday <chakra.span fontWeight={'bold'}>3rd September</chakra.span>
              </chakra.p>
              <chakra.p color={'gray.500'}>
                Saturday <chakra.span fontWeight={'bold'}>1st October</chakra.span>
              </chakra.p>
              <chakra.p color={'gray.500'}>
                Saturday <chakra.span fontWeight={'bold'}>5th November</chakra.span>
              </chakra.p>
              <chakra.p color={'gray.500'}>
                Saturday <chakra.span fontWeight={'bold'}>3rd December</chakra.span>
              </chakra.p>
            </VStack>
            <Flex mt={10} alignContent={'center'} justifyContent={'center'}>
              <Link
                target={'_blank'}
                as={Button}
                onClick={() => window.open('https://zen.coderdojo.com/dojos/gb/cambridge/cambridge-makespace', '_blank')}
                variant={'bold'}
                size={'large'}
                rightIcon={<FontAwesomeIcon icon={faExternalLinkAlt} />}>
                Sign Up on the CoderDojo portal
              </Link>
            </Flex>
          </Box>
        </ContentCard>
      </Box>
    </Stack>

    <ContentCard>
      <Box p={5} pb={10}>
        <Season02 />
        <Text>
          More information about seasons can be found on the <NavLink to={'seasons'}>Seasons</NavLink> page
        </Text>
      </Box>
    </ContentCard>

    <Box>
      <Box>
        <SimpleGrid columns={[null, 1, 2, 3]} spacingX={5}>
          <ContentCard>
            <Box p={5} pb={10}>
              <SubHeading>
                <Link as={RouterLink} to={'projects'} variant={'subheading'} color={'teal.500'}>
                  Projects
                </Link>{' '}
                👩‍💻
              </SubHeading>
              <Text>
                You can work on anything you like at the dojo, but if you are new to coding or stuck for ideas, we have a set of <b>recommended projects</b> for
                you. Check them out on the <NavLink to={'projects'}>Projects</NavLink> page.
              </Text>
            </Box>
          </ContentCard>
          <ContentCard>
            <Box p={5} pb={10}>
              <SubHeading>
                <Link as={RouterLink} to={'seasons'} variant={'subheading'} color={'yellow.500'}>
                  Seasons
                </Link>{' '}
                🌞
              </SubHeading>
              <Text>
                Every few months we have an <b>opportunity to learn about something new</b>. Check out our current season on the{' '}
                <NavLink to={'seasons'}>Seasons</NavLink> page.
              </Text>
            </Box>
          </ContentCard>
          <ContentCard>
            <Box p={5} pb={10}>
              <SubHeading>
                <Link as={RouterLink} to={'location'} variant={'subheading'} color={'purple.500'}>
                  Location
                </Link>{' '}
                📌
              </SubHeading>
              <Text>
                We are located at <b>Makespace</b> on Mill Lane in Central Cambridge. It's not far from the Fitzwilliam Museum. More information is on the{' '}
                <NavLink to={'location'}>Location</NavLink> page.
              </Text>
            </Box>
          </ContentCard>
          <ContentCard>
            <Box p={5} pb={10}>
              {' '}
              <SubHeading>
                <Link as={RouterLink} to={'ninjas'} variant={'subheading'} color={'blue.500'}>
                  Ninjas
                </Link>{' '}
                🐱‍👤
              </SubHeading>
              <Text>
                That's you, young people! At coderdojo, the coders are known as Ninjas 🐱‍👤. To be as a ninja you need to be focused, hardworking and
                disciplined. Read more on the <NavLink to={'ninjas'}>Ninjas</NavLink> page.
              </Text>
            </Box>
          </ContentCard>
          <ContentCard>
            <Box p={5} pb={10}>
              <SubHeading>
                <Link as={RouterLink} to={'parents'} variant={'subheading'} color={'red.500'}>
                  Parents
                </Link>{' '}
                👪
              </SubHeading>
              <Text>
                Parents are encouraged to get involved, and it's great to see the parents often having as much fun (and learning as much) as the ninjas!
                Everything you need to know as a parent is on the <NavLink to={'parents'}>Parents</NavLink> page.
              </Text>
            </Box>
          </ContentCard>
          <ContentCard>
            <Box p={5} pb={10}>
              {' '}
              <SubHeading>
                <Link as={RouterLink} to={'mentors'} variant={'subheading'} color={'green.500'}>
                  Mentors
                </Link>{' '}
                🙋‍♂️
              </SubHeading>
              <Text>
                We are currently looking for new mentors. If you are interested in helping out at one of our sessions, or just giving it a try, please get in
                touch. More information is on the <NavLink to={'mentors'}>Mentors</NavLink> page.
              </Text>
            </Box>
          </ContentCard>
        </SimpleGrid>
      </Box>
    </Box>
  </>
)
