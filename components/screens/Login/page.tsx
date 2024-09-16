"use client";

import { Button, Card, CardBody } from "@nextui-org/react";
import { FaDiscord } from "react-icons/fa";
import { signIn } from "next-auth/react";

import Marginer from "@/components/shared/Marginer/page";

export default function Login() {
  return (
    <div className="sm:flex items-center justify-center">
      <Card className="max-w-full w-full sm:max-w-80" shadow="none">
        <CardBody>
          <Marginer y={8}>
            <Button
              fullWidth
              className="bg-[#5865F2] text-white"
              startContent={<FaDiscord size={22} />}
              onClick={async () =>
                await signIn("discord", { callbackUrl: "/" })
              }
            >
              Discord
            </Button>
          </Marginer>
        </CardBody>
      </Card>
    </div>
  );
}
