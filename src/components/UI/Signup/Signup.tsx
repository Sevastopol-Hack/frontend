import { FC } from "react";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../../../router/Routes";

interface GetWalletProps {
  className?: string;
}

const Signup: FC<GetWalletProps> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-10">
      <button
        className={`btn btn-outline ${className}`}
        onClick={() => navigate(RoutePaths.LOGIN)}
      >
        Войти
      </button>

      <button
        className={`btn btn-outline ${className}`}
        onClick={() => navigate(RoutePaths.SIGNUP)}
      >
        Регистрация
      </button>
    </div>
  );
};

export default Signup;
