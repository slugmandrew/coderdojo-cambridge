import { extendTheme } from '@chakra-ui/react'

export const customTheme = extendTheme({
  colors: {
    custom: {
      orange: '#F07832',
      teal: '#008080',
      blue: '#3C5291',
      lime: '#66F04A',
    },
  },
  components: {
    Link: {
      fontWeight: 'medium',
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
