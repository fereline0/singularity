"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/dropdown";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Avatar } from "@nextui-org/avatar";
import { Spinner } from "@nextui-org/spinner";
import { signOut, useSession } from "next-auth/react";
import { IoLogInOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { useTheme } from "next-themes";
import { LuMoon } from "react-icons/lu";

import Dialog from "@/components/shared/Dialog/page";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const {
    isOpen: isOpenSignOutModal,
    onOpen: onOpenSignOutModal,
    onOpenChange: onOpenChangeSignOutModal,
  } = useDisclosure();
  const session = useSession();

  const handleSignOut = async () => {
    await signOut();
    onOpenChangeSignOutModal();
  };

  return (
    <Navbar shouldHideOnScroll maxWidth="2xl">
      <NavbarContent>
        <NavbarBrand>
          <Link className="font-bold text-inherit" href="/">
            Singularity
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            isIconOnly
            variant="light"
            onClick={() => setTheme(theme == "light" ? "dark" : "light")}
          >
            <LuMoon size={20} />
          </Button>
        </NavbarItem>
        {session.status == "loading" ? (
          <Spinner />
        ) : session.status === "authenticated" ? (
          <NavbarItem>
            <Dropdown backdrop="blur" placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  className="cursor-pointer"
                  size="sm"
                  src={session.data.user.image ?? "/no-avatar.jpg"}
                />
              </DropdownTrigger>
              <DropdownMenu variant="shadow">
                <DropdownItem
                  href={`/users/${session.data.user.id}`}
                  startContent={<FiUser size={20} />}
                >
                  {session.data.user.name}
                </DropdownItem>
                <DropdownItem
                  color="danger"
                  startContent={<IoLogInOutline size={20} />}
                  onClick={onOpenSignOutModal}
                >
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dialog
              actions={[
                {
                  children: "Sign out",
                  onClick: async () => await handleSignOut(),
                  color: "danger",
                },
              ]}
              description="Are you sure you want to sign out of your account?"
              isOpen={isOpenSignOutModal}
              title="Sign out"
              onOpenChange={onOpenChangeSignOutModal}
            />
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              href="/login"
              startContent={<IoLogInOutline size={20} />}
            >
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
