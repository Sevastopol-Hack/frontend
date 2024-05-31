import axios from "axios";
import { MAIN_API } from "../config";

export interface Resume {
  _id: string;
  created_at: number;
  fio: string;
  age: number;
  experience: number;
  stack: string[];
  jobs: [
    {
      name: string;
      post: string;
      start: number;
      end: number;
    }
  ];
  filename: string;
}

export interface Summary {
  _id: string;
  resumes: Resume[];
}

export default class ResumesService {
  private static API = MAIN_API;

  public static async upload(files: FileList): Promise<string> {
    const formData = new FormData();
    [...files].forEach((file) => {
      formData.append("files", file);
    });

    const response = await axios.post(this.API + "/resume", formData);
    return response.data._id;
  }

  public static async file(filename: string): Promise<string> {
    const response = await axios.get(this.API + `/resume/file/${filename}`);
    return response.data;
  }

  public static async summary(id: string): Promise<Summary> {
    const response = await axios.get(this.API + `/resume/upload/${id}`);
    const data: Summary = response.data;
    data.resumes = await Promise.all(
      data.resumes.map(async (resume) => {
        return {
          ...resume,
          filename: await this.file(resume.filename),
        };
      })
    );
    return response.data;
  }
}
