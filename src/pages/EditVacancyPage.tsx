import { Button, Checkbox, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import VacanciesService, { Vacancy } from "../API/VacanciesService";
import Selector from "../components/UI/Selector/Selector";
import { useParams } from "react-router-dom";

const EditVacancyPage = () => {
  const { id } = useParams();

  const [vacancy, setVacancy] = useState<Vacancy>({
    title: "",
    stack: [],
    _id: "",
    is_close: false,
  });

  useEffect(() => {
    VacanciesService.get(id!).then(setVacancy);
  }, []);

  return (
    <div className="flex flex-col justify-left items-left mx-10 mt-6 max-w-[400px]">
      <Typography variant="h4">Редактировать вакансию</Typography>
      <hr className="max-w-[200px] border border-blue-gray-100 mt-2.5" />
      <Input
        value={vacancy?.title}
        onChange={(e) =>
          setVacancy((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
        size="lg"
        placeholder="Название"
        crossOrigin={""}
        className={` !border-t-blue-gray-200 focus:!border-t-gray-900 max-h-10 mt-2.5`}
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <Selector
        className="mt-5"
        value={vacancy.stack}
        onOptionsChanged={(stack) =>
          setVacancy((prev) => ({
            ...prev,
            stack,
          }))
        }
      />
      <Checkbox
        crossOrigin=""
        color="blue"
        label="Открытая вакансия"
        checked={!vacancy.is_close}
        onChange={(e) => {
          setVacancy((prev) => ({
            ...prev,
            is_close: !e.target.checked,
          }));
        }}
      />
      <div className="flex flex-row gap-2 mt-2.5">
        <Button
          className="bg-[#13ADE7] mx-10 max-w-[200px]"
          onClick={() => {
            VacanciesService.update(vacancy).then(() => {
              window.close();
            });
          }}
        >
          Сохранить
        </Button>
        <Button
          className="bg-[#A5B4C4] mx-10 max-w-[200px]"
          onClick={() => {
            window.close();
          }}
        >
          Отменить
        </Button>
      </div>
    </div>
  );
};

export default EditVacancyPage;
