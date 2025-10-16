import PrimaryHeading from "@/components/custom/PrimaryHeading";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="container relative mx-auto p-4 flex flex-col justify-center items-center min-h-scree">
      <PrimaryHeading>404 Not Found</PrimaryHeading>
      <Image
        src="/images/notFound.png"
        width={713}
        height={500}
        alt="Not Found Image"
      />
      <Button asChild variant={"secondary"} size={"lg"}>
        <Link href="/">Back To Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
