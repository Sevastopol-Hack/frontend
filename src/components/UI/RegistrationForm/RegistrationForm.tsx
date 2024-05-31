import {
  Button,
  Card,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useState } from "react";
import RoutePaths from "../../../router/Routes";
import { useNavigate } from "react-router-dom";
import LoginInput from "./LoginInput";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import UserService, { Role, SignupRequest } from "../../../API/UserService";
import { useSelf } from "../../../states/self";

export const RegistrationForm = () => {
  const { setUser } = useSelf();
  const navigate = useNavigate();

  const [data, setData] = useState<SignupRequest>({
    name: "",
    surname: "",
    role: "recruiter",
    password: "",
    username: "",
  });

  const roles = {
    recruiter: "Рекрутер",
    hiring_manager: "Нанимающий менеджер",
    resource_manager: "Ресурсный менеджер",
  };

  return (
    <>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Регистрация
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Введите данные для регистрации:
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <LoginInput
              description="Ваше имя:"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />

            <LoginInput
              description="Ваша фамилия:"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  surname: e.target.value,
                }))
              }
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Роль:
            </Typography>
            <Menu placement="bottom-start">
              <MenuHandler>
                <Button
                  ripple={false}
                  variant="text"
                  color="blue-gray"
                  className="flex h-10 items-center gap-2 border border-blue-gray-200 pl-3"
                >
                  {roles[data.role]}
                </Button>
              </MenuHandler>
              <MenuList className="max-h-[20rem] max-w-[18rem]">
                {Object.keys(roles).map((role, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={role}
                      className="flex "
                      onClick={() =>
                        setData((prev) => ({
                          ...prev,
                          role: role as Role,
                        }))
                      }
                    >
                      <span>{roles[role as Role]}</span>
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>

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
              caption={
                <>
                  <InformationCircleIcon className="w-5 h-5" />
                  Используйте не менее 8 символов: одну заглавную, одну строчную
                  и одну цифру.
                </>
              }
            />
          </div>

          <Button
            className="mt-6 bg-[#13ADE7]"
            fullWidth
            onClick={() => {
              UserService.signup(data)
                .catch()
                .then(() => {
                  UserService.info().catch().then(setUser);
                  navigate(RoutePaths.HOME);
                });
            }}
          >
            Зарегистрироваться
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Уже есть аккаунт? &nbsp;
            <a
              className="font-medium text-[#A5B4C4] cursor-pointer"
              onClick={() => navigate(RoutePaths.LOGIN)}
            >
              Войти
            </a>
          </Typography>
        </form>
      </Card>
    </>
  );
};
