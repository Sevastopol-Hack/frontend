import { Typography } from "@material-tailwind/react";

export const About = () => {
  return (
    <div className="flex flex-col justify-left items-left mx-10 mt-6">
      <Typography variant="h1">BiWork</Typography>
      <hr className="max-w-[200px] border border-blue-gray-100 mt-2.5" />
      <p className="flex flex-col gap-5 mt-5">
        <span>
          Проект разработан для крупных компаний, чтобы облегчить и ускорить
          найм работников.
        </span>
        <span>Функциональные возможности:</span>
        <ul className="list-disc">
          <li>Быстрый и точный анализ резюме </li>
          <li>
            Удобное сравнение кандидатов на выбранную вакансию по навыкам, опыту
            и другим критериям
          </li>
        </ul>
        <span>Преимущества:</span>
        <ul className="list-disc">
          <li>
            Экономия времени и ресурсов: Проект анализирует резюме за считанные
            секунды, освобождая рекрутеров для более важных задач.{" "}
          </li>
          <li>
            Снижение предвзятости: Автоматизированный анализ резюме помогает
            устранить предвзятость и гарантировать справедливый процесс найма.
          </li>
        </ul>
        <span>Подходит для:</span>
        <span>
          Проект идеально подходит для крупных компаний с большим объемом найма,
          которым необходимо быстро и эффективно заполнять вакансии
          квалифицированными сотрудниками.
        </span>
      </p>
    </div>
  );
};
