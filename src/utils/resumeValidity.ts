import { Resume } from "../API/ResumesService";

export const isValid = (
  resume: Omit<Resume, "_id" | "created_at" | "percent">
) => {
  return Object.values(resume).every((value) => value);
};
