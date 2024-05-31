import axios from "axios";
import { MAIN_API } from "../config";

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
}
