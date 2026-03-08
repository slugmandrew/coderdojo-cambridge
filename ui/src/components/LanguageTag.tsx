import { Badge } from '@mantine/core'
import React, { FC } from 'react'
import { LanguageName } from 'types/LanguageName'

export const LanguageTag: FC<{ language: LanguageName }> = ({ language }) => {
  const color =
    language === LanguageName.scratch ? 'orange' :
    language === LanguageName.python ? 'blue' :
    language === LanguageName.java ? 'red' :
    language === LanguageName.html ? 'green' : 'gray'

  return <Badge color={color}>{language}</Badge>
}
