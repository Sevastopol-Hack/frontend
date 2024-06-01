import axios from "axios";
import { MAIN_API } from "../config";

export default class StackService {
  private static API = MAIN_API;

  public static async get(): Promise<string[]> {
    const response = await axios.get(this.API + `/stack/all`);
    return response.data.map((stack: any) => stack.title);
  }

  public static async create(title: string): Promise<void> {
    await axios.post(this.API + `/stack/`, {
      title,
    });
  }
}
