import { Link, LinkProps } from '@chakra-ui/react'
import React, { FC } from 'react'

export const TextLink: FC<LinkProps> = ({ href, children }) => {
  return (
    <Link href={href} target={'_blank'} variant={'inline'}>
      {children}
    </Link>
  )
}
