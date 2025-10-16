import { auth } from "./firebase";

export const checkAdmin = async () => {
  const user = auth.currentUser;
  if (!user) return false;

  const token = await user.getIdTokenResult(true); // 🔄 refresh token
  return token.claims.admin === true;
};
