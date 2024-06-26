import { Button, Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../../../router/Routes";
import { useState } from "react";
import LoginInput from "./LoginInput";
import UserService, { LoginRequest } from "../../../API/UserService";
import { useSelf } from "../../../states/self";

export const LoginForm = () => {
  const { setUser } = useSelf();
  const navigate = useNavigate();

  const [data, setData] = useState<LoginRequest>({
    password: "",
    username: "",
  });

  return (
    <>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Войти
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <LoginInput
              description="Имя пользователя:"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
            />

            <LoginInput
              description="Пароль:"
              type="password"
              placeholder="********"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </div>

          <Button
            className="mt-6 bg-[#13ADE7]"
            fullWidth
            onClick={() => {
              UserService.login(data)
                .catch()
                .then(() => {
                  UserService.info().catch().then(setUser);
                  navigate(RoutePaths.HOME);
                });
            }}
          >
            Войти
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Нет аккаунта? &nbsp;
            <a
              className="font-medium text-[#A5B4C4] cursor-pointer"
              onClick={() => navigate(RoutePaths.SIGNUP)}
            >
              Зарегистрироваться
            </a>
          </Typography>
        </form>
      </Card>
    </>
  );
};
