import { MantineThemeOverride } from '@mantine/core'

export const theme: MantineThemeOverride = {
  fontFamily: 'Quicksand, sans-serif',
  headings: {
    fontFamily: 'Ubuntu, sans-serif',
  },
  primaryColor: 'dojoOrange',
  colors: {
    dojoOrange: ['#fff4eb', '#ffe4cf', '#ffd2b2', '#ffbb8d', '#f89f61', '#f07832', '#df6724', '#bf5518', '#994112', '#74300c'],
    dojoTeal: ['#ecf9f7', '#d5f0ec', '#addfd7', '#82cec0', '#5bbdab', '#2ea98f', '#148573', '#006b5d', '#005349', '#003b35'],
  },
  defaultRadius: 'md',
  fontSmoothing: true,
  focusRing: 'auto',
  components: {
    Container: {
      defaultProps: {
        size: 'xl',
      },
    },
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Paper: {
      defaultProps: {
        radius: 'lg',
        withBorder: true,
        shadow: 'sm',
      },
    },
  },
}
