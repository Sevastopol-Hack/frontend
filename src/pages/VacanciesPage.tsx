import { Button, Input, Spinner, Typography } from "@material-tailwind/react";
import { FC, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import VacanciesService, {
  Vacancy as VacancyModel,
} from "../API/VacanciesService";
import { generatePath, useNavigate } from "react-router-dom";
import RoutePaths from "../router/Routes";
import { useDebounce } from "../hooks/useDebounce";

const Vacancy: FC<VacancyModel> = ({ title, stack, is_close, _id }) => {
  return (
    <div
      className={`bg-[${
        !is_close ? "#13ADE7" : "#A5B4C4"
      }] rounded-xl relative cursor-pointer hover:scale-[1.025] transition-[.5s] max-w-[500px] m-2.5`}
      onClick={() => {
        window.open(
          generatePath(
            is_close ? RoutePaths.EDIT_VACANCY : RoutePaths.VACANCY,
            {
              id: _id,
            }
          ),
          "_blank"
        );
      }}
    >
      <div>
        <img src={!is_close ? "/icons/layers.svg" : "/icons/snowflake.svg"} />
        <div className="absolute top-0 w-full h-full">
          <div className="p-5 text-white">
            <Typography variant="h4" className="mb-0.5">
              {title}
            </Typography>
            <span className="break-words text-ellipsis">
              {stack.join(", ")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface Query {
  query: string;
}

const VacanciesPage = () => {
  const [resumes, setResumes] = useState<VacancyModel[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [query, setQuery] = useState<Query>({
    query: "",
  });

  const fetchMoreData = async (reset?: boolean) => {
    const data = await VacanciesService.search({
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
      <p className="text-lg mt-5">Быстрые действия (вакансии)</p>
      <hr className="max-w-[200px] border border-blue-gray-100 mt-2.5" />
      <div className="flex justify-left items-center gap-10 flex-row mt-6">
        <Button
          className="bg-[#13ADE7] px-10"
          onClick={() => {
            window.open(RoutePaths.CREATE_VACANCY, "_blank");
          }}
        >
          Создать
        </Button>
      </div>

      <hr className="max-w-[200px] border border-blue-gray-100 mt-2.5" />
      <p className="text-lg mt-5">Поиск:</p>
      <Input
        size="lg"
        placeholder={"Название"}
        defaultValue={query.query}
        crossOrigin={""}
        className={`!border-t-blue-gray-200 focus:!border-t-gray-900 max-h-10 max-w-[400px] mt-2.5`}
        onChange={(e) => {
          setValue({
            query: e.target.value,
          });
        }}
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <p className="text-lg mt-5">Список вакансий</p>
      <hr className="max-w-[200px] border border-blue-gray-100 mt-5" />
      <InfiniteScroll
        dataLength={resumes.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Spinner className="w-12 h-12 m-2.5 self-center" />}
        className="!overflow-y-clip flex flex-col"
      >
        <div className="grid gap-5 mt-2.5 grid-cols-[repeat(auto-fit,minmax(300px,400px))]">
          {resumes.map((i, index) => (
            <Vacancy {...i} key={index} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default VacanciesPage;
