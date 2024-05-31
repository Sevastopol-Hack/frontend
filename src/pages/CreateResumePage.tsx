import { useState } from "react";
import { ResumesEditionList } from "../components/UI/ResumesList/ResumesList";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import { FileDialog } from "../components/UI/FileDialog/FileDialog";
import ResumesService, { Summary } from "../API/ResumesService";

const CreateResumePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [files, setFiles] = useState<FileList>();
  const [summary, setSummary] = useState<Summary>();

  const Upload = async () => {
    setLoading(true);
    const id = await ResumesService.upload(files!);
    setSummary(await ResumesService.summary(id));
    setLoaded(true);
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-left items-left mx-10 mt-6">
      <Typography variant="h4">Загрузить резюме</Typography>
      <hr className="max-w-[200px] border border-blue-gray-100 mt-2.5" />
      <FileDialog
        multiple
        accept="application/msword, application/pdf"
        inputClassName="min-w-[400px]"
        onChange={(files) => files && setFiles(files)}
      />
      <Button
        className="bg-[#13ADE7] max-w-[200px] mt-2.5 py-2"
        onClick={() => {
          if (files && files.length > 0) {
            Upload();
          }
        }}
      >
        Загрузить
      </Button>
      {loaded ? (
        <>
          <p className="text-lg mt-5">Список резюме</p>
          <hr className="max-w-[200px] border border-blue-gray-100 mt-2.5" />
          <ResumesEditionList
            resumes={summary?.resumes || []}
            className="max-w-[800px] min-w-[400px] mt-2.5"
          />
        </>
      ) : loading ? (
        <Spinner className="w-12 h-12 m-2.5 self-center" />
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreateResumePage;
