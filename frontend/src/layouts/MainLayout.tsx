import Footer from "../components/Footer";
import React from "react";
import MainHeader from "../components/header/MainHeader";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      <div className="max-w-6xl mx-auto flex-1 w-full">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
