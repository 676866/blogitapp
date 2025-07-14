import { createContext, useContext, useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void; 
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


function decodeUser(token: string): User {
  const decoded: any = jwtDecode(token);
  return {
    id: decoded.id,
    username: decoded.username,
       email: decoded.email,
    firstName: decoded.firstName,
     lastName: decoded.lastName,
  };
}


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("token");
    return stored ? decodeUser(stored) : null;
  });

  
  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken    (newToken);
    setUser(decodeUser(newToken));
  };

  
  const logout = () => {
    localStorage.removeItem("token");
        setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider     value={{ user, setUser, token, login, logout }}>
           {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext     (AuthContext);
       if (!ctx) throw new Error("useAuth must be used within AuthProvider");
   return  ctx;
};
