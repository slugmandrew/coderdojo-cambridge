import { customTheme } from '../src'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

const theme = customTheme

const newViewports = { ...INITIAL_VIEWPORTS }

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  chakra: {
    theme,
  },
  viewport: {
    viewports: newViewports, // newViewports would be an ViewportMap. (see below for examples)
  },
}
