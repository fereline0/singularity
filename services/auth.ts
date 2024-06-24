import { signIn } from "next-auth/react";
import { FormEvent } from "react";
import toast from "react-hot-toast";

export async function login(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const formData = new FormData(event.target as HTMLFormElement);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const res = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (res?.error) {
    toast.error(res?.error);
  }

  return res;
}
