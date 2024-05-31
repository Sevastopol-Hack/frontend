import { useEffect, useState } from "react";
import { generatePath, Link, useParams } from "react-router-dom";
import VacanciesService, { Vacancy } from "../API/VacanciesService";
import { Button, Typography } from "@material-tailwind/react";
import { Table } from "../components/UI/Table/Table";
import { Resume } from "../API/ResumesService";
import RoutePaths from "../router/Routes";

const VacancyPage = () => {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState<Vacancy>({
    _id: "",
    is_close: false,
    stack: [],
    title: "",
  });

  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    VacanciesService.match(id!).then(setResumes);
    VacanciesService.get(id!).then(setVacancy);
  }, []);

  return (
    <div className="flex flex-col justify-left items-left mx-10 mt-2.5">
      <div className="flex flex-row">
        <Typography variant="h4" className="text-[#05AAE6]">
          {vacancy.title}
        </Typography>
        <Button
          className="bg-[#A5B4C4] mx-10 max-w-[200px] py-0"
          onClick={() => {
            window.open(
              generatePath(RoutePaths.EDIT_VACANCY, {
                id: vacancy._id,
              }),
              "_blank"
            );
          }}
        >
          Редактировать
        </Button>
      </div>
      <hr className="max-w-[200px] border border-blue-gray-100 mt-2.5" />
      <Typography variant="h5" className="text-[#A5B4C4] mt-2.5">
        Стек
      </Typography>
      <div className="flex flex-row gap-2.5 max-w-[500px] flex-wrap mt-2.5">
        {vacancy.stack.map((tech, index) => (
          <>
            <span
              key={index}
              className="rounded-lg bg-[#05AAE6] px-2.5 py-0.5 text-white"
            >
              {tech}
            </span>
          </>
        ))}
      </div>
      <hr className="max-w-[200px] border border-blue-gray-100 mt-2.5" />
      <Typography variant="h5" className="text-[#A5B4C4] mt-2.5">
        Кандидаты
      </Typography>
      <Table
        items={resumes.map(({ percent, ...resume }, index) => {
          const color =
            percent <= 50 ? "#A5B4C4" : percent <= 75 ? "#404040" : "#05AAE6";
          return [
            <div className="flex flex-row gap-1.5">
              <span>{index + 1}</span>
            </div>,
            <Link
              className={`link link-hover visited:text-[#A5B4C4] text-[#13ADE7] whitespace-nowrap`}
              target="_blank"
              to={generatePath(RoutePaths.RESUME, {
                id: resume._id,
              })}
            >
              {resume.fio}
            </Link>,
            <span className={`text-[${color}]`}>{percent}</span>,
          ];
        })}
        headers={["Номер", "ФИО", "Баллы"]}
        className="max-w-[600px] mt-2.5"
      />
    </div>
  );
};

export default VacancyPage;
