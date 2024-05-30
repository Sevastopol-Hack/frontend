import { FC } from "react";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../../../router/Routes";

const Logo: FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-row justify-center items-center cursor-pointer"
      onClick={() => navigate(RoutePaths.HOME)}
    >
      <img
        className="h-[40px] md:invisible lg:visible xl:visible"
        src="/icons/logo.svg"
        alt="Logo"
      />
      <p className="text-xl lg:text-3xl ml-2 font-bold"></p>
    </div>
  );
};

export default Logo;
