import { Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Footer from "../components/UI/Footer/Footer";
import Header from "../components/UI/Header/Header";
import { multiLazy } from "../utils/multiLazy";
import RoutePaths from "./Routes";

const AppRouter = () => {
  const [HomePage, SignupPage, LoginPage] = multiLazy([
    () => import("../pages/HomePage"),
    () => import("../pages/SignupPage"),
    () => import("../pages/LoginPage"),
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
          <Route path={RoutePaths.SIGNUP} element={<SignupPage />} />
          <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
