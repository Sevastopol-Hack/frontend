import { Button, Typography } from "@material-tailwind/react";
import React, { FC, useEffect, useState } from "react";
import Selector from "../Selector/Selector";
import { MonthSelector } from "../MonthSelector/MonthSelector";

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

interface InputProps {
  type?: React.HTMLInputTypeAttribute;
  value?: any;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Editable: FC<InputProps> = ({ placeholder, type, value, onChange }) => {
  return (
    <div className="flex flex-row gap-2.5 whitespace-nowrap">
      <span>{placeholder}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="outline-none text-[#05AAE6] w-full"
      />
    </div>
  );
};

interface JobEditorProps {
  value: JobProps;
  onChange?: (value: JobProps) => void;
}

const EditableJob: FC<JobEditorProps> = ({ onChange, value }) => {
  onChange ??= (e) => {};

  return (
    <div className="flex flex-col gap-1">
      <Editable
        placeholder="Название компании"
        value={value.name}
        onChange={(e) => {
          onChange({
            ...value,
            name: e.target.value,
          });
        }}
      />
      <Editable
        placeholder="Должность"
        value={value.post}
        onChange={(e) => {
          onChange({
            ...value,
            post: e.target.value,
          });
        }}
      />
      <div className="flex flex-row gap-2.5 whitespace-nowrap items-center">
        <span>Начало работы</span>
        <MonthSelector
          time={value.from}
          onChange={(time) => {
            onChange({
              ...value,
              from: time,
            });
          }}
        />
      </div>
      <div className="flex flex-row gap-2.5 whitespace-nowrap items-center mt-2">
        <span>Конец работы</span>
        <MonthSelector
          time={value.to}
          onChange={(time) => {
            onChange({
              ...value,
              to: time,
            });
          }}
        />
      </div>
      <hr className="max-w-[500px] border border-blue-gray-100 my-2.5" />
    </div>
  );
};

export const Resume = () => {
  const [{ fio, age, exp, jobs, stack }, setInfo] = useState<ResumeProps>({
    fio: "Тестов Тест Тестович",
    age: 29,
    exp: 37,
    stack: [
      "HTML5",
      "CSS3",
      "JS",
      "JavaScript/JQuery",
      "адаптивная вёрстка",
      "создание HTML-страницы сайта на основе дизайн-макетов",
      "вёрстка сайтов и шаблонов для CMS",
      "привязка к пользовательскому интерфейсу скриптов, которые обеспечивают визуализацию и анимацию страниц сайта",
      "обеспечение необходимого уровня пользовательского интерфейса (UI — User Interface) и опыта взаимодействия (UX — User Experience)",
      "CSS-фреймворки",
      "кросс-браузерная вёрстка",
    ],
    jobs: [
      {
        name: "SkyEnglish",
        post: "frontend разработчик",
        from: 1473235200,
        to: 1562489600,
      },
    ],
  });

  const [editing, setEditing] = useState<boolean>(false);

  const [options, setOptions] = useState<OptionProps[]>();

  const [editable, setEditable] = useState<ResumeProps>();

  useEffect(() => {
    setOptions([
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
    ]);
  }, [age, exp, stack]);

  const competences: CompetenceProps[] = [];
  return (
    <div className="flex flex-col justify-left items-left mx-10">
      <div className="flex justify-left gap-10 flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row mt-6">
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
          {editing ? (
            <div className="flex flex-col gap-2">
              <Button
                className="bg-[#13ADE7] mx-10 max-w-[200px]"
                onClick={() => {
                  setEditing(false);
                  setInfo(editable!);
                }}
              >
                Сохранить
              </Button>
              <Button
                className="bg-[#A5B4C4] mx-10 max-w-[200px]"
                onClick={() => {
                  setEditing(false);
                }}
              >
                Отменить
              </Button>
            </div>
          ) : (
            <Button
              className="bg-[#A5B4C4] mx-10 max-w-[200px]"
              onClick={() => {
                setEditing(true);
                setEditable({ fio, age, exp, jobs, stack });
              }}
            >
              Редактировать
            </Button>
          )}
        </div>
        <div className="w-[2px] bg-blue-gray-100 hidden sm:hidden md:block lg:block xl:block" />
        <hr className="max-w-[500px] border border-blue-gray-100 -my-2.5 block sm:block md:hidden lg:hidden xl:hidden" />
        {editing ? (
          <div className="flex justify-left flex-col w-full max-w-[500px]">
            <Typography variant="h3" className="font-medium text-[#A5B4C4]">
              Редактировать резюме
            </Typography>
            <hr className="max-w-[500px] border border-blue-gray-100 my-2.5" />
            <Editable
              placeholder="ФИО:"
              value={editable?.fio}
              onChange={(e) =>
                setEditable((prev) => ({
                  ...prev!,
                  fio: e.target.value,
                }))
              }
            />
            <Editable
              placeholder="Возраст:"
              value={editable?.age}
              type="number"
              onChange={(e) =>
                setEditable((prev) => ({
                  ...prev!,
                  age: parseInt(e.target.value),
                }))
              }
            />
            <Editable
              placeholder="Опыт работы:"
              value={editable?.exp}
              type="number"
              onChange={(e) =>
                setEditable((prev) => ({
                  ...prev!,
                  exp: parseInt(e.target.value),
                }))
              }
            />
            <Selector
              value={editable?.stack}
              className="mt-2.5"
              onOptionsChanged={(stack) => {
                setEditable((prev) => ({
                  ...prev!,
                  stack,
                }));
              }}
            />
            <hr className="max-w-[500px] border border-blue-gray-100 my-2.5" />
            <Typography variant="h5" className="font-medium">
              Предыдущие места работы
            </Typography>
            {editable?.jobs.map((job, index) => (
              <EditableJob
                value={job}
                key={index}
                onChange={(value) => {
                  setEditable((prev) => ({
                    ...prev!,
                    jobs: editable.jobs.map((job, ind) => {
                      if (ind === index) {
                        return value;
                      }
                      return job;
                    }),
                  }));
                }}
              />
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};
