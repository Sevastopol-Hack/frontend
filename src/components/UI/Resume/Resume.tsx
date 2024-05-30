import { Button, Typography } from "@material-tailwind/react";
import React, { FC } from "react";

interface OptionProps {
  title: string;
  info: React.JSX.Element | string;
}

const Option: FC<OptionProps> = ({ info, title }) => {
  return (
    <div className="flex flex-row gap-2.5">
      <span className="text-[#05AAE6]">{title}</span>
      <span>{info}</span>
    </div>
  );
};

interface JobProps {
  name: string;
  post: string;
  from: number;
  to: number;
}

const Job: FC<JobProps> = ({ name, post, from, to }) => {
  const dateFormatter = Intl.DateTimeFormat("ru", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-1">
      <span>{name}</span>
      <span>{post}</span>
      <span>
        {dateFormatter.format(from * 1000)} - {dateFormatter.format(to * 1000)}
      </span>
      <hr className="max-w-[200px] border border-blue-gray-100 my-2.5" />
    </div>
  );
};

interface CompetenceProps {
  name: string;
  percent: number;
}

const Competence: FC<CompetenceProps> = ({ name, percent }) => {
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

interface ResumeProps {
  fio: string;
  age: number;
  exp: number;
  stack: string[];
  jobs: {
    name: string;
    post: string;
    from: number;
    to: number;
  }[];
}

const getSuffix = (count: number, variants: string[]) => {
  if (count >= 5 && count <= 20) {
    return variants[0];
  } else {
    count = count % 10;
    if (count == 1) {
      return variants[1];
    } else if (count >= 2 && count <= 4) {
      return variants[2];
    } else {
      return variants[0];
    }
  }
};

const yearsVariants = ["лет", "год", "года"];
const monthsVariants = ["месяцев", "месяц", "месяца"];

const ageStringify = (age: number, month?: boolean) => {
  const months = age % 12;
  if (month) {
    age = Math.floor(age / 12);
    age %= 100;

    if (months) {
      return `${age} ${getSuffix(age, yearsVariants)} ${months} ${getSuffix(
        months,
        monthsVariants
      )}`;
    } else {
      return `${age} ${getSuffix(age, yearsVariants)}`;
    }
  } else {
    age %= 100;
    return `${age} ${getSuffix(age, yearsVariants)}`;
  }
};

export const Resume: FC<ResumeProps> = ({ fio, age, exp, jobs, stack }) => {
  const options: OptionProps[] = [
    {
      title: "Возраст",
      info: ageStringify(age),
    },
    {
      title: "Опыт",
      info: ageStringify(exp, true),
    },
    {
      title: "Стек",
      info: (
        <ul className="list-disc pl-4">
          {stack.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      ),
    },
  ];

  const competences: CompetenceProps[] = [];

  return (
    <div className="flex flex-col justify-left items-left mx-10">
      <div className="flex justify-left gap-10 flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row mt-6">
        <div className="flex justify-left flex-col md:max-w-[300px] lg:max-w-[300px] xl:max-w-[300px]">
          <Typography variant="h3">{fio}</Typography>
          <hr className="max-w-[200px] border border-blue-gray-100 my-2.5" />
          <div className="flex flex-col gap-2.5">
            {options.map((option, index) => (
              <Option {...option} key={index} />
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#05AAE6]">Работы</span>
            <div className="flex flex-col gap-2.5">
              {jobs.map((job, index) => (
                <Job {...job} key={index} />
              ))}
            </div>
          </div>
          <Button
            className="bg-[#A5B4C4] mx-10 max-w-[200px]"
            onClick={() => {}}
          >
            Редактировать
          </Button>
        </div>
        <div className="w-[2px] bg-blue-gray-100 hidden sm:hidden md:block lg:block xl:block" />
        <hr className="max-w-[500px] border border-blue-gray-100 -my-2.5 block sm:block md:hidden lg:hidden xl:hidden" />
        <div className="flex justify-left flex-col w-full">
          <div className="flex flex-row items-center justify-between max-w-[500px] gap-2">
            <Typography variant="h3" className="font-medium">
              Профиль компетенций
            </Typography>
            <Button
              className="bg-[#A5B4C4] py-1 h-fit"
              onClick={() => {}}
              style={{
                overflow: "auto !important",
              }}
            >
              Пересчитать
            </Button>
          </div>
          <hr className="max-w-[500px] border border-blue-gray-100 my-2.5" />
          <div className="flex flex-col gap-2.5">
            {competences.map((competence, index) => (
              <Competence {...competence} key={index} />
            ))}
          </div>
          <hr className="max-w-[500px] border border-blue-gray-100 my-2.5" />
        </div>
      </div>
    </div>
  );
};
