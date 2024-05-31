import axios from "axios";
import { MAIN_API } from "../config";
import { Resume } from "./ResumesService";

export interface Vacancy {
  _id: string;
  title: string;
  stack: string[];
  is_close: boolean;
}

export default class VacanciesService {
  private static API = MAIN_API;

  public static async create(vacancy: Omit<Vacancy, "_id" | "is_close">) {
    await axios.post(this.API + "/vacancy", vacancy);
  }

  public static async search(query: {
    query: string;
    limit: number;
    skip: number;
  }): Promise<Vacancy[]> {
    const response = await axios.post(this.API + `/vacancy/search`, query);
    return response.data.result;
  }

  public static async get(id: string): Promise<Vacancy> {
    const response = await axios.get(this.API + `/vacancy/${id}`);
    return response.data;
  }

  public static async match(id: string): Promise<Resume[]> {
    const response = await axios.post(
      this.API + `/vacancy/resume?vacancy_id=${id}`
    );
    console.log(response);
    const data: Resume[] = response.data.result;
    return data.map((data) => ({
      ...data,
      percent: data.percent * 100,
    }));
  }

  public static async update(vacancy: Vacancy): Promise<void> {
    await axios.put(this.API + "/vacancy", vacancy);
  }
}
