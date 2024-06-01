import { Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Footer from "../components/UI/Footer/Footer";
import Header from "../components/UI/Header/Header";
import { multiLazy } from "../utils/multiLazy";
import RoutePaths from "./Routes";

const AppRouter = () => {
  const [
    HomePage,
    SignupPage,
    LoginPage,
    EditResumePage,
    ResumePage,
    VacanciesPage,
    CreateResumePage,
    CreateVacancyPage,
    EditVacancyPage,
    VacancyPage,
    ProfilePage,
  ] = multiLazy([
    () => import("../pages/HomePage"),
    () => import("../pages/SignupPage"),
    () => import("../pages/LoginPage"),
    () => import("../pages/EditResumePage"),
    () => import("../pages/ResumePage"),
    () => import("../pages/VacanciesPage"),
    () => import("../pages/CreateResumePage"),
    () => import("../pages/CreateVacancyPage"),
    () => import("../pages/EditVacancyPage"),
    () => import("../pages/VacancyPage"),
    () => import("../pages/ProfilePage"),
  ]);

  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route path={RoutePaths.HOME} element={<HomePage />} />
          <Route path={RoutePaths.PROFILE} element={<ProfilePage />} />
          <Route path={RoutePaths.SIGNUP} element={<SignupPage />} />
          <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
          <Route path={RoutePaths.EDIT_RESUME} element={<EditResumePage />} />
          <Route path={RoutePaths.RESUME} element={<ResumePage />} />
          <Route path={RoutePaths.VACANCIES} element={<VacanciesPage />} />
          <Route path={RoutePaths.VACANCY} element={<VacancyPage />} />
          <Route path={RoutePaths.EDIT_VACANCY} element={<EditVacancyPage />} />
          <Route
            path={RoutePaths.CREATE_VACANCY}
            element={<CreateVacancyPage />}
          />
          <Route
            path={RoutePaths.CREATE_RESUME}
            element={<CreateResumePage />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
