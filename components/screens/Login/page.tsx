"use client";

import loginScheme from "@/requests/login.request";
import {
  Button,
  Input,
  Divider,
  Card,
  CardBody,
  Link,
} from "@nextui-org/react";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaDiscord } from "react-icons/fa";
import { login } from "@/services/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginScheme),
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    const res = await login(event);

    if (!res?.error) {
      router.push("/");
    }
  }

  return (
    <div className="flex items-center justify-center">
      <Card shadow="none" className="max-w-80 w-full">
        <CardBody>
          <form
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              handleSubmit(async () => {
                await onSubmit(event);
              })();
            }}
            className="flex flex-col gap-2 mb-2"
          >
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message?.toString()}
            />
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message?.toString()}
            />
            <Button type="submit" color="primary">
              Sign In
            </Button>
            <Divider />
            <Button
              className="bg-[#5865F2] text-white"
              startContent={<FaDiscord size={22} />}
              onClick={async () => await signIn("discord")}
            >
              Discord
            </Button>
          </form>
          <Divider className="mb-2" />
          <div className="text-center">
            <Link href="/register">Already have an account?</Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
