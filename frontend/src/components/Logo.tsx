import React from "react";

interface LogoPropTypes {
  children: React.ReactNode;
}

export default function Logo({ children }: LogoPropTypes) {
  return <h1 className="text-xl font-bold m-auto">{children}</h1>;
}
