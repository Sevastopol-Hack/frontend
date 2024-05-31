import { FC, useState } from "react";
import { LikeButton } from "../LikeButton/LikeButton";
import { Table } from "../Table/Table";
import { Link } from "react-router-dom";
import RoutePaths from "../../../router/Routes";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "@material-tailwind/react";

interface Resume {
  fio: string;
  url: string;
  id: string;
}

interface ResumesEditionList {
  resumes: Resume[];
  className?: string;
}

export const ResumesEditionList: FC<ResumesEditionList> = ({ className }) => {
  const [resumes, setState] = useState([
    {
      fio: "Соколов Яков Михайлович",
      id: "123",
      url: "https://example.com",
    },
  ]);

  const fetchMoreData = () => {
    setState(
      resumes.concat({
        fio: "Соколов Яков Михайлович",
        id: "123",
        url: "https://example.com",
      })
    );
  };

  return (
    <InfiniteScroll
      dataLength={resumes.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<Spinner className="w-12 h-12 m-2.5 self-center" />}
      className="!overflow-y-clip flex flex-col"
    >
      <Table
        items={resumes.map((resume, index) => [
          <div className="flex flex-row gap-1.5">
            <LikeButton className="self-center" />
            <span>{index + 1}</span>
          </div>,
          <Link
            className={`link link-hover visited:text-[#A5B4C4] text-[#13ADE7] whitespace-nowrap`}
            target="_blank"
            to={RoutePaths.EDIT_RESUME}
          >
            {resume.fio}
          </Link>,
          <a
            className={`link link-hover visited:text-[#A5B4C4] text-[#13ADE7] whitespace-nowrap`}
            target="_blank"
            href={resume.id}
          >
            скачать
          </a>,
        ])}
        headers={["Номер", "ФИО", "Резюме"]}
        className={className}
      />
    </InfiniteScroll>
  );
};
