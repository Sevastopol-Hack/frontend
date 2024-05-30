import { Resume } from "../components/UI/Resume/Resume";

const CreatePage = () => {
  const info = {
    fio: "Тестов Тест Тестович",
    age: 29,
    position: "Frontend-разработчик",
    exp: 37,
    stack: [
      "HTML5",
      "CSS3",
      "JS",
      "JavaScript/JQuery",
      "адаптивная вёрстка",
      "создание HTML-страницы сайта на основе дизайн-макетов",
      "вёрстка сайтов и шаблонов для CMS",
      "привязка к пользовательскому интерфейсу скриптов, которые обеспечивают визуализацию и анимацию страниц сайта",
      "обеспечение необходимого уровня пользовательского интерфейса (UI — User Interface) и опыта взаимодействия (UX — User Experience)",
      "CSS-фреймворки",
      "кросс-браузерная вёрстка",
    ],
    jobs: [
      {
        name: "SkyEnglish",
        post: "frontend разработчик",
        from: 1473235200,
        to: 1562489600,
      },
    ],
  };

  return <Resume {...info} />;
};

export default CreatePage;
