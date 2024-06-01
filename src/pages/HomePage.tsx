import { About } from "../components/UI/Content/About";
import { Content } from "../components/UI/Content/Content";
import { useSelf } from "../states/self";

const HomePage = () => {
  const { user } = useSelf();

  return (
    <div className="flex flex-col justify-left items-left mx-10">
      {user ? <Content /> : <About />}
    </div>
  );
};

export default HomePage;
