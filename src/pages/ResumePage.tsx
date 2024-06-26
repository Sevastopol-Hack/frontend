import { useEffect, useState } from "react";
import { Resume } from "../components/UI/Resume/Resume";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { ResumeEditor } from "../components/UI/Resume/ResumeEditor";
import { Button } from "@material-tailwind/react";
import RoutePaths from "../router/Routes";
import {
  CompetenceList,
  CompetenceProps,
} from "../components/UI/Resume/Competence";
import ResumesService, { Resume as ResumeSchema } from "../API/ResumesService";
import { exportResume } from "../utils/csvExport";

const ResumePage = () => {
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

  const [competences, setCompetences] = useState<CompetenceProps[]>([]);

  useEffect(() => {
    ResumesService.get(id!).then(setInfo);
    ResumesService.match(id!).then(setCompetences);
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
                  window.open(
                    generatePath(RoutePaths.EDIT_RESUME, {
                      id: info._id,
                    }),
                    "_blank"
                  );
                }}
              >
                Редактировать
              </Button>
              <Button
                className="bg-[#A5B4C4] mx-10 max-w-[200px]"
                onClick={() => {
                  exportResume(info);
                }}
              >
                Выгрузить
              </Button>
            </div>
          }
        />
        <div className="w-[2px] bg-blue-gray-100 hidden sm:hidden md:block lg:block xl:block" />
        <hr className="max-w-[500px] border border-blue-gray-100 -my-2.5 block sm:block md:hidden lg:hidden xl:hidden" />
        <CompetenceList competences={competences} />
      </div>
    </div>
  );
};

export default ResumePage;
