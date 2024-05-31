import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/Pages";
import { useEffect } from "react";
import { useSelf } from "./states/self";
import UserService from "./API/UserService";

const App = () => {
  const { setUser } = useSelf();

  useEffect(() => {
    if (localStorage["token"]) {
      UserService.info().catch().then(setUser);
    }
  }, []);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
