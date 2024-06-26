"use client";

import loginRequest from "@/requests/login.request";
import {
  Button,
  Input,
  Divider,
  Card,
  CardBody,
  Link,
  Spacer,
} from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaDiscord } from "react-icons/fa";
import { login } from "@/services/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");

  const router = useRouter();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailState(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordState(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginRequest),
  });

  return (
    <div className="sm:flex items-center justify-center">
      <Card shadow="none" className="max-w-full w-full sm:max-w-80">
        <CardBody>
          <form
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              handleSubmit(async () => {
                const res = await login(emailState, passwordState);

                if (!res?.error) {
                  router.push("/");
                }
              })();
            }}
            className="flex flex-col gap-2"
          >
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              onChange={handleEmailChange}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message?.toString()}
            />
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              onChange={handlePasswordChange}
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
          <Spacer y={2} />
          <Divider />
          <Spacer y={2} />
          <div className="text-center">
            <Link href="/register">Already have an account?</Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
