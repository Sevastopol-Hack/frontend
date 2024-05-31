import { FC, useState } from "react";

interface LikeButtonProps {
  liked?: boolean;
  onChange?: (liked: boolean) => void;
  className?: string;
}

export const LikeButton: FC<LikeButtonProps> = ({
  liked,
  onChange,
  className,
}) => {
  const [like, setLike] = useState<boolean>(liked || false);
  const Toggle = () => {
    setLike(!like);
    onChange && onChange(like);
  };

  return (
    <img
      className={`${className} w-4 h-4 cursor-pointer`}
      src={`/icons/like/${like ? "" : "un"}filled.svg`}
      onClick={Toggle}
    />
  );
};
