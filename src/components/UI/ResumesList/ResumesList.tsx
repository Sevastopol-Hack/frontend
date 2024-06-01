import { FC, useState } from "react";
import { Table } from "../Table/Table";
import { generatePath, Link } from "react-router-dom";
import RoutePaths from "../../../router/Routes";

interface Resume {
  fio: string;
  filename: string;
  _id: string;
}

interface ResumesEditionList {
  resumes: Resume[];
  className?: string;
}

export const ResumesEditionList: FC<ResumesEditionList> = ({
  resumes,
  className,
}) => {
  console.log(resumes);
  return (
    <Table
      items={resumes.map((resume, index) => [
        <div className="flex flex-row gap-1.5">
          <span>{index + 1}</span>
        </div>,
        <Link
          className={`link link-hover visited:text-[#A5B4C4] text-[#13ADE7] whitespace-nowrap`}
          target="_blank"
          to={generatePath(RoutePaths.EDIT_RESUME, {
            id: resume._id,
          })}
        >
          {resume.fio || "Без имени"}
        </Link>,
        <a
          className={`link link-hover visited:text-[#A5B4C4] text-[#13ADE7] whitespace-nowrap`}
          target="_blank"
          href={resume.filename}
        >
          скачать
        </a>,
      ])}
      headers={["Номер", "ФИО", "Резюме"]}
      className={className}
    />
  );
};
