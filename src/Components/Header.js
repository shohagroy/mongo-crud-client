import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-blue-400">
      <div className="max-w-[1200px] mx-auto">
        <nav className="flex justify-between items-center h-[8vh]">
          <img src="" alt="Logo" />
          <div>
            <NavLink to="/" className="p-3">
              Home
            </NavLink>
            <NavLink to="/items" className="p-3">
              Items
            </NavLink>
            <NavLink to="/purchase" className="p-3">
              Purchase
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
