import { Box, chakra, Flex, Heading, Image, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react'
import { faPython } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import pythonCode from 'image/python-code.jpg'
import pythonPattern from 'image/python-pattern-1.jpg'
import React from 'react'

export const Season02 = () => (
  <>
    <Flex justifyContent={'space-between'} flexWrap={'wrap'}>
      <Box w={['full', null, null, 3 / 5]}>
        <Heading size={'lg'} color={'custom.orange'} my={5}>
          Season 02
        </Heading>
        <Heading size={'xl'}>
          Python For Beginners{' '}
          <chakra.span color={'yellow.400'}>
            <FontAwesomeIcon icon={faPython} />
          </chakra.span>
        </Heading>
        <Heading size={'sm'} color={'teal.400'} my={1}>
          JULY | AUGUST | SEPTEMBER | OCTOBER :: 2022
        </Heading>
        <Text my={5}>
          Our focus this season is all about <b>learning Python</b>.
        </Text>
        <Text my={5}>
          <strong>If you have never done any Python</strong> before (maybe because it scares you a little bit 😱), this is for you!
        </Text>
        <Text my={5}>
          <strong>If you already know some Python</strong>, but want to learn more, you can jump straight to the later levels.
        </Text>
        <Text my={2}>
          We have <strong>9 recommended projects</strong>, spread evenly over <strong>3 levels</strong> which you can work through in order, or choose your own
          path:
        </Text>
        <UnorderedList>
          <ListItem>
            <strong>Level 1</strong> - The focus here is on learning the basic syntax and user input, but we also dabble in <i>randomness</i> and some basic
            maths.
          </ListItem>
          <ListItem>
            <strong>Level 2</strong> - Here we progress to using variables and control structures like <code>if-else</code>, <code>while</code> loops,{' '}
            <code>for</code> loops, and useful functions like <code>str()</code> and <code>int()</code>
          </ListItem>
          <ListItem>
            <strong>Level 3</strong> - Finally, we introduce more complex concepts such as <code>lists</code>, <code>arrays</code> and <code>hashmaps</code>.
            Here you have the opportunity to really <strong>create something really cool</strong> using the skills you have learned, and make a project or game
            that is unique to you!
          </ListItem>
        </UnorderedList>
      </Box>

      <Stack pt={0} w={['full', null, null, 2 / 5]} overflow={'hidden'} bgColor={'white'} my={5} pl={5}>
        <Box>
          <Image src={pythonPattern} rounded={5} />
          <Text m={3}>
            This was created using <strong>just 10 lines</strong> of Python!
          </Text>
        </Box>
        <Box>
          <Image src={pythonCode} rounded={5} />
          <Text m={3}>
            <strong>Python Code</strong>
          </Text>
        </Box>
      </Stack>
    </Flex>
  </>
)
