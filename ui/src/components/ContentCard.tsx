import { Paper } from '@mantine/core'
import { FC } from 'react'

export const ContentCard: FC<{ noMargin?: boolean }> = ({ noMargin = false, children }) => {
  return (
    <Paper mt={noMargin ? 0 : 'md'} p={0} sx={{ overflow: 'hidden' }}>
      {children}
    </Paper>
  )
}
