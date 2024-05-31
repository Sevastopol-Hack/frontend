import { FC } from "react";
import { Editable } from "./Editable";
import { MonthSelector } from "../MonthSelector/MonthSelector";

interface JobProps {
  name: string;
  post: string;
  start: number;
  end: number;
}

export const Job: FC<JobProps> = ({ name, post, start, end }) => {
  const dateFormatter = Intl.DateTimeFormat("ru", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-1">
      <span>{name}</span>
      <span>{post}</span>
      <span>
        {dateFormatter.format(start * 1000)} -{" "}
        {dateFormatter.format(end * 1000)}
      </span>
      <hr className="max-w-[200px] border border-blue-gray-100 my-2.5" />
    </div>
  );
};

interface JobEditorProps {
  value: JobProps;
  onChange?: (value: JobProps) => void;
}

export const EditableJob: FC<JobEditorProps> = ({ onChange, value }) => {
  onChange ??= () => {};

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
          time={value.start}
          onChange={(time) => {
            onChange({
              ...value,
              start: time,
            });
          }}
        />
      </div>
      <div className="flex flex-row gap-2.5 whitespace-nowrap items-center mt-2">
        <span>Конец работы</span>
        <MonthSelector
          time={value.end}
          onChange={(time) => {
            onChange({
              ...value,
              end: time,
            });
          }}
        />
      </div>
      <hr className="max-w-[500px] border border-blue-gray-100 my-2.5" />
    </div>
  );
};
