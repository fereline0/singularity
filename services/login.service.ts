import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default async (email: string, password: string) => {
  const res = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (res?.error) {
    toast.error(res?.error);
  }

  return res;
};
