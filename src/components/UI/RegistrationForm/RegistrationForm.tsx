import {
  Button,
  Card,
  Checkbox,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { DatePicker } from "../DatePicker/DatePicker";
import { useState } from "react";
import RoutePaths from "../../../router/Routes";
import { useNavigate } from "react-router-dom";
import LoginInput from "./LoginInput";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

type Role = "recruiter" | "hiring_manager" | "resource_manager";
interface SignupRequest {
  name: string;
  surname: string;
  phone: string;
  role: Role;
  date_of_birth: string;
  email: string;
  password: string;
  region: string;
}

export const RegistrationForm = () => {
  const navigate = useNavigate();

  const [checked, setChecked] = useState<boolean>(false);

  const [data, setData] = useState<SignupRequest>({
    name: "",
    surname: "",
    region: "",
    role: "recruiter",
    date_of_birth: "",
    email: "",
    password: "",
    phone: "",
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
              caption={
                <>
                  <InformationCircleIcon className="w-5 h-5" />
                  Используйте не менее 8 символов: одну заглавную, одну строчную
                  и одну цифру.
                </>
              }
            />
          </div>

          <Checkbox
            crossOrigin={""}
            onChange={(e) => setChecked(e.target.checked)}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                <span>
                  Я согласен с &nbsp;
                  <span
                    className="font-medium transition-colors text-tg-accent hover:text-gray-900"
                    onClick={(e) => {
                      window.open("/eula.pdf", "_blank");
                      e.preventDefault();
                    }}
                  >
                    Условиями обработки персональных данных
                  </span>
                </span>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />

          <Button className="mt-6 bg-[#13ADE7]" fullWidth onClick={() => {}}>
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
