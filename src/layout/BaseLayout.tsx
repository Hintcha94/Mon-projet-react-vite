import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
    children: React.ReactNode;
};
export default function BaseLayout({children}: Props){
 return (
    <>
    {/* Navigation */}
  <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
    <Header/>
  </nav>


  {/* children */}
  {children}

  {/* Footer */}
  <footer className="footer">
   <Footer/>
  </footer>
    </>
  );

}

