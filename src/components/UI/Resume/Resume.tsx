import { Typography } from "@material-tailwind/react";
import React, { FC, useEffect, useState } from "react";
import { Job } from "./Job";

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

export interface ResumeProps {
  fio: string;
  age: number;
  exp: number;
  email: string;
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
    const count = age % 100;

    if (months) {
      return `${age} ${getSuffix(count, yearsVariants)} ${months} ${getSuffix(
        months,
        monthsVariants
      )}`;
    } else {
      return `${age} ${getSuffix(count, yearsVariants)}`;
    }
  } else {
    const count = age % 100;
    return `${age} ${getSuffix(count, yearsVariants)}`;
  }
};

export const Resume: FC<
  ResumeProps & {
    buttons?: React.ReactNode;
  }
> = ({ fio, age, exp, jobs, stack, buttons, email }) => {
  const [options, setOptions] = useState<OptionProps[]>();

  useEffect(() => {
    setOptions([
      {
        title: "Возраст",
        info: ageStringify(age),
      },
      {
        title: "Email",
        info: (
          <a
            className={`link visited:text-[#A5B4C4] whitespace-nowrap`}
            href={`mailto:${email}`}
          >
            {email}
          </a>
        ),
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
    ]);
  }, [age, exp, stack]);

  return (
    <div className="flex justify-left flex-col md:max-w-[300px] lg:max-w-[300px] xl:max-w-[300px]">
      <Typography variant="h3">{fio}</Typography>
      <hr className="max-w-[200px] border border-blue-gray-100 my-2.5" />
      <div className="flex flex-col gap-2.5">
        {(options || []).map((option, index) => (
          <Option {...option} key={index} />
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[#05AAE6]">Предыдущие места работы</span>
        <div className="flex flex-col gap-2.5">
          {jobs.map((job, index) => (
            <Job {...job} key={index} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">{buttons}</div>
    </div>
  );
};
