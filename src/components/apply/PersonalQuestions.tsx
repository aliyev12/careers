import { FormContext } from "@/context/FormContext";
import { FC, useContext } from "react";

export const PersonalQuestions: FC = () => {
  const { parsedResume } = useContext(FormContext);

  console.log("parsedResume = ", parsedResume);
  return <div>PersonalQuestions</div>;
};
