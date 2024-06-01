import { Button, Spinner } from "@material-tailwind/react";
import { FC, useEffect, useState } from "react";
import { generatePath, Link, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import RoutePaths from "../router/Routes";
import { Table } from "../components/UI/Table/Table";
import ResumesService, { Resume } from "../API/ResumesService";
import Range from "../components/UI/Range/Range";
import Selector from "../components/UI/Selector/Selector";
import { useDebounce } from "../hooks/useDebounce";

interface Query {
  experience_from: number;
  experience_to: number;
  stack: string[];
}

const HomePage = () => {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [query, setQuery] = useState<Query>({
    experience_from: 0,
    experience_to: 1200,
    stack: [],
  });

  const fetchMoreData = async (reset?: boolean) => {
    const data = await ResumesService.search({
      ...query,
      limit: 10,
      skip: reset ? 0 : resumes.length,
    });

    setHasMore(data.length === 10);
    setResumes(reset ? data : resumes.concat(data));
  };

  useEffect(() => {
    fetchMoreData(true);
  }, [query]);

  const setValue = useDebounce((current: Partial<Query>) => {
    setQuery((prev) => ({
      ...prev,
      ...current,
    }));
  }, 1000);

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
      <p className="text-lg mt-5 mb-1">Опыт</p>
      <Range
        max={1200}
        min={0}
        from={0}
        to={1200}
        step={1}
        className="max-w-[500px]"
        onChange={(experience_from, experience_to) => {
          setValue({
            experience_from,
            experience_to,
          });
        }}
      />
      <p className="text-lg mb-1">Стек</p>
      <Selector
        className="max-w-[500px]"
        onOptionsChanged={(stack) => {
          setValue({
            stack,
          });
        }}
      />
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
            <a
              className={`link link-hover visited:text-[#A5B4C4] text-[#13ADE7] whitespace-nowrap`}
              target="_blank"
              href={resume.filename}
            >
              скачать
            </a>,
          ])}
          headers={["Номер", "ФИО", "Резюме"]}
        />
      </InfiniteScroll>
    </div>
  );
};

export default HomePage;
