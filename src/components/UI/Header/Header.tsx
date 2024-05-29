import { FC, useState } from "react";
import Links from "../Links/Links";
import Logo from "../Logo/Logo";
import Signup from "../Signup/Signup";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sm:flex md:flex lg:flex xl:flex xl:justify-between lg:justify-between mt-2 py-5 px-10 sm:justify-between md:justify-between items-center border-b border-black/25 border-solid">
      <Logo />

      {/* Burger Menu */}
      <div className="sm:hidden md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          {isMenuOpen ? (
            <XMarkIcon className="h-5 w-5" />
          ) : (
            <Bars3Icon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <div
        className={`sm:flex md:flex lg:flex xl:flex ${
          isMenuOpen ? "block" : "hidden"
        } sm:flex-col md:flex-row lg:flex-row xl:flex-row`}
      >
        <Links className="sm:flex md:flex lg:flex xl:flex justify-center items-center sm:flex-col md:flex-row lg:flex-row xl:flex-row" />
        <Signup />
      </div>
    </div>
  );
};

export default Header;
