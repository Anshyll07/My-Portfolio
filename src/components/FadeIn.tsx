import { ReactNode, FC } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: any;
}

export const FadeIn: FC<FadeInProps> = ({
  children,
  className = "",
  as = "div"
}) => {
  const Tag = as as any;
  return <Tag className={className}>{children}</Tag>;
};
