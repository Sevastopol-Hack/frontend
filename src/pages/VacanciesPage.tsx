import { Button, Spinner, Typography } from "@material-tailwind/react";
import { FC, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import VacanciesService, {
  Vacancy as VacancyModel,
} from "../API/VacanciesService";
import { generatePath, useNavigate } from "react-router-dom";
import RoutePaths from "../router/Routes";

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

const VacanciesPage = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<VacancyModel[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchMoreData = async () => {
    const data = await VacanciesService.search({
      limit: 10,
      skip: resumes.length,
      query: "",
    });

    setHasMore(data.length === 10);
    setResumes(resumes.concat(data));
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <div className="flex flex-col justify-left items-left mx-10">
      <p className="text-lg mt-5">Быстрые действия (вакансии)</p>
      <hr className="max-w-[200px] border border-blue-gray-100 mt-2.5" />
      <div className="flex justify-left items-center gap-10 flex-row mt-6">
        <Button
          className="bg-[#13ADE7] px-10 -mb-5 md:mb-0 lg:mb-0 xl:mb-0"
          onClick={() => {
            window.open(RoutePaths.CREATE_VACANCY, "_blank");
          }}
        >
          Создать
        </Button>
      </div>

      <p className="text-lg mt-5">Список вакансий</p>
      <hr className="border border-blue-gray-100 mt-2.5" />
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
