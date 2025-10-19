import { useEffect, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AboutData {
  name: string;
  age: number;
  headline: string;
  bio: string;
  metrics: Array<{ label: string; value: string }>;
  contact: {
    email: string;
    phone: string;
    location: string;
  };
}

interface AboutProps {
  data: AboutData;
}

export const About = ({ data }: AboutProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("about");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2
          className={`text-4xl md:text-5xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {language === "en" ? "About Me" : "소개"}
        </h2>
        <div
          className={`w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-12 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
        ></div>

        <div className="max-w-4xl mx-auto">
          <div
            className={`bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">
                {data.name}, {data.age}
              </h3>
              <p className="text-lg text-primary font-medium">{data.headline}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {data.bio}
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {data.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-gradient-card rounded-lg border border-border/50"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-3 border-t border-border pt-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span>{data.contact.email}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <span>{data.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{data.contact.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
