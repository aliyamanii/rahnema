import React from "react";
import "../Gallery.css";

import { SidebarProps } from "../types/types";

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="sidebar">
      <section className="menu">
        <button
          className={`menu__button ${
            selectedCategory === "" ? "menu__button--active" : ""
          }`}
          onClick={() => setSelectedCategory("")}
        >
          <i className="fas fa-layer-group menu__icon"></i>
          <span className="menu__text">All</span>
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`menu__button ${
              selectedCategory === category ? "menu__button--active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            <i className="fas fa-layer-group menu__icon"></i>
            <span className="menu__text">{category}</span>
          </button>
        ))}
      </section>
    </div>
  );
};

export default Sidebar;
