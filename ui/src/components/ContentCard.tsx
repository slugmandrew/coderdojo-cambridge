import { Paper } from '@mantine/core'
import { FC, ReactNode } from 'react'

export const ContentCard: FC<{ noMargin?: boolean; children?: ReactNode }> = ({ noMargin = false, children }) => {
  return (
    <Paper mt={noMargin ? 0 : 'lg'} p={0} radius='xl' style={{ overflow: 'hidden' }}>
      {children}
    </Paper>
  )
}
