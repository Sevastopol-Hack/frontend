import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/Pages";

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
