import React from "react";
import "../Gallery.css";

import { HeaderProps } from "../types/types";

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="header">
      <h1 className="logo"> Gallerie </h1>
      <form className="search-form">
        <input
          type="text"
          name="search-bar"
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
      </form>
    </header>
  );
};

export default Header;
