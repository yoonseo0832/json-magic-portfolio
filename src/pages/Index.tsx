import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Awards } from "@/components/Awards";
import { Contact } from "@/components/Contact";
import type { AboutData, ExperienceData, SkillsData, ProjectsData, AwardsData } from "@/types/portfolio";

const Index = () => {
  // 모든 데이터를 한 번에 로딩
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [experienceData, setExperienceData] = useState<ExperienceData | null>(null);
  const [skillsData, setSkillsData] = useState<SkillsData | null>(null);
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);
  const [awardsData, setAwardsData] = useState<AwardsData | null>(null);

  useEffect(() => {
    // 모든 데이터를 병렬로 로딩
    const loadAllData = async () => {
      try {
        const [about, experience, skills, projects, awards] = await Promise.all([
          fetch("./data/about.json").then((r) => r.json()),
          fetch("./data/experience.json").then((r) => r.json()),
          fetch("./data/skills.json").then((r) => r.json()),
          fetch("./data/projects.json").then((r) => r.json()),
          fetch("./data/awards.json").then((r) => r.json()),
        ]);
        
        setAboutData(about);
        setExperienceData(experience);
        setSkillsData(skills);
        setProjectsData(projects);
        setAwardsData(awards);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadAllData();
  }, []);

  const handleLogoClick = () => {
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation onLogoClick={handleLogoClick} />
      <Hero />
      {aboutData && <About data={aboutData} />}
      {experienceData && <Experience data={experienceData} />}
      {skillsData && <Skills data={skillsData} />}
      {projectsData && <Projects data={projectsData} />}
      {awardsData && <Awards data={awardsData} />}
      {aboutData && <Contact data={aboutData} />}
      
      {/* Footer - 푸터 */}
      <footer className="py-8 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 YoonSuh Lee. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
