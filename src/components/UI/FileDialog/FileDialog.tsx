import { FC } from "react";

export const FileDialog: FC<{
  label?: string;
  accept?: string;
  multiple?: boolean;
  className?: string;
  inputClassName?: string;
}> = ({ label, accept, multiple, className, inputClassName }) => {
  const id = new Date().valueOf().toString();

  return (
    <div className={className}>
      <label className="block mb-2 font-medium text-black" htmlFor={id}>
        {label}
      </label>
      <input
        accept={accept}
        className={`${inputClassName} block text-black border border-[#A5B4C4] rounded-lg file:border-0 cursor-pointer bg-gray-50 outline-none`}
        id={id}
        multiple={multiple}
        type="file"
      ></input>
    </div>
  );
};
