import { Button } from "@material-tailwind/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../../../router/Routes";

const Content: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-left items-left mx-10">
      <p className="text-lg mt-5">Быстрые действия</p>
      <hr className="max-w-[200px] border border-blue-gray-100 mt-2.5" />
      <div className="flex justify-left items-center gap-10 sm:flex-col flex-col md:flex-row lg:flex-row xl:flex-row mt-6">
        <Button
          className="bg-[#13ADE7] px-10 -mb-5 md:mb-0 lg:mb-0 xl:mb-0"
          onClick={() => {
            navigate(RoutePaths.CREATE);
          }}
        >
          Создать
        </Button>
        <Button
          className="bg-[#A5B4C4] px-10 -mb-5 md:mb-0 lg:mb-0 xl:mb-0"
          onClick={() => {}}
        >
          Редактировать
        </Button>
        <Button className="bg-[#A5B4C4] px-10" onClick={() => {}}>
          Выбрать
        </Button>
      </div>
    </div>
  );
};

export default Content;
