import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ModalProvider } from "./Store/Context.jsx";
import { UserProvider } from "./Store/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <ModalProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </ModalProvider>
);
