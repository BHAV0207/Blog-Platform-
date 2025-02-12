import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ModalProvider } from "./Store/Context.jsx";
import { UserProvider } from "./Store/UserContext.jsx";
import { ThemeProvider } from "./Store/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <ModalProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ModalProvider>
  </ThemeProvider>
);
