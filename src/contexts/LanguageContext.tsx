import { createContext, useContext, useState, ReactNode } from "react";

// 언어 타입 정의
export type Language = "en" | "ko";

// 언어 컨텍스트 타입 정의
interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

// 언어 컨텍스트 생성
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 언어 프로바이더 컴포넌트
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // 기본 언어를 한국어(KO)로 설정
  const [language, setLanguage] = useState<Language>("ko");

  // 언어 전환 함수
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ko" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 언어 컨텍스트를 사용하기 위한 커스텀 훅
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

