import { Box, Button, chakra, Flex, Image, Link, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ContentCard } from 'components/ContentCard'
import { Heading2 } from 'components/Heading2'
import { Paragraph } from 'components/Paragraph'
import { TextLink } from 'components/TextLink'
import mainPhoto from 'image/we-made-this.png'
import banner from 'image/coding_banner.jpg'
import { NavLink } from 'layout/Navbar'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

export const Home = () => (
  <>
    <Stack>
      <Image src={mainPhoto} fit={'cover'} borderRadius={5} h={[250, 500, 700]} />
    </Stack>

    <Stack direction={['column', 'column', 'row', 'row']} spacing={[0, 0, 5, 5]}>
      <Flex w={['full', 'full', '50%', 3 / 5, 2 / 3]}>
        <ContentCard>
          <Stack direction={['column', 'column', 'column', 'column', 'column']}>
            <Box w={['full', 'full', 'full', 'full', 'full']} px={5}>
              <Heading2>Welcome to our dojo!</Heading2>
              <Paragraph>We are a free, community-run coding club for young people aged 7-17. </Paragraph>
              <Paragraph>
                We are located in <b>Central Cambridge</b> and sessions run every month, on the <b>second Saturday of the month</b>.
              </Paragraph>
              <Paragraph>We learn to code in Scratch, Python, HTML, Java, Unity (C#) and more!</Paragraph>
              <Paragraph>
                Whether you are a seasoned coder or have never coded before, you are welcome at our dojo. Feel free to bring along any personal project you
                would like help with, or we can help you find something to do.
              </Paragraph>
              <Paragraph>
                We work on many different types of <NavLink to={'projects'}>projects</NavLink>, from basic 'drag and drop' coding using visual interfaces such
                as <TextLink href={'https://scratch.mit.edu/'}>Scratch</TextLink> and{' '}
                <TextLink href={'https://makecode.microbit.org/#editor'}>Micro:Bit MakeCode</TextLink>, to physical computing with{' '}
                <TextLink href={'https://www.raspberrypi.com/'}>Raspberry Pi</TextLink> and <TextLink href={'https://www.arduino.cc/'}>Arduino</TextLink>, using
                tutorials from a wide range of sources.
              </Paragraph>
            </Box>
            <Flex w={['full', 'full', 'full', 'full', 'full']} maxH={['200px', '250px', '200px', '200px', '300px']}>
              <Image src={banner} objectFit={'cover'} />
            </Flex>
          </Stack>
        </ContentCard>
      </Flex>
      <Box w={['full', 'full', '50%', 2 / 5, 1 / 3]}>
        <ContentCard>
          <Box px={5} pb={10} w={'full'}>
            <Heading2 color={'custom.teal'} center>
              Dojo Calendar 📆
            </Heading2>
            <VStack mt={5}>
              <strong>2026</strong>
              <chakra.p color={'blue.500'}>
                Saturday <chakra.span fontWeight={'bold'}>10th January</chakra.span>
              </chakra.p>
              <chakra.p color={'blue.500'}>
                Saturday <chakra.span fontWeight={'bold'}>14th February</chakra.span>
              </chakra.p>
              <chakra.p color={'blue.500'}>
                Saturday <chakra.span fontWeight={'bold'}>14th March</chakra.span>
              </chakra.p>
              <chakra.p color={'blue.500'}>
                Saturday <chakra.span fontWeight={'bold'}>11th April</chakra.span>
              </chakra.p>
              <chakra.p color={'blue.500'}>
                Saturday <chakra.span fontWeight={'bold'}>9th May</chakra.span>
              </chakra.p>
              <chakra.p color={'blue.500'}>
                Saturday <chakra.span fontWeight={'bold'}>13th June</chakra.span>
              </chakra.p>

              <chakra.p color={'green.500'} fontWeight={'bold'}>
                🌞 Summer Break 🌞
              </chakra.p>
              <chakra.p color={'blue.500'}>
                Saturday <chakra.span fontWeight={'bold'}>12th September</chakra.span>
              </chakra.p>
              <chakra.p color={'blue.500'}>
                Saturday <chakra.span fontWeight={'bold'}>10th October</chakra.span>
              </chakra.p>
              <chakra.p color={'blue.500'}>
                Saturday <chakra.span fontWeight={'bold'}>14th November</chakra.span>
              </chakra.p>
              <chakra.p color={'blue.500'}>
                Saturday <chakra.span fontWeight={'bold'}>12th December</chakra.span>
              </chakra.p>
            </VStack>
            <VStack>
              <Flex mt={5} justifyContent={'center'}>
                <VStack gap={5}>
                  <Text align={'center'}>
                    <strong>Note:</strong> Sessions usually run on the <u>second Saturday</u> of the month and you must have a ticket to attend.
                  </Text>
                  <Button
                    as={Link}
                    variant={'primary'}
                    rightIcon={<FontAwesomeIcon icon={faExternalLinkAlt} />}
                    size={'md'}
                    href={'https://coderdojo.com/en/dojos/gb/cambridge/cambridge-makespace'}
                    target={'_blank'}>
                    Sign Up on the CoderDojo portal
                  </Button>
                </VStack>
              </Flex>
            </VStack>
          </Box>
        </ContentCard>
      </Box>
    </Stack>

    <Box>
      <Box>
        <SimpleGrid columns={[null, 1, 2, 3]} spacingX={5}>
          <ContentCard>
            <Box p={5}>
              <Heading2>
                <Link as={RouterLink} to={'projects'} variant={'subheading'} color={'teal.500'}>
                  Projects
                </Link>{' '}
                👩‍💻
              </Heading2>
              <Paragraph>
                You can work on anything you like at the dojo, but if you are new to coding or stuck for ideas, we have a set of <b>recommended projects</b> for
                you.
              </Paragraph>
              <Paragraph>
                Check them out on the <NavLink to={'projects'}>Projects</NavLink> page.
              </Paragraph>
            </Box>
          </ContentCard>
          <ContentCard>
            <Box p={5}>
              <Heading2>
                <Link as={RouterLink} to={'topics'} variant={'subheading'} color={'yellow.500'}>
                  Topics
                </Link>{' '}
                📚
              </Heading2>
              <Paragraph>
                Coderdojo ninjas are of <strong>varied age and ability</strong>, so we cover a wide range of programming languages and technologies to keep
                things interesting for all.
              </Paragraph>
              <Paragraph>
                Learn more on the <NavLink to={'topics'}>Topics</NavLink> page.
              </Paragraph>
            </Box>
          </ContentCard>
          <ContentCard>
            <Box p={5}>
              <Heading2>
                <Link as={RouterLink} to={'location'} variant={'subheading'} color={'purple.500'}>
                  Location
                </Link>{' '}
                📌
              </Heading2>
              <Paragraph>
                We are located at <b>Makespace</b> on Mill Lane in Central Cambridge. It's not far from the Fitzwilliam Museum.
              </Paragraph>
              <Paragraph>
                More information is on the <NavLink to={'location'}>Location</NavLink> page.
              </Paragraph>
            </Box>
          </ContentCard>
          <ContentCard>
            <Box p={5}>
              {' '}
              <Heading2>
                <Link as={RouterLink} to={'ninjas'} variant={'subheading'} color={'blue.500'}>
                  Ninjas
                </Link>{' '}
                🐱‍👤
              </Heading2>
              <Paragraph>That's you, young people!</Paragraph>
              <Paragraph>
                At CoderDojo, the coders are known as Ninjas 🐱‍👤. To be a ninja, you need to be <strong>focused</strong>, <strong>hardworking</strong> and{' '}
                <strong>disciplined</strong>.
              </Paragraph>
              <Paragraph>
                Read more on the <NavLink to={'ninjas'}>Ninjas</NavLink> page.
              </Paragraph>
            </Box>
          </ContentCard>
          <ContentCard>
            <Box p={5}>
              <Heading2>
                <Link as={RouterLink} to={'parents'} variant={'subheading'} color={'red.500'}>
                  Parents
                </Link>{' '}
                👪
              </Heading2>
              <Paragraph>
                Parents are encouraged to get involved, and it's great to see the parents often having as much fun (and learning as much) as the ninjas!
              </Paragraph>
              <Paragraph>
                Everything you need to know as a parent is on the <NavLink to={'parents'}>Parents</NavLink> page.
              </Paragraph>
            </Box>
          </ContentCard>
          <ContentCard>
            <Box p={5}>
              {' '}
              <Heading2>
                <Link as={RouterLink} to={'mentors'} variant={'subheading'} color={'green.500'}>
                  Mentors
                </Link>{' '}
                🙋‍♂️
              </Heading2>
              <Paragraph>All of our mentors are professional technologists that give up their time for free.</Paragraph>
              <Paragraph>If you are interested in helping out at one of our sessions, or just giving it a try, please get in touch.</Paragraph>
            </Box>
          </ContentCard>
        </SimpleGrid>
      </Box>
    </Box>
  </>
)
