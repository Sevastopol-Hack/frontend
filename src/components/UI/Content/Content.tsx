import { Button, Spinner } from "@material-tailwind/react";
import { FC, useEffect, useState } from "react";
import { generatePath, Link, useNavigate } from "react-router-dom";
import RoutePaths from "../../../router/Routes";
import InfiniteScroll from "react-infinite-scroll-component";
import { Table } from "../Table/Table";
import ResumesService, { Resume } from "../../../API/ResumesService";

const Content: FC = () => {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchMoreData = async () => {
    const data = await ResumesService.search({
      experience_from: 0,
      experience_to: 100,
      limit: 10,
      skip: resumes.length,
      stack: [],
    });

    setHasMore(data.length === 10);
    setResumes(resumes.concat(data));
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <div className="flex flex-col justify-left items-left mx-10">
      <p className="text-lg mt-5">Быстрые действия</p>
      <hr className="max-w-[200px] border border-blue-gray-100 mt-2.5" />
      <div className="flex justify-left items-center gap-10 flex-row mt-6">
        <Button
          className="bg-[#13ADE7] px-10 -mb-5 md:mb-0 lg:mb-0 xl:mb-0"
          onClick={() => {
            navigate(RoutePaths.CREATE_RESUME);
          }}
        >
          Создать
        </Button>
      </div>
      <p className="text-lg mt-5">Список резюме</p>
      <hr className="max-w-[200px] border border-blue-gray-100 mt-2.5" />
      <InfiniteScroll
        dataLength={resumes.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Spinner className="w-12 h-12 m-2.5 self-center" />}
        className="!overflow-y-clip flex flex-col max-w-[500px] mt-2.5"
      >
        <Table
          items={resumes.map((resume, index) => [
            <div className="flex flex-row gap-1.5">
              <span>{index + 1}</span>
            </div>,
            <Link
              className={`link link-hover visited:text-[#A5B4C4] text-[#13ADE7] whitespace-nowrap`}
              target="_blank"
              to={generatePath(RoutePaths.RESUME, {
                id: resume._id,
              })}
            >
              {resume.fio}
            </Link>,
          ])}
          headers={["Номер", "ФИО"]}
        />
      </InfiniteScroll>
    </div>
  );
};

export default Content;
