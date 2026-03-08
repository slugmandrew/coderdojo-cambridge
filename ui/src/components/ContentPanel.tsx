import { Paper } from '@mantine/core'
import { FC } from 'react'

export const ContentPanel: FC<{ noMargin?: boolean }> = ({ noMargin = false, children }) => (
  <Paper withBorder radius='md' p='md' mt={noMargin ? 0 : 'md'} bg='white'>
    {children}
  </Paper>
)
