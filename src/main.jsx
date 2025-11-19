// import React from 'react';
// import { StyleProvider } from '@ant-design/cssinjs';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';

// import 'antd/dist/reset.css'; // Ant Design v5+ CSS (imported first)
// import './index.css'; // Tailwind/daisyUI CSS (imported after Ant Design)
// import { GoogleOAuthProvider } from '@react-oauth/google';



// const rootElement = document.getElementById('root');
// if (rootElement) {
//   ReactDOM.createRoot(rootElement).render(
//     <React.StrictMode>
//       <StyleProvider hashPriority="high">
//         <BrowserRouter>
//         <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
//         <App />
//         </GoogleOAuthProvider>
        
//         </BrowserRouter>
//       </StyleProvider>
//     </React.StrictMode>
//   );
// }




// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { ThemeProvider } from "./context/ThemeContext";
// import "./index.css";
// import AppRouter from "./routes/AppRoutes";
// import { UserProvider } from "./routes/UserContext";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <ThemeProvider>
//         <UserProvider>
//          <AppRouter />
//         </UserProvider>
       
//       </ThemeProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );







// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { ThemeProvider } from "./context/ThemeContext";
// import { UserProvider } from "./routes/UserContext";
// import AppRouter from "./routes/AppRoutes";
// import "./index.css";
// import { UserRoleProvider } from "./routes/UserRoleContext";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <ThemeProvider>
//         <UserProvider>
//           <UserRoleProvider>
//            <AppRouter />
//           </UserRoleProvider>
          
//         </UserProvider>
//       </ThemeProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );






// src/index.js
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./routes/UserContext";
import { UserRoleProvider } from "./routes/UserRoleContext";
import AppRouter from "./routes/AppRoutes";
import "./index.css";

// ────── AUTO REFRESH ON NEW ACCOUNT LOGIN (ANY TAB) ──────
const LOGIN_ACCOUNT_KEY = "currentUserAccount"; // Tracks email/userId
const LOGIN_TIMESTAMP_KEY = "lastLoginTime";

const AutoRefreshOnAccountChange = () => {
  useEffect(() => {
    // Get current session's account identifier
    const currentAccount = localStorage.getItem(LOGIN_ACCOUNT_KEY);
    const currentTimestamp = localStorage.getItem(LOGIN_TIMESTAMP_KEY);

    const handleStorageChange = (e) => {
      if (e.key === LOGIN_ACCOUNT_KEY || e.key === LOGIN_TIMESTAMP_KEY) {
        const newAccount = localStorage.getItem(LOGIN_ACCOUNT_KEY);
        const newTimestamp = localStorage.getItem(LOGIN_TIMESTAMP_KEY);

        // If different account OR newer login
        if (
          newAccount && 
          (newAccount !== currentAccount || 
           (newTimestamp && newTimestamp > currentTimestamp))
        ) {
          console.log("New account login detected → refreshing dashboard...");
          window.location.reload();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return null;
};

// ────── CALL THIS ON EVERY SUCCESSFUL LOGIN ──────
export const markLogin = (userEmail) => {
  const now = Date.now().toString();
  const normalizedEmail = userEmail?.trim().toLowerCase();

  if (!normalizedEmail) return;

  // Update both keys
  localStorage.setItem(LOGIN_ACCOUNT_KEY, normalizedEmail);
  localStorage.setItem(LOGIN_TIMESTAMP_KEY, now);
};

// ────── OPTIONAL: Clear on logout ──────
export const clearLoginSession = () => {
  localStorage.removeItem(LOGIN_ACCOUNT_KEY);
  localStorage.removeItem(LOGIN_TIMESTAMP_KEY);
};

// ────── RENDER APP ──────
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <UserRoleProvider>
            <AutoRefreshOnAccountChange /> {/* ← Detects account switch */}
            <AppRouter />
          </UserRoleProvider>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);