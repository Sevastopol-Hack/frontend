import { useEffect, useState } from "react";
import { Resume, ResumeProps } from "../components/UI/Resume/Resume";
import { useNavigate, useParams } from "react-router-dom";
import { ResumeEditor } from "../components/UI/Resume/ResumeEditor";
import { Button } from "@material-tailwind/react";
import ResumesService, { Resume as ResumeSchema } from "../API/ResumesService";

const CreatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [info, setInfo] = useState<ResumeSchema>({
    age: 0,
    email: "",
    experience: 0,
    fio: "",
    jobs: [],
    stack: [],
    _id: "",
    created_at: 0,
    filename: "",
    percent: 0,
  });

  useEffect(() => {
    ResumesService.get(id!).then(setInfo);
  }, []);

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
                  ResumesService.update(info).then(() => {
                    window.close();
                  });
                }}
              >
                Сохранить
              </Button>
              <Button
                className="bg-[#A5B4C4] mx-10 max-w-[200px]"
                onClick={() => {
                  window.close();
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
