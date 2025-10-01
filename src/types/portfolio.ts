// 포트폴리오 데이터 타입 정의

export interface Metric {
  label: string;
  value: string;
}

export interface Contact {
  email: string;
  phone: string;
  location: string;
}

export interface Social {
  github: string;
  linkedin: string;
  twitter: string;
}

export interface AboutData {
  name: string;
  age: number;
  headline: string;
  bio: string;
  metrics: Metric[];
  contact: Contact;
  social: Social;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  period: string;
  responsibilities: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  major: string;
  period: string;
  details: string;
}

export interface ExperienceData {
  work: WorkExperience[];
  education: Education[];
}

export interface ProjectLinks {
  demo?: string;
  github?: string;
}

export interface Project {
  id: string;
  title: string;
  image: string;
  shortDescription: string;
  technologies: string[];
  description: string;
  contributions: string[];
  results: string[];
  links: ProjectLinks;
}

export interface ProjectsData {
  projects: Project[];
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
}

export interface AwardsData {
  awards: Award[];
}

export interface SkillsData {
  // skills.json 구조에 따라 추가
  [key: string]: unknown;
}

// 모든 데이터를 포함하는 타입
export interface AllPortfolioData {
  about: AboutData;
  experience: ExperienceData;
  skills: SkillsData;
  projects: ProjectsData;
  awards: AwardsData;
}
