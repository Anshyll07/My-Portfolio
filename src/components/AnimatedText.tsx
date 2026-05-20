import React, { FC } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedText: FC<AnimatedTextProps> = ({ text, className = "", style }) => {
  return (
    <p className={className} style={style}>
      {text}
    </p>
  );
};
