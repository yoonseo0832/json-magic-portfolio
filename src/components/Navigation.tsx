import { useState, useEffect, useRef } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavigationProps {
  onLogoClick: () => void;
}

export const Navigation = ({ onLogoClick }: NavigationProps) => {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  
  // 로고 클릭 카운트 관리
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  // 로고 클릭 핸들러 - 3번 클릭시 어드민 페이지로 이동
  const handleLogoClick = () => {
    clickCountRef.current += 1;

    // 이전 타이머가 있으면 클리어
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    // 3번 클릭 시 어드민 페이지로 이동
    if (clickCountRef.current === 3) {
      navigate("/admin");
      clickCountRef.current = 0;
      return;
    }

    // 1초 후 클릭 카운트 초기화
    clickTimerRef.current = setTimeout(() => {
      if (clickCountRef.current < 3) {
        onLogoClick(); // 원래의 스크롤 기능 실행
      }
      clickCountRef.current = 0;
    }, 1000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  // 언어별 네비게이션 항목
  const navItems = [
    { id: "home", label: language === "en" ? "Home" : "홈" },
    { id: "about", label: language === "en" ? "About" : "소개" },
    { id: "experience", label: language === "en" ? "Experience" : "경력" },
    { id: "skills", label: language === "en" ? "Skills" : "스킬" },
    { id: "projects", label: language === "en" ? "Projects" : "프로젝트" },
    { id: "awards", label: language === "en" ? "Awards" : "수상" },
    { id: "contact", label: language === "en" ? "Contact" : "연락처" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={handleLogoClick}
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            LYS
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground/80 hover:text-foreground transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full"></span>
              </button>
            ))}
            {/* 언어 전환 버튼 */}
            <button
              onClick={toggleLanguage}
              className="text-foreground/80 hover:text-foreground transition-colors relative group font-medium"
            >
              {language === "en" ? "KO" : "EN"}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full"></span>
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-2"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-lg animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {item.label}
              </button>
            ))}
            {/* 모바일 언어 전환 버튼 */}
            <button
              onClick={() => {
                toggleLanguage();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors font-medium"
            >
              {language === "en" ? "한국어 (KO)" : "English (EN)"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
