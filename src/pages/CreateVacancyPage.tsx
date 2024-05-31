import { Button, Input, Typography } from "@material-tailwind/react";
import Selector from "../components/UI/Selector/Selector";
import VacanciesService, { Vacancy } from "../API/VacanciesService";
import { useState } from "react";

const CreateVacancyPage = () => {
  const [vacancy, setVacancy] = useState<Omit<Vacancy, "_id" | "is_close">>({
    title: "",
    stack: [],
  });

  return (
    <div className="flex flex-col justify-left items-left mx-10 mt-6 max-w-[400px]">
      <Typography variant="h4">Создать вакансию</Typography>
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
      <Button
        className="bg-[#13ADE7] px-10 -mb-5 md:mb-0 lg:mb-0 xl:mb-0 mt-5"
        onClick={() => {
          VacanciesService.create(vacancy).then(() => {
            window.close();
          });
        }}
      >
        Сохранить
      </Button>
    </div>
  );
};

export default CreateVacancyPage;
