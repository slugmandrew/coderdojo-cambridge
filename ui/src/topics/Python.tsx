import { Box, chakra, Flex, Heading, Image, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react'
import { faPython } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import pythonCode from 'image/python-code.jpg'
import pythonPattern from 'image/python-pattern-1.jpg'
import React from 'react'

export const Python = () => (
  <>
    <Flex justifyContent={'space-between'} flexWrap={'wrap'}>
      <Box w={['full', null, null, 3 / 5]}>
        <Heading size={'xl'}>
          Python{' '}
          <chakra.span color={'yellow.400'}>
            <FontAwesomeIcon icon={faPython} />
          </chakra.span>
        </Heading>
        <Text my={5}>
          Python is a great language to start with because it is easy to read and write, and is used in a wide range of applications from web development to
          artificial intelligence.
        </Text>
        <Text my={5}>Once you are familiar with block-based languages like Scratch, Python is a great next step.</Text>
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
