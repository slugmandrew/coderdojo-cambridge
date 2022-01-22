type Language = "Scratch" | "Python" | "Unity" | "Java" | "HTML";

type Level = "Beginner" | "Intermediate" | "Advanced"

type Project = {
  url: string
  title: string
  level: Level
  language: Language
}

const getProjects: () => Project[] = () => {
  const projects: Project[] = [
    { language: "Scratch", level: "Beginner", title: "Space Talk", url: "https://projects.raspberrypi.org/en/projects/space-talk" },
    { language: "Scratch", level: "Intermediate", title: "Broadcasting spells", url: "https://projects.raspberrypi.org/en/projects/broadcasting-spells" },
    { language: "Scratch", level: "Beginner", title: "1", url: "" },
    { language: "Java", level: "Beginner", title: "2", url: "" },
    { language: "Unity", level: "Beginner", title: "3", url: "" },
    { language: "HTML", level: "Beginner", title: "4", url: "" },
  ]

  return projects
}

export default getProjects()
