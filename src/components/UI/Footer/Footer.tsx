import { Typography } from "@material-tailwind/react";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 py-6 text-center">
      <Typography color="blue-gray" className="font-normal text-center">
        &copy; {new Date().getFullYear()} BiTech для &nbsp; <b></b>
      </Typography>
    </footer>
  );
};
export default Footer;
