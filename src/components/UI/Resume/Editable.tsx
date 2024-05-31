import { FC } from "react";

interface InputProps {
  type?: React.HTMLInputTypeAttribute;
  value?: any;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Editable: FC<InputProps> = ({
  placeholder,
  type,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-row gap-2.5 whitespace-nowrap">
      <span>{placeholder}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="outline-none text-[#05AAE6] w-full"
      />
    </div>
  );
};
