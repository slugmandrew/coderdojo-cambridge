type Language = "Scratch" | "Python" | "Unity" | "Java" | "HTML";

type Level = "Beginner" | "Intermediate" | "Advanced";

type Project = {
  url: string;
  title: string;
  level: Level;
  language: Language;
};

const getProjects: () => Project[] = () => {
  const projects: Project[] = [
    {
      language: "Scratch",
      level: "Beginner",
      title: "Space talk",
      url: "https://projects.raspberrypi.org/en/projects/space-talk",
    },
    {
      language: "Scratch",
      level: "Beginner",
      title: "Catch the bus",
      url: "https://projects.raspberrypi.org/en/projects/catch-the-bus",
    },
    {
      language: "Scratch",
      level: "Beginner",
      title: "Find the bug",
      url: "https://projects.raspberrypi.org/en/projects/find-the-bug",
    },
    {
      language: "Scratch",
      level: "Intermediate",
      title: "Broadcasting spells",
      url: "https://projects.raspberrypi.org/en/projects/broadcasting-spells",
    },
    {
      language: "Scratch",
      level: "Intermediate",
      title: "Grow a dragonfly",
      url: "https://projects.raspberrypi.org/en/projects/grow-a-dragonfly",
    },
    {
      language: "Scratch",
      level: "Intermediate",
      title: "Drum star",
      url: "https://projects.raspberrypi.org/en/projects/drum-star",
    },
  ];

  return projects;
};

export default getProjects();
