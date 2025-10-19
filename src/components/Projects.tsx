import { useEffect, useState } from "react";
import { ExternalLink, Github, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface Project {
  id: string;
  title: string;
  image: string;
  shortDescription: string;
  technologies: string[];
  description: string;
  contributions: string[];
  results: string[];
  links: {
    demo?: string;
    github?: string;
  };
}

interface ProjectsData {
  projects: Project[];
}

export const Projects = () => {
  const [data, setData] = useState<ProjectsData | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    fetch("./data/projects.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error loading projects data:", err));

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("projects");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  if (!data) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto animate-pulse">
            <div className="h-80 bg-muted rounded-2xl"></div>
            <div className="h-80 bg-muted rounded-2xl"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2
          className={`text-4xl md:text-5xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {language === "ko" ? "프로젝트" : "Projects"}
        </h2>
        <div
          className={`w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-12 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
        ></div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {data.projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:border-primary/50 transition-all duration-700 cursor-pointer group ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image.replace("/placeholder.svg", "./placeholder.svg")}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-sm text-foreground">
                    {language === "ko" ? "자세히 보기" : "Click to view details"}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="secondary">
                      +{project.technologies.length - 4}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        <Dialog
          open={selectedProject !== null}
          onOpenChange={() => setSelectedProject(null)}
        >
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <div className="space-y-6">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img
                    src={selectedProject.image.replace("/placeholder.svg", "./placeholder.svg")}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-3xl font-bold mb-4">
                    {selectedProject.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedProject.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold mb-2">
                    {language === "ko" ? "설명" : "Description"}
                  </h4>
                  <p className="text-muted-foreground">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold mb-2">
                    {language === "ko" ? "나의 기여" : "My Contributions"}
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.contributions.map((contrib, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-muted-foreground">{contrib}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold mb-2">
                    {language === "ko" ? "주요 결과" : "Key Results"}
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.results.map((result, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-accent mr-2">✓</span>
                        <span className="text-muted-foreground">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4 pt-4">
                  {selectedProject.links.demo && (
                    <a
                      href={selectedProject.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-medium hover:shadow-glow transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {language === "ko" ? "데모 보기" : "Live Demo"}
                    </a>
                  )}
                  {selectedProject.links.github && (
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-2 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
