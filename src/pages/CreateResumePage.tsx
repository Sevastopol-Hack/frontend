import { useState } from "react";
import { ResumesEditionList } from "../components/UI/ResumesList/ResumesList";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import { FileDialog } from "../components/UI/FileDialog/FileDialog";

const CreateResumePage = () => {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <div className="flex flex-col justify-left items-left mx-10 mt-6">
      <Typography variant="h4">Загрузить резюме</Typography>
      <hr className="max-w-[200px] border border-blue-gray-100 mt-2.5" />
      <FileDialog
        multiple
        accept="application/msword, application/pdf"
        inputClassName="min-w-[400px]"
      />
      <Button
        className="bg-[#A5B4C4] max-w-[200px] mt-2.5 py-2"
        onClick={() => setLoaded(true)}
      >
        Загрузить
      </Button>
      {loaded ? (
        <>
          <p className="text-lg mt-5">Список резюме</p>
          <hr className="max-w-[200px] border border-blue-gray-100 mt-2.5" />
          <ResumesEditionList
            resumes={[
              {
                fio: "Соколов Яков Михайлович",
                id: "123",
                url: "https://example.com",
              },
            ]}
            className="max-w-[800px] min-w-[400px] mt-2.5"
          />
        </>
      ) : (
        <Spinner className="w-12 h-12 m-2.5 self-center" />
      )}
    </div>
  );
};

export default CreateResumePage;
