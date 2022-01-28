import React, { FC } from 'react'
import { Tag } from '@chakra-ui/react'
import { Language } from './Data'
import { ColorScheme } from './ColorScheme'

export const LanguageTag: FC<{ language: Language }> = ({ language }) => {
  const getColorScheme: (language: Language) => ColorScheme = (language: Language) => {
    switch (language) {
      case 'Scratch':
        return 'orange'
      case 'Python':
        return 'blue'
      case 'Unity':
        return 'blackAlpha'
      case 'Java':
        return 'red'
      case 'HTML':
        return 'green'
    }
  }
  return (
    <>
      <Tag size={'lg'} colorScheme={getColorScheme(language)}>
        {language}
      </Tag>
    </>
  )
}
