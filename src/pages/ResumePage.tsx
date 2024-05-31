import { useState } from "react";
import { Resume, ResumeProps } from "../components/UI/Resume/Resume";
import { useNavigate } from "react-router-dom";
import { ResumeEditor } from "../components/UI/Resume/ResumeEditor";
import { Button } from "@material-tailwind/react";
import RoutePaths from "../router/Routes";
import { CompetenceList } from "../components/UI/Resume/Competence";

const CreatePage = () => {
  const navigate = useNavigate();

  const [info, setInfo] = useState<ResumeProps>({
    fio: "Тестов Тест Тестович",
    age: 29,
    exp: 37,
    email: "example@gmail.com",
    stack: ["HTML5", "CSS3", "JS", "JavaScript/JQuery"],
    jobs: [
      {
        name: "SkyEnglish",
        post: "frontend разработчик",
        from: 1473235200,
        to: 1562489600,
      },
    ],
  });

  return (
    <div className="flex flex-col justify-left items-left mx-10">
      <div className="flex justify-left gap-10 flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row mt-6">
        <Resume
          {...info}
          buttons={
            <div className="flex flex-col gap-2">
              <Button
                className="bg-[#13ADE7] mx-10 max-w-[200px] whitespace-nowrap"
                onClick={() => {
                  console.log("TEST");
                }}
              >
                Добавить в избранное
              </Button>
              <Button
                className="bg-[#A5B4C4] mx-10 max-w-[200px]"
                onClick={() => {
                  navigate(RoutePaths.EDIT_RESUME);
                }}
              >
                Редактировать
              </Button>
            </div>
          }
        />
        <div className="w-[2px] bg-blue-gray-100 hidden sm:hidden md:block lg:block xl:block" />
        <hr className="max-w-[500px] border border-blue-gray-100 -my-2.5 block sm:block md:hidden lg:hidden xl:hidden" />
        <CompetenceList
          competences={[
            {
              name: "Java Android developer",
              percent: 52,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default CreatePage;
