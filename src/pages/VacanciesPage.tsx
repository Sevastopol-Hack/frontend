import { Button, Typography } from "@material-tailwind/react";
import { FC } from "react";

interface VacancyProps {
  name: string;
  stack: string[];
  active?: boolean;
}

const Vacancy: FC<VacancyProps> = ({ name, stack, active }) => {
  return (
    <div
      className={`bg-[${
        active ? "#13ADE7" : "#A5B4C4"
      }] rounded-xl relative cursor-pointer mb-5 hover:scale-[1.025] transition-[.5s] max-w-[500px]`}
    >
      <div>
        <img src={active ? "/icons/layers.svg" : "/icons/snowflake.svg"} />
        <div className="absolute top-0 w-full h-full">
          <div className="p-5 text-white">
            <Typography variant="h4" className="mb-0.5">
              {name}
            </Typography>
            <span className="break-words text-ellipsis">
              {stack.join(", ")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const VacanciesPage = () => {
  return (
    <div className="flex flex-col justify-left items-left mx-10">
      <p className="text-lg mt-5">Быстрые действия (вакансии)</p>
      <hr className="max-w-[200px] border border-blue-gray-100 mt-2.5" />
      <div className="flex justify-left items-center gap-10 flex-row mt-6">
        <Button
          className="bg-[#13ADE7] px-10 -mb-5 md:mb-0 lg:mb-0 xl:mb-0"
          onClick={() => {}}
        >
          Создать
        </Button>
      </div>

      <p className="text-lg mt-5">Список вакансий</p>
      <hr className="border border-blue-gray-100 mt-2.5" />
      <div className="columns-sm mt-2.5">
        <Vacancy name="Java Developer" stack={["HTML", "CSS", "JAVA", "JS"]} />
        <Vacancy
          name="Java Developer"
          stack={["HTML", "CSS", "JAVA", "JS"]}
          active
        />
        <Vacancy name="Java Developer" stack={["HTML", "CSS", "JAVA", "JS"]} />
        <Vacancy name="Java Developer" stack={["HTML", "CSS", "JAVA", "JS"]} />
        <Vacancy name="Java Developer" stack={["HTML", "CSS", "JAVA", "JS"]} />
        <Vacancy name="Java Developer" stack={["HTML", "CSS", "JAVA", "JS"]} />
        <Vacancy name="Java Developer" stack={["HTML", "CSS", "JAVA", "JS"]} />
        <Vacancy name="Java Developer" stack={["HTML", "CSS", "JAVA", "JS"]} />
      </div>
    </div>
  );
};

export default VacanciesPage;
