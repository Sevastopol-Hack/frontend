import { Input, Typography } from "@material-tailwind/react";
import React, { FC } from "react";

interface InputProps {
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  description?: string;
  className?: string;
  caption?: React.JSX.Element;
  template?: React.JSX.Element;
  readonly?: boolean;
  onSubmit?: () => void;
  value?: any;
}

const LoginInput: FC<InputProps> = ({
  caption,
  className,
  description,
  onChange,
  placeholder,
  type,
  template,
  readonly,
  onSubmit,
  value,
}) => {
  return (
    <>
      <Typography variant="h6" color="blue-gray" className="-mb-3">
        {description}
      </Typography>
      <div className="relative flex w-full max-w-[24rem] h-10">
        {template}
        <Input
          type={type}
          readOnly={readonly}
          size="lg"
          placeholder={placeholder}
          defaultValue={value}
          crossOrigin={""}
          onChange={onChange}
          onKeyDown={(e) => {
            e.key === "Enter" && onSubmit && onSubmit();
          }}
          className={`${className} !border-t-blue-gray-200 focus:!border-t-gray-900 max-h-10`}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>
      {caption && (
        <Typography
          variant="small"
          color="gray"
          className="-mt-2 flex items-center gap-1 font-normal"
        >
          {caption}
        </Typography>
      )}
    </>
  );
};

export default LoginInput;
