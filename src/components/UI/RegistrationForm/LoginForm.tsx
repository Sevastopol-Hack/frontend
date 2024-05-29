import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../../../router/Routes";
import { useState } from "react";
import LoginInput from "./LoginInput";

interface LoginRequest {
  password: string;
  phone: string;
}

interface LoginLERequest {
  password: string;
  inn?: number;
}

export const LoginForm = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<LoginRequest>({
    password: "",
    phone: "",
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
              type="tel"
              description="Номер телефона:"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  phone: "+7" + e.target.value,
                }))
              }
              template={
                <div className="flex rounded-md h-10 items-center gap-2 border-blue-gray-200 bg-blue-gray-500/10 border-solid rounded-r-none border border-r-0 pl-3">
                  <span className="flex items-center pr-5">+7</span>
                </div>
              }
              className="rounded-l-none"
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

          <Button className="mt-6" fullWidth onClick={() => {}}>
            Войти
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Нет аккаунта? &nbsp;
            <a
              className="font-medium text-gray-900 cursor-pointer"
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

export const LoginLEForm = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<LoginLERequest>({
    password: "",
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
              type="number"
              description="ИНН:"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  inn: parseInt(e.target.value),
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

          <Button className="mt-6" fullWidth onClick={() => {}}>
            Войти
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Нет аккаунта? &nbsp;
            <a
              className="font-medium text-gray-900 cursor-pointer"
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
