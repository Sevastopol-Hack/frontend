import { Button, Typography } from "@material-tailwind/react";
import { FC } from "react";
import { exportCompetences } from "../../../utils/csvExport";

export interface CompetenceProps {
  title: string;
  percent: number;
}

const Competence: FC<CompetenceProps> = ({ title, percent }) => {
  const color =
    percent <= 50 ? "#A5B4C4" : percent <= 75 ? "#404040" : "#05AAE6";

  return (
    <div className="flex flex-row gap-2.5">
      <span
        className="text-white p-1"
        style={{
          background: color,
        }}
      >
        {title}
      </span>
      <Typography variant="h4" className={`text-[${color}] font-medium`}>
        {percent}
      </Typography>
    </div>
  );
};

export const CompetenceList: FC<{
  competences?: CompetenceProps[];
}> = ({ competences }) => {
  return (
    <div className="flex justify-left flex-col w-full">
      <div className="flex flex-row items-center justify-between max-w-[500px] gap-2">
        <Typography variant="h3" className="font-medium">
          Профиль компетенций
        </Typography>

        <Button
          className="bg-[#A5B4C4] mx-5 max-w-[200px] py-2"
          onClick={() => {
            competences && exportCompetences(competences);
          }}
        >
          Выгрузить
        </Button>
      </div>
      <hr className="max-w-[500px] border border-blue-gray-100 my-2.5" />
      <div className="flex flex-col gap-2.5">
        {(competences || []).map((competence, index) => (
          <Competence {...competence} key={index} />
        ))}
      </div>
      <hr className="max-w-[500px] border border-blue-gray-100 my-2.5" />
    </div>
  );
};
