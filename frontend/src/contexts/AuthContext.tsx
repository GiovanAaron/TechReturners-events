// import { createContext, useContext, useState, ReactNode } from "react";


// interface AuthContextType {
//   isAuthenticated: boolean;
//   login: () => void;
//   logout: () => void;
// }

// // Create the context with a default value of `null`
// const AuthContext = createContext<AuthContextType | null>(null);

// // Provider component
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const login = () => setIsAuthenticated(true);
//   const logout = () => setIsAuthenticated(false);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use the AuthContext safely
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     return { isAuthenticated: false, login: () => {}, logout: () => {} }; // Placeholder values
//   }
//   return context;
// };
