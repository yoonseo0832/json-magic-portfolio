import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Awards } from "@/components/Awards";
import { Contact } from "@/components/Contact";

const Index = () => {
  const [logoClickCount, setLogoClickCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (logoClickCount === 3 && import.meta.env.DEV) {
      navigate("/admin");
      setLogoClickCount(0);
    }
  }, [logoClickCount, navigate]);

  const handleLogoClick = () => {
    setLogoClickCount((prev) => prev + 1);
    setTimeout(() => setLogoClickCount(0), 2000);
  };

  return (
    <div className="min-h-screen">
      <Navigation onLogoClick={handleLogoClick} />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Awards />
      <Contact />
      
      {/* Footer */}
      <footer className="py-8 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 John Doe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
