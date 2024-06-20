"use client";

import loginScheme from "@/requests/login.request";
import { Button, Card, CardBody, Input, Divider } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaDiscord } from "react-icons/fa";
import { login } from "@/services/auth";
import { signIn } from "next-auth/react";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginScheme),
  });

  const [error, setError] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleSubmit(async () => {
            await login(event, setError);
          })();
        }}
        className="flex flex-col gap-3 p-6 rounded-lg shadow-lg"
      >
        {error && (
          <Card shadow="none" className="bg-red-200">
            <CardBody>{error}</CardBody>
          </Card>
        )}
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
    </div>
  );
}
