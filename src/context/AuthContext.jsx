// import { createContext, useContext, useState, ReactNode } from "react";


// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState<string | null>(
//     localStorage.getItem("user") || null
//   );

//   const login = (username) => {
//     setUser(username);
//     localStorage.setItem("user", username);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };









import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || null);

  const login = (username) => {
    setUser(username);
    localStorage.setItem("user", username);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
