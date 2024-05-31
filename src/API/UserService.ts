import axios from "axios";
import { MAIN_API } from "../config";

export type Role = "recruiter" | "hiring_manager" | "resource_manager";
export interface SignupRequest {
  name: string;
  surname: string;
  username: string;
  role: Role;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  role: string;
}

export default class UserService {
  private static API = MAIN_API;

  public static async signup(user: SignupRequest): Promise<void> {
    const response = await axios.post(this.API + "/user/register", user);
    const token = response.data.access_token;

    localStorage["token"] = token;
  }

  public static async info(): Promise<User> {
    const token = localStorage["token"];

    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    };

    const response = await axios.post(this.API + "/user/self", {}, config);

    return response.data;
  }

  public static async login(user: LoginRequest): Promise<void> {
    const response = await axios.post(this.API + "/user/token", user);
    const token = response.data.access_token;

    localStorage["token"] = token;
  }
}
