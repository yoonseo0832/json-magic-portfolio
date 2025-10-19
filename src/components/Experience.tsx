import { useEffect, useState } from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  period: string;
  responsibilities: string[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  major: string;
  period: string;
  details: string;
}

interface ExperienceData {
  work: WorkExperience[];
  education: Education[];
}

export const Experience = () => {
  const [data, setData] = useState<ExperienceData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    fetch("./data/experience.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error loading experience data:", err));

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("experience");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  if (!data) {
    return (
      <section id="experience" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-32 bg-muted rounded"></div>
              <div className="h-32 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <h2
          className={`text-4xl md:text-5xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {language === "en" ? "Experience" : "경력"}
        </h2>
        <div
          className={`w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-12 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
        ></div>

        <div className="max-w-4xl mx-auto">
          {/* Work Experience */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" />
              {language === "en" ? "Work Experience" : "업무 경험"}
            </h3>
            <div className="space-y-8">
              {data.work.map((job, index) => (
                <div
                  key={job.id}
                  className={`relative pl-8 pb-8 border-l-2 border-primary/30 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                  style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                >
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary shadow-glow"></div>
                  <div className="bg-card rounded-lg p-6 shadow-card border border-border hover:border-primary/50 transition-all">
                    <h4 className="text-xl font-bold mb-1">{job.position}</h4>
                    <div className="text-primary font-medium mb-2">
                      {job.company}
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">
                      {job.period}
                    </div>
                    <ul className="space-y-2">
                      {job.responsibilities.map((resp, idx) => (
                        <li
                          key={idx}
                          className="text-muted-foreground flex items-start"
                        >
                          <span className="text-primary mr-2">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              {language === "en" ? "Education" : "학력"}
            </h3>
            <div className="space-y-8">
              {data.education.map((edu, index) => (
                <div
                  key={edu.id}
                  className={`relative pl-8 border-l-2 border-primary/30 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                  style={{ transitionDelay: `${(data.work.length + index + 2) * 100}ms` }}
                >
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-accent shadow-glow"></div>
                  <div className="bg-card rounded-lg p-6 shadow-card border border-border hover:border-accent/50 transition-all">
                    <h4 className="text-xl font-bold mb-1">
                      {edu.degree} in {edu.major}
                    </h4>
                    <div className="text-accent font-medium mb-2">
                      {edu.institution}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {edu.period}
                    </div>
                    <p className="text-muted-foreground">{edu.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
