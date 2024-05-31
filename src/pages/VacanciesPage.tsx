import { Button, Spinner, Typography } from "@material-tailwind/react";
import { FC, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface VacancyProps {
  name: string;
  stack: string[];
  active?: boolean;
}

const Vacancy: FC<VacancyProps> = ({ name, stack, active }) => {
  return (
    <div
      className={`bg-[${
        active ? "#13ADE7" : "#A5B4C4"
      }] rounded-xl relative cursor-pointer hover:scale-[1.025] transition-[.5s] max-w-[500px]`}
    >
      <div>
        <img src={active ? "/icons/layers.svg" : "/icons/snowflake.svg"} />
        <div className="absolute top-0 w-full h-full">
          <div className="p-5 text-white">
            <Typography variant="h4" className="mb-0.5">
              {name}
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
  const [state, setState] = useState([
    {
      name: "Java Developer",
      stack: ["HTML", "CSS", "JAVA", "JS"],
      active: true,
    },
  ]);

  const fetchMoreData = () => {
    setState(
      state.concat({
        name: "Java Developer",
        stack: ["HTML", "CSS", "JAVA", "JS"],
        active: true,
      })
    );
  };

  return (
    <div className="flex flex-col justify-left items-left mx-10">
      <p className="text-lg mt-5">Быстрые действия (вакансии)</p>
      <hr className="max-w-[200px] border border-blue-gray-100 mt-2.5" />
      <div className="flex justify-left items-center gap-10 flex-row mt-6">
        <Button
          className="bg-[#13ADE7] px-10 -mb-5 md:mb-0 lg:mb-0 xl:mb-0"
          onClick={() => {}}
        >
          Создать
        </Button>
      </div>

      <p className="text-lg mt-5">Список вакансий</p>
      <hr className="border border-blue-gray-100 mt-2.5" />
      <InfiniteScroll
        dataLength={state.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<Spinner className="w-12 h-12 m-2.5 self-center" />}
        className="!overflow-y-clip flex flex-col"
      >
        <div className="grid gap-5 mt-2.5 grid-cols-[repeat(auto-fit,minmax(300px,400px))]">
          {state.map((i, index) => (
            <Vacancy {...i} key={index} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default VacanciesPage;
