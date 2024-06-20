import { signIn } from "next-auth/react";
import { FormEvent } from "react";

export async function login(
  event: FormEvent<HTMLFormElement>,
  setError: React.Dispatch<React.SetStateAction<string>>
) {
  event.preventDefault();

  try {
    const formData = new FormData(event.target as HTMLFormElement);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setError(res?.error || "");
  } catch (error) {
    setError("Critical error");
  }
}
