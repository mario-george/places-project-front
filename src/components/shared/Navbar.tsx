"use client"

import Link from 'next/link'
import React from "react";

import {
  Navbar as NavbarEl,
  Collapse,
  Typography,
  Button,
  IconButton,
  Card,
} from "./material-tailwind";

export default function Navbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">

      <Link href="/">


      <Typography
        placeholder={``}
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
          Users
      </Typography>
      </Link>
    </ul>
  );
  return (
    <div className="max-h-[768px]  ">
      <NavbarEl
        placeholder=""
        className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4"
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            placeholder=""
            as="div"

            className="mr-4 cursor-pointer py-1.5 font-medium text-2xl"
          >
            Places
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-2">
            <Link href="login">

            </Link>
              <Button
                placeholder=""
                variant="text"
                size="sm"
                className="hidden lg:inline-block !capitalize text-lg"
              >
                <span>Log In</span>
              </Button>

              <Link href="/signup">


              <Button
                placeholder=""
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block !capitalize text-lg"
              >
                <span>Sign Up</span>
              </Button>
              </Link>
            </div>
            <IconButton
              placeholder=""
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1 w-full">
            <Link href="/login" className="w-full">

            <Button
              placeholder=""
              fullWidth
              variant="text"
              size="sm"
              className="!capitalize"
            >
              <span>Log In</span>
            </Button>
            </Link>

            <Link href="/signup" className="w-full">
            <Button
              placeholder=""
              fullWidth
              variant="gradient"
              size="sm"
              className="!capitalize"
            >
              <span>Sign Up</span>
            </Button></Link>
          </div>
        </Collapse>
      </NavbarEl>
    </div>
  );
}
