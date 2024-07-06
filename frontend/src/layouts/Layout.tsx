import Footer from "../components/Footer";
import Header from "../components/Header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto min-h-screen flex flex-col">
      <Header />
      <div className="max-w-screen-xl mx-auto flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
