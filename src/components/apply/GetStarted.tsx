import { FormContext } from "@/context/FormContext";
import { Button } from "flowbite-react";
import Link from "next/link";
import React, { FC, useContext } from "react";
import { Login } from "../auth";

// style the page
// hook up get started button click functionnality
// contunue implementing the path of continue as a guest
// Implement simple auth to get all user data, and test the are ou registered path as well
// no matter what user chooses, the stepper should act the same..

export const GetStarted = () => {
  const { setAsGuest, nextStep } = useContext(FormContext);

  return (
    <div className="mt-8 mb-12">
      <div className="mb-12 flex justify-center">
        <h2>Get Started</h2>
      </div>
      <div className="flex flex-col space-x-16 md:flex-row">
        <div className="flex w-1/2 flex-col">
          <h4 className="mb-8">Are you registered?</h4>
          <h5 className="mb-5">Log in to your account</h5>
          <Login />
          <Link href="/" className="link mt-8 mb-5">
            Create new account
          </Link>
        </div>
        <div className="flex w-1/2 flex-col items-start">
          <h4 className="mb-8">Or, continue as a guest</h4>
          <Button
            onClick={() => {
              setAsGuest(true);
              nextStep();
            }}
          >
            Get started
          </Button>
        </div>
      </div>
      <div>
        <Link href="/" className="link">
          {"< "}Back to job details
        </Link>
      </div>
    </div>
  );
};
