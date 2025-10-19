import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AboutData {
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export const Contact = () => {
  const [data, setData] = useState<AboutData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    fetch("./data/about.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error loading contact data:", err));

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("contact");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  if (!data) {
    return (
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8 mx-auto"></div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="h-32 bg-muted rounded-xl"></div>
              <div className="h-32 bg-muted rounded-xl"></div>
              <div className="h-32 bg-muted rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2
          className={`text-4xl md:text-5xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {language === "en" ? "Get In Touch" : "연락하기"}
        </h2>
        <div
          className={`w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
        ></div>

        <p
          className={`text-center text-muted-foreground max-w-2xl mx-auto mb-12 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {language === "en"
            ? "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!"
            : "새로운 프로젝트, 창의적인 아이디어 또는 함께 할 기회에 대해 언제나 논의할 준비가 되어 있습니다. 편하게 연락주세요!"}
        </p>

        <div className="max-w-3xl mx-auto">
          <div
            className={`bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Contact Methods */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <a
                href={`mailto:${data.contact.email}`}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-gradient-card border border-border hover:border-primary/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:shadow-glow transition-all">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">
                  {language === "en" ? "Email" : "이메일"}
                </h3>
                <p className="text-sm text-muted-foreground break-all">
                  {data.contact.email}
                </p>
              </a>

              <a
                href={`tel:${data.contact.phone}`}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-gradient-card border border-border hover:border-primary/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:shadow-glow transition-all">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">
                  {language === "en" ? "Phone" : "전화"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {data.contact.phone}
                </p>
              </a>

              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gradient-card border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">
                  {language === "en" ? "Location" : "위치"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {data.contact.location}
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="border-t border-border pt-8">
              <h3 className="text-xl font-bold text-center mb-6">
                {language === "en" ? "Connect With Me" : "소셜 미디어"}
              </h3>
              <div className="flex justify-center gap-4">
                <a
                  href={data.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gradient-card border border-border flex items-center justify-center hover:border-primary hover:shadow-glow transition-all"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={data.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gradient-card border border-border flex items-center justify-center hover:border-primary hover:shadow-glow transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={data.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gradient-card border border-border flex items-center justify-center hover:border-primary hover:shadow-glow transition-all"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
