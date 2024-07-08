import Footer from "../components/Footer";
import Header from "../components/Header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="max-w-6xl mx-auto flex-1 w-full">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
