import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// GitHub Pages SPA 라우팅 처리
// 404 페이지에서 리다이렉트된 경우 원래 경로로 복원
const redirect = sessionStorage.redirect;
delete sessionStorage.redirect;
if (redirect && redirect !== location.href) {
  history.replaceState(null, '', redirect);
}

createRoot(document.getElementById("root")!).render(<App />);
