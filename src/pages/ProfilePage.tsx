import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useSelf } from "../states/self";

const ProfilePage = () => {
  const { user } = useSelf();

  const roles = {
    recruiter: "Рекрутер",
    hiring_manager: "Нанимающий менеджер",
    resource_manager: "Ресурсный менеджер",
  };

  const details: { [key: string]: string } = {
    Имя: user!.name,
    Фамилия: user!.surname,
    Роль: roles[user!.role],
    "Имя пользователя": user!.username,
  };

  return (
    <div className="flex flex-col justify-left items-left mx-10 mt-5">
      <Card color="transparent" className="p-5">
        <CardHeader
          color="transparent"
          shadow={false}
          floated={false}
          className="mx-0 mt-0 mb-1 flex items-center justify-between gap-4"
        >
          <Typography variant="h3" color="black">
            Профиль
          </Typography>
        </CardHeader>
        <hr className="max-w-[200px] border border-blue-gray-100 mt-2.5" />
        <CardBody className="p-0 mt-2.5">
          <ul className="flex flex-col gap-4 p-0">
            {Object.keys(details).map((el, key) => (
              <li key={key} className="flex items-center gap-4">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="font-semibold"
                >
                  {el}:
                </Typography>
                <Typography variant="h4" className="font-normal text-[#A5B4C4]">
                  {details[el]}
                </Typography>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProfilePage;
