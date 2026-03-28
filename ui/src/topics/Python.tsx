import { List, Text } from '@mantine/core'
import { faPython } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TopicLayout } from 'components/TopicLayout'
import pythonCode from 'image/python-code.jpg'
import pythonPattern from 'image/python-pattern-1.jpg'
import React from 'react'

export const Python = () => (
  <TopicLayout
    title={
      <>
        Python <FontAwesomeIcon icon={faPython} color='#fcc419' />
      </>
    }
    body={
      <>
        <Text mb='md'>Python is a great language to start with because it is easy to read and write, and is used in a wide range of applications from web development to artificial intelligence.</Text>
        <Text mb='md'>Once you are familiar with block-based languages like Scratch, Python is a great next step.</Text>
        <Text mb='md'>We have <strong>9 recommended projects</strong>, spread evenly over <strong>3 levels</strong> which you can work through in order, or choose your own path:</Text>
        <List spacing='xs'>
          <List.Item><strong>Level 1</strong> - Focus on learning the basic syntax and user input, plus some randomness and simple maths.</List.Item>
          <List.Item><strong>Level 2</strong> - Progress to variables and control structures like <code>if-else</code>, <code>while</code> loops, <code>for</code> loops and useful functions like <code>str()</code> and <code>int()</code>.</List.Item>
          <List.Item><strong>Level 3</strong> - Introduce more complex concepts such as <code>lists</code>, <code>arrays</code> and <code>hashmaps</code>, with room to build something unique.</List.Item>
        </List>
      </>
    }
    images={[
      {
        src: pythonPattern,
        alt: 'Python pattern',
        caption: (
          <>
            This was created using <strong>just 10 lines</strong> of Python!
          </>
        ),
      },
      {
        src: pythonCode,
        alt: 'Python code',
        caption: (
          <>
            <strong>Python Code</strong>
          </>
        ),
      },
    ]}
  />
)
