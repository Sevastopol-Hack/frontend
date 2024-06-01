import { Resume } from "../API/ResumesService";
import { CompetenceProps } from "../components/UI/Resume/Competence";
import { ageStringify } from "./ageStringify";

export const csvExport = (cells: string[][], filename: string) => {
  const data = cells.map((row) => row.join(";")).join("\n");

  const elem = window.document.createElement("a");
  elem.href =
    "data:text/plain;charset=utf-8," + encodeURIComponent("\uFEFF" + data);
  elem.download = filename;
  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
};

const dateFormatter = Intl.DateTimeFormat("ru", {
  month: "long",
  year: "numeric",
});

const parseDate = (time?: number) => {
  if (time === undefined) {
    return "";
  }

  if (!time) {
    time = Date.now();
  }

  return dateFormatter.format(time * 1000);
};

export const exportResume = (resume: Resume) => {
  const stack = resume.stack || [""];
  const jobs = resume.jobs || [
    {
      name: "",
      post: "",
      end: undefined,
      start: undefined,
    },
  ];

  const header = [
    "Имя",
    "Возраст",
    "Email",
    "Опыт",
    "Стек",
    "Предыдущие места работы",
    "",
    "",
    "",
  ];

  const jobsHeader = [
    "",
    "",
    "",
    "",
    "",
    "Название компании",
    "Должность",
    "Начало",
    "Конец",
  ];

  const base = [
    resume.fio,
    ageStringify(resume.age),
    resume.email,
    ageStringify(resume.experience, true),
    stack[0],
    jobs[0].name,
    jobs[0].post,
    parseDate(jobs[0].start),
    parseDate(jobs[0].end),
  ];

  const other: string[][] = [];

  for (let i = 1; i < Math.max(stack.length, jobs.length); i++) {
    const job =
      i < jobs.length
        ? jobs[i]
        : {
            name: "",
            post: "",
            end: undefined,
            start: undefined,
          };

    const row = [
      "",
      "",
      "",
      "",
      i < stack.length ? stack[i] : "",
      job.name,
      job.post,
      parseDate(job.start),
      parseDate(job.end),
    ];

    other.push(row);
  }

  csvExport([header, jobsHeader, base, ...other], "Resume.csv");
};

export const exportCompetences = (competences: CompetenceProps[]) => {
  csvExport(
    [
      ["Компетенция", "Баллы"],
      ...competences.map((competence) => [
        competence.title,
        competence.percent.toString(),
      ]),
    ],
    "Competences.csv"
  );
};
