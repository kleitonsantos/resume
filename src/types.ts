export type ContactItem = {
  label: string;
  value: string;
  href?: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type ExperienceEntry = {
  period: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  printSummary?: string;
  highlights: string[];
  printHighlights?: string[];
  stack?: string[];
};

export type Pillar = {
  title: string;
  body: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type LanguageEntry = {
  name: string;
  level: string;
  note?: string;
};

export type EducationEntry = {
  title: string;
  institution: string;
  period: string;
  note?: string;
};

export type PublicationEntry = {
  title: string;
  detail: string;
  href?: string;
};

export type ResumeContent = {
  identity: {
    name: string;
    title: string;
    secondaryTitle?: string;
    subtitle: string;
    summary: string;
    availability: string;
    photo: string;
  };
  contacts: ContactItem[];
  metrics: Metric[];
  leadershipPillars: Pillar[];
  aiProductivity: Pillar[];
  skillGroups: SkillGroup[];
  languages: LanguageEntry[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  publications: PublicationEntry[];
};
