import { cn } from "@/lib/utils";
import type { HTMLAttributes, JSX } from "react";

export type HeadingSize = "h0" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type HeadingTag = Exclude<HeadingSize, "h0"> | "p" | "span" | "div";

export type TypeHeading = HTMLAttributes<"h1" | "p" | "span" | "div"> & {
  size?: HeadingSize;
  tag?: HeadingTag;
  text?: string;
  className?: string;
  children?: React.ReactNode;
};

export const Heading = ({
  tag = "p",
  size = "h2",
  text,
  className,
  children,
}: TypeHeading) => {
  const TagName = tag as keyof JSX.IntrinsicElements;

  const getHeadingClass = (size: string) => {
    const sizeClasses: Record<string, string> = {
      h1: "text-4xl font-bold mb-4 text-balanced",
      h2: "text-3xl font-bold mb-4",
      h3: "text-2xl font-bold mb-4",
      h4: "text-xl font-normal mb-2",
      h5: "text-lg font-semibold mb-2",
      h6: "text-md font-semibold mb-2",
    };
    return sizeClasses[size] || "text-md font-normal";
  };

  const classes = cn([
    getHeadingClass(size),
    "last:mb-0 text-balance",
    className,
  ]);

  return <TagName className={classes}>{children ? children : text}</TagName>;
};

export default Heading;
