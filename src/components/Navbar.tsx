'use client';

import Link from 'next/link';
import { useState, useEffect, Key, useContext } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@heroui/react";
import { AuthContext, DBContext } from '@/app/providers';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';

function Logo() {
  return (
    <Link href="/">
      <img
        src="/images/logo/logo-clear.png"
        alt="DE NATURE Logo"
        className="h-32 w-auto"
      />
    </Link>
  )
}

export default function Navigation() {
  const router = useRouter();

  const auth = useContext(AuthContext);
  const [user] = useAuthState(auth);
  const [admin, setAdmin] = useState(false);
  const [logout] = useSignOut(auth);

  const db = useContext(DBContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      let userInfo = await getDoc(doc(db, "users", user.uid));
      if (!userInfo.exists()) return;
      setAdmin(userInfo.data()!["admin"]);
    }
    fetchUserData();
  }, [user])

  const aboutLinks = [
    { name: 'Our Story', href: '/about/our-story' },
    { name: 'Messages from Founder', href: '/about/messages-from-founder' },
  ];

  const getInvolvedLinks = [
    { name: 'Volunteer', href: '/get-involved/volunteer' },
    { name: 'Donate Funds', href: '/get-involved/donate-funds' },
    { name: 'Donate Food', href: '/get-involved/donate-food' },
    { name: 'Become a Sponsor', href: '/get-involved/become-sponsor' },
    { name: 'Partner With Us', href: '/get-involved/partner-with-us' },
  ];

  const onDropdownClick = (key: any) => {
    router.push(key);
  }
  const onProfileClick = (key: any) => {
    if (key == 'logout') {
      logout();
      router.push("/");
    } else {
      router.push("/" + key);
    }
  }


  return (
    <Navbar className="w-full transition-all duration-300 flex items-center">
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/menu">
            Menu
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                About Us
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="About Us menu"
            itemClasses={{
              base: "gap-4",
            }}
            onAction={onDropdownClick}
          >
            {
              aboutLinks.map(({ name, href }) => (
                <DropdownItem
                  key={href}
                >
                  {name}
                </DropdownItem>
              ))
            }
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                Get Involved
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Get involved menu"
            itemClasses={{
              base: "gap-4",
            }}
            onAction={onDropdownClick}
          >
            {
              getInvolvedLinks.map(({ name, href }) => (
                <DropdownItem
                  key={href}
                >
                  {name}
                </DropdownItem>
              ))
            }
          </DropdownMenu>
        </Dropdown>
        <NavbarItem>
          <Link color="foreground" href="/contact">
            Contact
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-2 flex align-center ml-2 rounded-lg"
                radius="sm"
                variant="light"
              >
                {
                  user && <Image
                    className='rounded-full'
                    src={user.photoURL || "/icons/default-profile.webp"}
                    alt="User Profile Picture"
                    width="40"
                    height="40"
                  />
                }
                {user ? <p>{user.displayName}</p> : <i>Signed out</i>}
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="User Menu"
            itemClasses={{
              base: "gap-4",
            }}
            onAction={onProfileClick}
          >
            <>
            {
              user && <>
                <DropdownItem key="orders">My Orders</DropdownItem>
                {admin && <DropdownItem key="order-admin">Order Admin</DropdownItem>}
                {admin && <DropdownItem key="menu-admin">Menu Admin</DropdownItem>}
                <DropdownItem key="logout">Logout</DropdownItem>
              </>
            }
            {
              !user && <>
                <DropdownItem key="login">Login</DropdownItem>
                <DropdownItem key="register">Register</DropdownItem>
              </>
            }
            </>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
} 