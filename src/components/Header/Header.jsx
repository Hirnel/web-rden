import React from "react";
import "../../styles/components/_Header.scss"

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/logo.jpg" alt="Logo Érden" className="logo" />
      </div>
      <div>
        <h1 className="title">The Continent of Érden</h1>
      </div>
    </header>
  );
};

export default Header;
