import { extendTheme } from '@chakra-ui/react'

export const customTheme = extendTheme({
  fonts: {
    body: 'Quicksand',
    heading: 'Ubuntu, sans-serif',
  },
  colors: {
    custom: {
      orange: '#F07832',
      teal: '#008080',
      blue: '#3C5291',
      green: '#3c9829',
    },
  },
  components: {
    Button: {
      variants: {
        ghost: {
          color: 'white',
          _hover: {
            bgColor: 'whiteAlpha.400',
          },
        },
        primary: {
          bgColor: 'custom.orange',
          color: 'white',
        },
      },
    },
    Heading: {
      baseStyle: {
        color: 'custom.teal',
      },
    },
    Text: {
      baseStyle: {
        fontSize: 'md',
      },
    },
    Link: {
      baseStyle: {
        fontSize: 'md',
      },
      variants: {
        'no-wrap': {
          whiteSpace: 'nowrap',
        },
        bold: {
          fontWeight: 'bold',
        },
        subheading: {
          fontSize: '3xl',
        },
        inline: {
          fontWeight: 'bold',
          color: 'blue.500',
        },
      },
    },
  },
})
