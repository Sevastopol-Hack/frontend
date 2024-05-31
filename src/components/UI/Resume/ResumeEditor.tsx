import { Typography } from "@material-tailwind/react";
import { Editable } from "./Editable";
import Selector from "../Selector/Selector";
import { EditableJob } from "./Job";
import { Dispatch, FC, SetStateAction } from "react";
import { Resume } from "../../../API/ResumesService";

export const ResumeEditor: FC<
  Resume & {
    onChange?: Dispatch<SetStateAction<Resume>>;
  }
> = ({ onChange, ...editable }) => {
  onChange ??= () => {};

  return (
    <div className="flex justify-left flex-col w-full max-w-[500px]">
      <Typography variant="h3" className="font-medium text-[#A5B4C4]">
        Редактировать резюме
      </Typography>
      <hr className="max-w-[500px] border border-blue-gray-100 my-2.5" />
      <Editable
        placeholder="ФИО:"
        value={editable?.fio}
        onChange={(e) =>
          onChange((prev) => ({
            ...prev!,
            fio: e.target.value,
          }))
        }
      />
      <Editable
        placeholder="Email:"
        value={editable?.email}
        type="email"
        onChange={(e) =>
          onChange((prev) => ({
            ...prev!,
            email: e.target.value,
          }))
        }
      />
      <Editable
        placeholder="Возраст:"
        value={editable?.age}
        type="number"
        onChange={(e) =>
          onChange((prev) => ({
            ...prev!,
            age: parseInt(e.target.value),
          }))
        }
      />
      <Editable
        placeholder="Опыт работы:"
        value={editable?.experience}
        type="number"
        onChange={(e) =>
          onChange((prev) => ({
            ...prev!,
            experience: parseInt(e.target.value),
          }))
        }
      />
      <Selector
        value={editable?.stack}
        className="mt-2.5"
        onOptionsChanged={(stack) => {
          onChange((prev) => ({
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
            onChange((prev) => ({
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
  );
};
