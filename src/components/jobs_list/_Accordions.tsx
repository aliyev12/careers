import { FC, PropsWithChildren, useEffect, useState } from "react";
import Collapse from "rc-collapse";
import "rc-collapse/assets/index.css";

export const Accordions: FC<PropsWithChildren> = ({ children }) => {
  const [accordionsInitialized, setAccordionsInitialized] = useState(true);
  const [accordionsState, setAccordionsState] = useState<{
    [k: string]: boolean;
  }>();

  const Panel = Collapse.Panel;

  const mock = [{ code: "a" }, { code: "b" }, { code: "c" }];

  // useEffect(() => {
  //   if (!accordionsInitialized) {
  //     const newState: { [k: string]: boolean } = {};
  //     mock.forEach((item, i) => {
  //       newState[`${i}`] = false;
  //     });
  //     setAccordionsState(newState);
  //     setAccordionsInitialized(true);
  //   }
  // }, []);

  console.log("accordionsState = ", accordionsState);

  if (!accordionsInitialized) return null;

  function specialClass(accordionIndex: string): {
    title: string;
    body: string;
  } {
    const expandedClasses = {
      title: "rotate-180",
      body: "max-h-60",
    };
    const collapsedClasses = {
      title: "",
      body: "min-h-0 h-0",
    };

    if (accordionsState) {
      const foundAccStateItem = accordionsState[accordionIndex];
      if (
        typeof foundAccStateItem === "boolean" &&
        foundAccStateItem !== null &&
        foundAccStateItem !== undefined
      ) {
        return foundAccStateItem === true ? expandedClasses : collapsedClasses;
      }
    }

    return collapsedClasses;
  }

  function handleAccordionClick(accordionIndex: string) {
    if (accordionsState) {
      const foundAccStateItem = accordionsState[accordionIndex];
      if (
        typeof foundAccStateItem === "boolean" &&
        foundAccStateItem !== null &&
        foundAccStateItem !== undefined
      ) {
        setAccordionsState({
          ...accordionsState,
          [accordionIndex]: foundAccStateItem === true ? false : true,
        });
      }
    }
  }

  return (
    <Collapse accordion={true}>
      <Panel header="hello" headerClass="my-header-class" openMotion={}>
        this is panel content
      </Panel>
      <Panel header="title2">this is panel content2 or other</Panel>
    </Collapse>
  );

  return (
    <div id="accordion-collapse" data-accordion="collapse">
      <h2 id="accordion-collapse-heading-1">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
          data-accordion-target="#accordion-collapse-body-1"
          aria-expanded="true"
          aria-controls="accordion-collapse-body-1"
          onClick={() => handleAccordionClick("0")}
        >
          <span>What is Flowbite?</span>
          <svg
            data-accordion-icon
            className={`h-6 w-6 shrink-0 transition-all ${
              specialClass("0").title
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </h2>
      <div
        id="accordion-collapse-body-1"
        className={`overflow-hidden transition-all ${specialClass("0").body}`}
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div className="border border-b-0 border-gray-200 p-5 font-light dark:border-gray-700 dark:bg-gray-900">
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Flowbite is an open-source library of interactive components built
            on top of Tailwind CSS including buttons, dropdowns, modals,
            navbars, and more.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Check out this guide to learn how to{" "}
            <a
              href="/docs/getting-started/introduction/"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              get started
            </a>{" "}
            and start developing websites even faster with components on top of
            Tailwind CSS.
          </p>
        </div>
      </div>
    </div>
  );
};

// export const Accordion: FC = () => {
//   return <>
//         <h2 id="accordion-collapse-heading-1">
//         <button
//           type="button"
//           className="flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
//           data-accordion-target="#accordion-collapse-body-1"
//           aria-expanded="true"
//           aria-controls="accordion-collapse-body-1"
//           onClick={() => handleAccordionClick("0")}
//         >
//           <span>What is Flowbite?</span>
//           <svg
//             data-accordion-icon
//             className={`h-6 w-6 shrink-0 transition-all ${
//               specialClass("0").title
//             }`}
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fill-rule="evenodd"
//               d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//               clip-rule="evenodd"
//             ></path>
//           </svg>
//         </button>
//       </h2>
//       <div
//         id="accordion-collapse-body-1"
//         className={`overflow-hidden transition-all ${specialClass("0").body}`}
//         aria-labelledby="accordion-collapse-heading-1"
//       >
//         <div className="border border-b-0 border-gray-200 p-5 font-light dark:border-gray-700 dark:bg-gray-900">
//           <p className="mb-2 text-gray-500 dark:text-gray-400">
//             Flowbite is an open-source library of interactive components built
//             on top of Tailwind CSS including buttons, dropdowns, modals,
//             navbars, and more.
//           </p>
//           <p className="text-gray-500 dark:text-gray-400">
//             Check out this guide to learn how to{" "}
//             <a
//               href="/docs/getting-started/introduction/"
//               className="text-blue-600 hover:underline dark:text-blue-500"
//             >
//               get started
//             </a>{" "}
//             and start developing websites even faster with components on top of
//             Tailwind CSS.
//           </p>
//         </div>
//       </div>

//   </>
// }
