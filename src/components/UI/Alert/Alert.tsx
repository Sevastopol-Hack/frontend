import { Alert } from "@material-tailwind/react";
import { useState } from "react";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

export const APIAlert = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>();
  const [success, setSuccess] = useState<boolean>();

  const Open = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  const Success = (text: string) => {
    if (!open) {
      setSuccess(true);
      setText(text);
      Open();
    }
  };

  const Error = (text: string) => {
    if (!open) {
      setSuccess(false);
      setText(text);
      Open();
    }
  };

  const component = (
    <Alert
      icon={
        success ? (
          <CheckCircleIcon className="w-5 h-5" />
        ) : (
          <ExclamationCircleIcon className="w-5 h-5" />
        )
      }
      open={open}
      color={success ? "light-green" : "red"}
    >
      {text}
    </Alert>
  );

  return [Success, Error, component] as const;
};
