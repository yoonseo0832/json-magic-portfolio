import { useEffect, useState } from "react";
import { Award, BookOpen, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AwardItem {
  id: string;
  title: string;
  type: "certification" | "award" | "course";
  issuer: string;
  date: string;
  description: string;
}

interface AwardsData {
  awards: AwardItem[];
}

const getIconForType = (type: string) => {
  switch (type) {
    case "certification":
      return <CheckCircle className="w-5 h-5" />;
    case "award":
      return <Award className="w-5 h-5" />;
    case "course":
      return <BookOpen className="w-5 h-5" />;
    default:
      return <Award className="w-5 h-5" />;
  }
};

const getColorForType = (type: string) => {
  switch (type) {
    case "certification":
      return "bg-primary/10 text-primary border-primary/20";
    case "award":
      return "bg-accent/10 text-accent border-accent/20";
    case "course":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    default:
      return "bg-primary/10 text-primary border-primary/20";
  }
};

export const Awards = () => {
  const [data, setData] = useState<AwardsData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    fetch("./data/awards.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error loading awards data:", err));

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("awards");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  if (!data) {
    return (
      <section id="awards" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 animate-pulse">
            <div className="h-40 bg-muted rounded-xl"></div>
            <div className="h-40 bg-muted rounded-xl"></div>
            <div className="h-40 bg-muted rounded-xl"></div>
            <div className="h-40 bg-muted rounded-xl"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="awards" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2
          className={`text-4xl md:text-5xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {language === "ko" ? "수상 및 자격증" : "Awards & Certifications"}
        </h2>
        <div
          className={`w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-12 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
        ></div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {data.awards.map((award, index) => (
            <div
              key={award.id}
              className={`bg-card rounded-xl p-6 shadow-card border border-border hover:border-primary/50 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg border ${getColorForType(
                    award.type
                  )}`}
                >
                  {getIconForType(award.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-1">{award.title}</h3>
                  <div className="text-sm text-primary font-medium mb-1">
                    {award.issuer}
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    {award.date}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {award.description}
                  </p>
                  <div className="mt-3">
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded-full border ${getColorForType(
                        award.type
                      )}`}
                    >
                      {award.type.charAt(0).toUpperCase() + award.type.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
