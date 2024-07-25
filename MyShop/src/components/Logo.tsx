import React from "react";

interface LogoPropTypes {
  children: React.ReactNode;
}

export default function Logo({ children }: LogoPropTypes) {
  return <h2 className="text-2xl font-bold m-auto">{children}</h2>;
}
