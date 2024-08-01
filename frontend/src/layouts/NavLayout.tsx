import React from "react";
import HeaderAlt from "../components/header/HeaderAlt";

const NavLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <HeaderAlt />
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
};

export default NavLayout;
