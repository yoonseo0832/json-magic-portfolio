import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-50"></div>
      
      <div
        className={`container mx-auto px-4 text-center relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="mb-8 inline-block relative">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary shadow-glow">
            <img
              src="./placeholder.svg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          YoonSuh Lee
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {language === "en"
            ? "Creative and who can minimize mistakes back-end Developer"
            : "창의적이고 실수를 최소화하는 백엔드 개발자"}
        </p>

        <div className="flex gap-4 justify-center mb-12">
          <button
            onClick={() => {
              const element = document.getElementById("projects");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-medium hover:shadow-glow transition-all hover:scale-105"
          >
            {language === "en" ? "View My Work" : "프로젝트 보기"}
          </button>
          <button
            onClick={() => {
              const element = document.getElementById("contact");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105"
          >
            {language === "en" ? "Get In Touch" : "연락하기"}
          </button>
        </div>

      </div>
    </section>
  );
};
