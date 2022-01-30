export type LanguageName = 'Scratch' | 'Python' | 'Unity' | 'Java' | 'HTML'

export type Level = 'Beginner' | 'Intermediate' | 'Advanced'

export type TrackName = 'Introduction To Scratch' | 'More Scratch' | 'Further Scratch' | 'Introduction to Python' | 'Introduction to Unity'

export type TrackInfo = {
  name: TrackName
  position: number
}

export type Project = {
  url: string
  title: string
  level: Level
  language: LanguageName
  slug: string
  track?: TrackInfo
}

const getProjects: () => Project[] = () => {
  const projects: Project[] = [
    {
      language: 'Scratch',
      level: 'Beginner',
      title: 'Space talk',
      url: 'https://projects.raspberrypi.org/en/projects/space-talk',
      slug: 'space-talk',
      track: { name: 'Introduction To Scratch', position: 1 },
    },
    {
      language: 'Scratch',
      level: 'Beginner',
      title: 'Catch the bus',
      url: 'https://projects.raspberrypi.org/en/projects/catch-the-bus',
      slug: 'catch-the-bus',
      track: { name: 'Introduction To Scratch', position: 2 },
    },
    {
      language: 'Scratch',
      level: 'Beginner',
      title: 'Find the bug',
      url: 'https://projects.raspberrypi.org/en/projects/find-the-bug',
      slug: 'find-the-bug',
      track: { name: 'Introduction To Scratch', position: 3 },
    },
    {
      language: 'Scratch',
      level: 'Beginner',
      title: 'Silly eyes',
      url: 'https://projects.raspberrypi.org/en/projects/silly-eyes',
      slug: 'silly-eyes',
      track: { name: 'Introduction To Scratch', position: 4 },
    },
    {
      language: 'Scratch',
      level: 'Beginner',
      title: 'Surprise! animation',
      url: 'https://projects.raspberrypi.org/en/projects/surprise-animation',
      slug: 'surprise-animation',
      track: { name: 'Introduction To Scratch', position: 5 },
    },
    {
      language: 'Scratch',
      level: 'Beginner',
      title: 'I made you a book',
      url: 'https://projects.raspberrypi.org/en/projects/i-made-you-a-book',
      slug: 'i-made-you-a-book',
      track: { name: 'Introduction To Scratch', position: 6 },
    },
    {
      language: 'Scratch',
      level: 'Intermediate',
      title: 'Broadcasting spells',
      url: 'https://projects.raspberrypi.org/en/projects/broadcasting-spells',
      slug: 'broadcasting-spells',
      track: { name: 'More Scratch', position: 1 },
    },
    {
      language: 'Scratch',
      level: 'Intermediate',
      title: 'Grow a dragonfly',
      url: 'https://projects.raspberrypi.org/en/projects/grow-a-dragonfly',
      slug: 'grow-a-dragonfly',
      track: { name: 'More Scratch', position: 2 },
    },
    {
      language: 'Scratch',
      level: 'Intermediate',
      title: 'Drum star',
      url: 'https://projects.raspberrypi.org/en/projects/drum-star',
      slug: 'drum-star',
      track: { name: 'More Scratch', position: 3 },
    },
    {
      language: 'Scratch',
      level: 'Intermediate',
      title: 'Next customer please',
      url: 'https://projects.raspberrypi.org/en/projects/next-customer-please',
      slug: 'next-customer-please',
      track: { name: 'More Scratch', position: 4 },
    },
    {
      language: 'Scratch',
      level: 'Intermediate',
      title: "Don't fall in!",
      url: 'https://projects.raspberrypi.org/en/projects/dont-fall-in',
      slug: 'dont-fall-in',
      track: { name: 'More Scratch', position: 5 },
    },
    {
      language: 'Scratch',
      level: 'Intermediate',
      title: 'This sprite needs you',
      url: 'https://projects.raspberrypi.org/en/projects/this-sprite-needs-you',
      slug: 'this-sprite-needs-you',
      track: { name: 'More Scratch', position: 6 },
    },
    {
      language: 'Scratch',
      level: 'Advanced',
      title: 'Nature rover',
      url: 'https://projects.raspberrypi.org/en/projects/nature-rover',
      slug: 'nature-rover',
      track: { name: 'Further Scratch', position: 1 },
    },
    {
      language: 'Scratch',
      level: 'Advanced',
      title: 'Puzzle room',
      url: 'https://projects.raspberrypi.org/en/projects/puzzle-room',
      slug: 'puzzle-room',
      track: { name: 'Further Scratch', position: 2 },
    },
    {
      language: 'Scratch',
      level: 'Advanced',
      title: 'Mandala',
      url: 'https://projects.raspberrypi.org/en/projects/mandala',
      slug: 'mandala',
      track: { name: 'Further Scratch', position: 3 },
    },
    {
      language: 'Scratch',
      level: 'Advanced',
      title: 'Swarms, schools, and flocks',
      url: 'https://projects.raspberrypi.org/en/projects/swarms-schools-flocks',
      slug: 'swarms-schools-flocks',
      track: { name: 'Further Scratch', position: 4 },
    },
    {
      language: 'Scratch',
      level: 'Advanced',
      title: 'Music maker',
      url: 'https://projects.raspberrypi.org/en/projects/music-maker',
      slug: 'music-maker',
      track: { name: 'Further Scratch', position: 5 },
    },
    {
      language: 'Scratch',
      level: 'Advanced',
      title: 'Welcome to my world',
      url: 'https://projects.raspberrypi.org/en/projects/welcome-to-my-world',
      slug: 'welcome-to-my-world',
      track: { name: 'Further Scratch', position: 6 },
    },
    {
      language: 'Python',
      level: 'Beginner',
      title: 'Hello 🌍🌎🌏',
      url: 'https://projects.raspberrypi.org/en/projects/hello-world',
      slug: 'hello-world',
      track: { name: 'Introduction to Python', position: 1 },
    },
    {
      language: 'Python',
      level: 'Beginner',
      title: 'Target practice',
      url: 'https://projects.raspberrypi.org/en/projects/target-practice',
      slug: 'target-practice',
      track: { name: 'Introduction to Python', position: 2 },
    },
    {
      language: 'Python',
      level: 'Beginner',
      title: 'Rocket launch',
      url: 'https://projects.raspberrypi.org/en/projects/rocket-launch',
      slug: 'rocket-launch',
      track: { name: 'Introduction to Python', position: 3 },
    },
    {
      language: 'Python',
      level: 'Beginner',
      title: 'Make a face',
      url: 'https://projects.raspberrypi.org/en/projects/make-a-face',
      slug: 'make-a-face',
      track: { name: 'Introduction to Python', position: 4 },
    },
    {
      language: 'Python',
      level: 'Beginner',
      title: "Don't collide!",
      url: 'https://projects.raspberrypi.org/en/projects/dont-collide',
      slug: 'dont-collide',
      track: { name: 'Introduction to Python', position: 5 },
    },
    {
      language: 'Python',
      level: 'Beginner',
      title: 'Powerful patterns',
      url: 'https://projects.raspberrypi.org/en/projects/powerful-patterns',
      slug: 'powerful-patterns',
      track: { name: 'Introduction to Python', position: 6 },
    },
    {
      language: 'HTML',
      level: 'Beginner',
      title: 'Guide to my country 1.0',
      url: 'https://projects.raspberrypi.org/en/projects/cd-beginner-html-css-sushi',
      slug: 'cd-beginner-html-css-sushi',
    },
    {
      language: 'HTML',
      level: 'Intermediate',
      title: 'Guide to my country 2.0',
      url: 'https://projects.raspberrypi.org/en/projects/cd-intermediate-html-css-sushi',
      slug: 'cd-intermediate-html-css-sushi',
    },
    {
      language: 'HTML',
      level: 'Advanced',
      title: 'Guide to my country 3.0',
      url: 'https://projects.raspberrypi.org/en/projects/cd-advanced-html-css-sushi',
      slug: 'cd-advanced-html-css-sushi',
    },
  ]

  return projects
}

export default getProjects()
