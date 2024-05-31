import { useState } from "react";
import { Resume, ResumeProps } from "../components/UI/Resume/Resume";
import { useNavigate } from "react-router-dom";
import { ResumeEditor } from "../components/UI/Resume/ResumeEditor";
import { Button } from "@material-tailwind/react";

const CreatePage = () => {
  const navigate = useNavigate();

  const [info, setInfo] = useState<ResumeProps>({
    fio: "Тестов Тест Тестович",
    age: 29,
    exp: 37,
    stack: [
      "HTML5",
      "CSS3",
      "JS",
      "JavaScript/JQuery",
      "адаптивная вёрстка",
      "создание HTML-страницы сайта на основе дизайн-макетов",
      "вёрстка сайтов и шаблонов для CMS",
      "привязка к пользовательскому интерфейсу скриптов, которые обеспечивают визуализацию и анимацию страниц сайта",
      "обеспечение необходимого уровня пользовательского интерфейса (UI — User Interface) и опыта взаимодействия (UX — User Experience)",
      "CSS-фреймворки",
      "кросс-браузерная вёрстка",
    ],
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
                className="bg-[#13ADE7] mx-10 max-w-[200px]"
                onClick={() => {
                  console.log("TEST");
                }}
              >
                Сохранить
              </Button>
              <Button
                className="bg-[#A5B4C4] mx-10 max-w-[200px]"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Отменить
              </Button>
            </div>
          }
        />
        <div className="w-[2px] bg-blue-gray-100 hidden sm:hidden md:block lg:block xl:block" />
        <hr className="max-w-[500px] border border-blue-gray-100 -my-2.5 block sm:block md:hidden lg:hidden xl:hidden" />
        <ResumeEditor {...info} onChange={setInfo} />
      </div>
    </div>
  );
};

export default CreatePage;
