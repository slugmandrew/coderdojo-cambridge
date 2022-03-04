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
      lime: '#66F04A',
    },
  },
  components: {
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
      fontWeight: 'medium',
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
      },
    },
  },
})
