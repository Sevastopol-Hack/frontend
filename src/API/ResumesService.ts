import axios from "axios";
import { MAIN_API } from "../config";
import { CompetenceProps } from "../components/UI/Resume/Competence";

export interface Resume {
  _id: string;
  created_at: number;
  fio: string;
  age: number;
  experience: number;
  stack: string[];
  email: string;
  jobs: {
    name: string;
    post: string;
    start: number;
    end: number;
  }[];
  filename: string;
  percent: number;
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

  public static async get(id: string): Promise<Resume> {
    const response = await axios.get(this.API + `/resume/${id}`);
    return response.data;
  }

  public static async update(resume: Resume): Promise<void> {
    await axios.post(this.API + "/resume/update", resume);
  }

  public static async search(query: {
    stack: string[];
    limit: number;
    skip: number;
    experience_from: number;
    experience_to: number;
  }): Promise<Resume[]> {
    const response = await axios.post(this.API + `/resume/search`, query);
    let data: Resume[] = response.data.result;
    data = await Promise.all(
      data.map(async (resume) => {
        return {
          ...resume,
          filename: await this.file(resume.filename),
        };
      })
    );
    return data;
  }

  public static async match(id: string): Promise<CompetenceProps[]> {
    const response = await axios.get(this.API + `/resume/match/${id}`);
    const data: CompetenceProps[] = response.data;
    return data.map((data) => ({
      ...data,
      percent: data.percent * 100,
    }));
  }
}
