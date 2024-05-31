import { FC } from "react";

export const FileDialog: FC<{
  label?: string;
  accept?: string;
  multiple?: boolean;
}> = ({ label, accept, multiple }) => {
  const id = new Date().valueOf().toString();

  return (
    <>
      <label className="block mb-2 font-medium text-black" htmlFor={id}>
        {label}
      </label>
      <input
        accept={accept}
        className="block text-black border border-[#A5B4C4] rounded-lg file:border-0 cursor-pointer bg-gray-50 outline-none"
        id={id}
        multiple={multiple}
        type="file"
      ></input>
    </>
  );
};
