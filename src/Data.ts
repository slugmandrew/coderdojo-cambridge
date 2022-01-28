export type Language = 'Scratch' | 'Python' | 'Unity' | 'Java' | 'HTML'

export type Level = 'Beginner' | 'Intermediate' | 'Advanced'

export type Project = {
  url: string
  title: string
  level: Level
  language: Language
  slug: string
}

const getProjects: () => Project[] = () => {
  const projects: Project[] = [
    {
      language: 'HTML',
      level: 'Intermediate',
      title: 'Fixme',
      url: 'https://',
      slug: 'fixme',
    },
    {
      language: 'Unity',
      level: 'Beginner',
      title: 'Fixme',
      url: 'https://',
      slug: 'fixme',
    },
    {
      language: 'Java',
      level: 'Beginner',
      title: 'Fixme',
      url: 'https://',
      slug: 'fixme',
    },
    {
      language: 'Python',
      level: 'Advanced',
      title: 'Fixme',
      url: 'https://',
      slug: 'fixme',
    },
    {
      language: 'Python',
      level: 'Intermediate',
      title: 'Fixme',
      url: 'https://',
      slug: 'fixme',
    },
    {
      language: 'Scratch',
      level: 'Beginner',
      title: 'Space talk',
      url: 'https://projects.raspberrypi.org/en/projects/space-talk',
      slug: 'space-talk',
    },
    {
      language: 'Scratch',
      level: 'Beginner',
      title: 'Catch the bus',
      url: 'https://projects.raspberrypi.org/en/projects/catch-the-bus',
      slug: 'catch-the-bus',
    },
    {
      language: 'Scratch',
      level: 'Beginner',
      title: 'Find the bug',
      url: 'https://projects.raspberrypi.org/en/projects/find-the-bug',
      slug: 'find-the-bug',
    },
    {
      language: 'Scratch',
      level: 'Intermediate',
      title: 'Broadcasting spells',
      url: 'https://projects.raspberrypi.org/en/projects/broadcasting-spells',
      slug: 'broadcasting-spells',
    },
    {
      language: 'Scratch',
      level: 'Intermediate',
      title: 'Grow a dragonfly',
      url: 'https://projects.raspberrypi.org/en/projects/grow-a-dragonfly',
      slug: 'grow-a-dragonfly',
    },
    {
      language: 'Scratch',
      level: 'Intermediate',
      title: 'Drum star',
      url: 'https://projects.raspberrypi.org/en/projects/drum-star',
      slug: 'drum-star',
    },
  ]

  return projects
}

export default getProjects()
