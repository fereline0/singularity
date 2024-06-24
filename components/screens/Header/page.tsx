"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
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

import { useState } from "react";
import { useTheme } from "next-themes";
import { LuMoon } from "react-icons/lu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const session = useSession();

  const menuItems = ["Support", "Dashboard"];

  return (
    <Navbar maxWidth="2xl" shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link className="font-bold text-inherit" href="/">
            Singularity
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        justify="center"
        className="hidden sm:flex flex-wrap gap-4"
      >
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href="#">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
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
                  color="primary"
                  size="sm"
                  src={session.data.user?.image ?? "/no-avatar.jpg"}
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

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href="#">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
