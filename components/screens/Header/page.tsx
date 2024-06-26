"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Spinner,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";

import { IoLogInOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { useTheme } from "next-themes";
import { LuMoon } from "react-icons/lu";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const session = useSession();

  return (
    <Navbar maxWidth="2xl" shouldHideOnScroll>
      <NavbarContent>
        <NavbarBrand>
          <Link className="font-bold text-inherit" href="/">
            Singularity
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        {session.status == "loading" ? (
          <Spinner />
        ) : session.status === "authenticated" ? (
          <NavbarItem>
            <Dropdown placement="bottom-end" backdrop="blur">
              <DropdownTrigger>
                <Avatar
                  className="cursor-pointer"
                  isBordered
                  size="sm"
                  src={session.data.user?.image ?? ""}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="shadow">
                <DropdownItem
                  href={`/users/${session.data.user?.id}`}
                  startContent={<FiUser size={20} />}
                >
                  {session.data.user?.name}
                </DropdownItem>
                <DropdownItem
                  startContent={<LuMoon size={20} />}
                  onClick={() => setTheme(theme == "light" ? "dark" : "light")}
                >
                  Change theme
                </DropdownItem>
                <DropdownItem
                  onClick={() => signOut()}
                  color="danger"
                  startContent={<IoLogInOutline size={20} />}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem>
              <Link color="primary" href="/register">
                Register
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                color="primary"
                as={Link}
                href="/login"
                startContent={<IoLogInOutline size={20} />}
              >
                Login
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
