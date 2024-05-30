import { FC } from "react";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../../../router/Routes";
import Link from "../Link/Link";

interface GetWalletProps {
  className?: string;
}

const Signup: FC<GetWalletProps> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div className={`${className} flex justify-center items-center`}>
      <Link
        className="flex flex-row mx-5"
        onClick={() => navigate(RoutePaths.LOGIN)}
      >
        <p className="mr-1">Войти</p>
      </Link>

      <Link
        className="flex flex-row mx-5"
        onClick={() => navigate(RoutePaths.SIGNUP)}
      >
        <p className="mr-1">Регистрация</p>
      </Link>
    </div>
  );
};

export default Signup;
