// import { auth } from "./firebase";

// export const checkAdmin = async () => {
//   const user = auth.currentUser;
//   if (!user) return false;

//   const token = await user.getIdTokenResult(true); // 🔄 refresh token
//   return token.claims.admin === true;
// };


import { auth } from "./firebase";
import { useEffect, useState } from "react";

export function useCheckAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdTokenResult(true); // refresh token
        setIsAdmin(token.claims.admin === true);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { isAdmin, loading };
}

