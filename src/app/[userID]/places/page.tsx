// display list of user places (and allow edit and delete only for the authenticated user or authorized user)
"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Textarea,
} from "@nextui-org/react";
interface Props {
  params: {
    userID: string;
  };
}
interface RootState {
  user: {
    user: {
      token?: string | null;
      userID?: string | null;
      expirationDate?: Date | null;
    };
    loggedIn?: boolean | null;
  };
}
const Place = (props: Props) => {
 

  useEffect(() => {
   
  }, []);

  const deletePlaceHandler = async () => {
   
  };

  return (
    <>
    
    </>
  );
};

export default Place;
