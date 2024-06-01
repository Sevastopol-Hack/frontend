import { FC, useState } from "react";
import { Table } from "../Table/Table";
import { generatePath, Link } from "react-router-dom";
import RoutePaths from "../../../router/Routes";
import { isValid } from "../../../utils/resumeValidity";
import { Resume } from "../../../API/ResumesService";

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
    <div className="overflow-auto">
      <Table
        items={resumes.map((resume, index) => ({
          elements: [
            <div className="flex flex-row gap-1.5">
              <span>{index + 1}</span>
            </div>,
            <Link
              className={`link link-hover visited:text-black text-[#13ADE7] whitespace-nowrap`}
              target="_blank"
              to={generatePath(RoutePaths.EDIT_RESUME, {
                id: resume._id,
              })}
            >
              {resume.fio || "Без имени"}
            </Link>,
            <a
              className={`link link-hover visited:text-black text-[#13ADE7] whitespace-nowrap`}
              target="_blank"
              href={resume.filename}
            >
              скачать
            </a>,
          ],
          valid: isValid(resume),
        }))}
        headers={["Номер", "ФИО", "Резюме"]}
        className={className}
      />
    </div>
  );
};
