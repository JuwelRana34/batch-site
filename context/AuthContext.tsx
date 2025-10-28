// "use client";
// import { auth } from "@/lib/firebase";
// import {
//   getIdTokenResult,
//   onAuthStateChanged,
//   signOut,
//   User,
// } from "firebase/auth";
// import { createContext, useContext, useEffect, useState } from "react";

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   isAdmin: boolean;
//   isModerator: boolean;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isModerator, setIsModerator] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         const token = await getIdTokenResult(currentUser, true);
//         if (token.claims.admin) {
//           setIsAdmin(true);
//           setIsModerator(false);
//         } else if (token.claims.moderator) {
//           setIsModerator(true);
//           setIsAdmin(false);
//         } else {
//           setIsAdmin(false);
//           setIsModerator(false);
//         }
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const logout = async () => {
//     await signOut(auth);
//      setUser(null)
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, loading, isAdmin, isModerator, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom Hook
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };



"use client";
import { auth } from "@/lib/firebase";
import {
  getIdTokenResult,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        try {
          const token = await getIdTokenResult(currentUser, true);

          setIsAdmin(token.claims.admin === true);
          setIsModerator(token.claims.moderator === true);
        } catch (err) {
          console.error("Error getting token claims:", err);
          setIsAdmin(false);
          setIsModerator(false);
        }
      } else {
        // User logged out or not logged in
        setUser(null);
        setIsAdmin(false);
        setIsModerator(false);
      }

      // ✅ Always finish loading, whether user is null or not
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setIsAdmin(false);
    setIsModerator(false);
    setLoading(false); // ✅ Optional: stop loading after logout
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAdmin, isModerator, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

