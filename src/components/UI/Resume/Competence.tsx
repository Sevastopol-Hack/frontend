import { Typography } from "@material-tailwind/react";
import { FC } from "react";

interface CompetenceProps {
  name: string;
  percent: number;
}

export const Competence: FC<CompetenceProps> = ({ name, percent }) => {
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
        {name}
      </span>
      <Typography variant="h4" className={`text-[${color}] font-medium`}>
        {percent}%
      </Typography>
    </div>
  );
};
