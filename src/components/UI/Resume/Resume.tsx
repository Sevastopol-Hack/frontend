import { Typography } from "@material-tailwind/react";
import React, { FC, useEffect, useState } from "react";
import { Job } from "./Job";
import { ageStringify } from "../../../utils/ageStringify";
import ResumesService, {
  Resume as ResumeModel,
} from "../../../API/ResumesService";

interface OptionProps {
  title?: string;
  info: React.JSX.Element | string;
}

const Option: FC<OptionProps> = ({ info, title }) => {
  return (
    <div className="flex flex-row gap-2.5">
      {title && <span className="text-[#05AAE6]">{title}</span>}
      <span>{info}</span>
    </div>
  );
};

export const Resume: FC<
  ResumeModel & {
    buttons?: React.ReactNode;
  }
> = ({ fio, age, experience, jobs, stack, buttons, email, filename }) => {
  const [options, setOptions] = useState<OptionProps[]>();
  const [href, setHref] = useState<string>("");

  useEffect(() => {
    ResumesService.file(filename).then(setHref);
  }, []);

  useEffect(() => {
    setOptions([
      {
        info: (
          <a
            className={`link link-hover visited:text-black text-[#13ADE7] whitespace-nowrap`}
            target="_blank"
            href={href}
          >
            Скачать
          </a>
        ),
      },
      {
        title: "Возраст",
        info: ageStringify(age),
      },
      {
        title: "Email",
        info: (
          <a className={`link visited:text-black`} href={`mailto:${email}`}>
            {email}
          </a>
        ),
      },
      {
        title: "Опыт",
        info: ageStringify(experience, true),
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
  }, [age, experience, stack]);

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
