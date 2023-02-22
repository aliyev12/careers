import { IJob } from "@/interfaces";
import { FC } from "react";
import ReactMarkdown from "react-markdown";

export const DetailsSection: FC<{ title: string; body: string }> = ({
  title,
  body,
}) => {
  return (
    <div className="mt-5 mb-8 flex flex-col">
      <h3 className="mb-3">{title}</h3>
      <div className="markdown">
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
};
