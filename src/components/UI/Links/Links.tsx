import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Link from "../Link/Link";
import RoutePaths from "../../../router/Routes";
import { useSelf } from "../../../states/self";

interface LinksProps {
  className?: string;
}

interface LinkInfo {
  href: string;
  title: string;
  disabled?: boolean;
}
const Links: FC<LinksProps> = ({ className }) => {
  const navigate = useNavigate();
  const { user } = useSelf();

  const LINKS: LinkInfo[] = [
    {
      title: "Вакансии",
      href: RoutePaths.VACANCIES,
      disabled: user?.role === "recruiter",
    },
    {
      title: "Резюме",
      href: "/",
    },
    {
      title: "Профиль",
      href: RoutePaths.PROFILE,
    },
  ];

  return (
    <div className={`${className}`}>
      {LINKS.map((link, index) => {
        return link.disabled ? (
          <></>
        ) : (
          <Link
            key={index}
            className="flex flex-row mx-5"
            onClick={() => navigate(link.href)}
          >
            <p className="mr-1">{link.title}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Links;
