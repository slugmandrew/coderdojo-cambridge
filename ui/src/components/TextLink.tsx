import { Link, LinkProps } from '@chakra-ui/react'
import React, { FC } from 'react'

export const TextLink: FC<LinkProps> = ({ href, children, ...rest }) => {
  return (
    <Link href={href} target={'_blank'} variant={'inline'} {...rest}>
      {children}
    </Link>
  )
}
