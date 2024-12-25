import { UserProps } from "../interfaces/UserProps";

export const serializeUser = (user: UserProps) => {
  if (!user) return {};

  return {
    uid: user.uid,
    email: user.email,
    username: user.displayName,
  };
};
