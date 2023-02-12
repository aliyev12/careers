import { IJob } from "@/interfaces";
import React, { FC } from "react";

export const JobsFilter: FC<{ jobs: IJob[] }> = () => {
  return (
    <section className="w-1/4 border border-t-0 border-b-0 border-l-0 border-gray-300">
      JobsFilter
    </section>
  );
};
