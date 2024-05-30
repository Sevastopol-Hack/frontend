import { Typography } from "@material-tailwind/react";
import { FC } from "react";
import Link from "../Link/Link";

export const Footer: FC = () => {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 py-6 text-center">
      <Typography color="blue-gray" className="font-normal text-center flex">
        &copy; {new Date().getFullYear()} BiTech для &nbsp;
        <Link
          onClick={() => {
            window.open("https://t1.ru/", "_blank");
          }}
        >
          <p className="mr-1">T1 Holding</p>
        </Link>
      </Typography>
    </footer>
  );
};
export default Footer;
