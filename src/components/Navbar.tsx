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
  NavbarMenuItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  NavbarMenuToggle,
  NavbarMenu,
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

  const [isMenuOpen, setMenuOpen] = useState(false);

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
    setMenuOpen(false);
    router.push(key);
  }
  const onProfileClick = (key: any) => {
    setMenuOpen(false);
    if (key == 'logout') {
      logout();
      router.push("/");
    } else {
      router.push("/" + key);
    }
  }


  return (
    <Navbar className="h-32 w-full p-2 flex items-center bg-[#E2DED0]" position='static' isBlurred={false}  onMenuOpenChange={setMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        {!isMenuOpen && <Logo />}
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 text-[#373D27]" justify="center">
        <NavbarItem>
          <Link href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/menu">
            Menu
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-[#373D27] text-[16px]"
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
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-[#373D27] text-[16px]"
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
          <Link href="/contact">
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
                {
                  user
                  ? <p className="text-[#373D27] text-[16px]">{user.displayName}</p>
                  : <i className="text-[#373D27] text-[16px]">Signed out</i>
                }
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
                {admin && <DropdownItem key="user-admin">User Admin</DropdownItem>}
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
      <NavbarMenu>
        <NavbarMenuItem className='mt-16'>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/menu" onClick={() => setMenuOpen(false)}>
            Menu
          </Link>
        </NavbarMenuItem>
        <Dropdown>
          <NavbarMenuItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-[#373D27] text-[16px]"
                endContent={<ChevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                About Us
              </Button>
            </DropdownTrigger>
          </NavbarMenuItem>
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
          <NavbarMenuItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-[#373D27] text-[16px]"
                endContent={<ChevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                Get Involved
              </Button>
            </DropdownTrigger>
          </NavbarMenuItem>
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
        <NavbarMenuItem onClick={() => setMenuOpen(false)}>
          <Link href="/contact">
            Contact
          </Link>
        </NavbarMenuItem>
        <Dropdown>
          <NavbarMenuItem>
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
                {
                  user
                  ? <p className="text-[#373D27] text-[16px]">{user.displayName}</p>
                  : <i className="text-[#373D27] text-[16px]">Signed out</i>
                }
              </Button>
            </DropdownTrigger>
          </NavbarMenuItem>
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
                {admin && <DropdownItem key="user-admin">User Admin</DropdownItem>}
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
      </NavbarMenu>
    </Navbar>
  );
} 