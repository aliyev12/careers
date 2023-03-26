import { FormContext } from "@/context/FormContext";
import { log } from "@/utils";
import { Alert, Button, Spinner } from "flowbite-react";
import { FC, useCallback, useContext, useMemo, useState } from "react";
import { DropzoneInputProps, useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { HiCheckCircle, HiOutlineUpload, HiTrash } from "react-icons/hi";
import { Document, Page, pdfjs } from "react-pdf";
import { Continue } from "./Continue";
import dynamic from "next/dynamic";

const CLEAR_ERRORS_TIME = 60000;

export const UploadResume: FC = () => {
  const { t } = useTranslation("common");
  const {
    updateParsedResume,
    uloadedResume,
    setUloadedResume,
    nextStep,
    validateSteps,
    step,
  } = useContext(FormContext);
  const [error, setError] = useState<{ messages: string[] }>({ messages: [] });
  const [numPages, setNumPages] = useState(1);
  // const [pageNumber, setPageNumber] = useState(1);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  function showError(err: string) {
    setError((oldError) => ({ messages: [...oldError.messages, err] }));
    setTimeout(() => {
      setError({ messages: [] });
    }, CLEAR_ERRORS_TIME);
  }

  async function parseResume(file: any) {
    try {
      const data = new FormData();
      file.fieldname = "joe_resume";
      data.append("file", file);
      data.append("title", "resume");
      // data.append('user', 'hubot')
      const response = await fetch(
        "http://localhost:3333/careers/parse-resume",
        {
          method: "POST",
          body: data,
        }
      );
      const jsonRes = await response.json();
      updateParsedResume(jsonRes);
    } catch (error) {
      // @ts-ignore
      log({ message: error.message });
    }
  }
  // async function parseResume(file: any) {
  //   try {
  //     const data = new FormData();
  //     file.fieldname = "joe_resume";
  //     data.append("file", file);
  //     // data.append('user', 'hubot')
  //     const response = await fetch(
  //       "http://localhost:3333/careers/parse-resume",
  //       {
  //         method: "POST",
  //         body: data,
  //       }
  //     );
  //     const jsonRes = await response.json();
  //     updateParsedResume(jsonRes);
  //     console.log("jsonRes = ", jsonRes);
  //   } catch (error) {
  //     // @ts-ignore
  //     log({ message: error.message });
  //   }
  // }

  const onDrop = useCallback((acceptedFiles: any[]) => {
    const file = acceptedFiles[0];
    let failed = false;
    setError({ messages: [] });

    if (acceptedFiles.length > 1) {
      failed = true;
      showError(t(`apply.resume.error.too_many`));
    }

    if (file.type !== "application/pdf") {
      failed = true;
      showError(t(`apply.resume.error.wrong_type`));
    }

    if (failed) return;

    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = async () => {
      const binaryStr = reader.result as ArrayBufferLike;
      setUloadedResume({
        exists: true,
        path: file.path,
        base64: new Uint8Array(binaryStr),
      });

      parseResume(file);

      // const data = new FormData();
      // data.append("file", file);
      // // data.append('user', 'hubot')
      // const response = await fetch("/api/parse-resume", {
      //   method: "POST",
      //   body: data,
      // });
      // const jsonRes = await response.json();
      // updateParsedResume(jsonRes);
      // console.log("jsonRes = ", jsonRes);
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open, acceptedFiles } =
    useDropzone({
      onDrop,
      noClick: true,
      noKeyboard: true,
    });

  const modifiedInputProps: DropzoneInputProps = {
    ...getInputProps(),
    multiple: false,
    accept: "application/pdf",
  };

  const stepIsInvalid = useMemo(() => {
    return !validateSteps(step);
  }, [uloadedResume.exists, step]);

  // console.log(uloadedResume);

  return (
    <>
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center">
        <div className="mb-8 flex w-full justify-center">
          <h4>{t("apply.resume.page_title")}</h4>
        </div>
        <div className="mb-8">
          <p>{t("apply.resume.instructions")}</p>
        </div>

        <div className="mb-8 flex w-full flex-col items-center justify-center">
          {error.messages.length > 0 && (
            <Alert color="failure" className="markdown mb-8">
              <p className="font-semibold">
                {t(
                  `apply.resume.error.${
                    error.messages.length === 1
                      ? "title_single"
                      : "title_multiple"
                  }`
                )}
              </p>
              <ul>
                {error.messages.map((msg, i) => (
                  <li key={i}>
                    <span>{msg}</span>
                  </li>
                ))}
              </ul>
              <p className="mb-0">{t("apply.resume.error.try_again")}</p>
            </Alert>
          )}

          {!uloadedResume.exists && (
            <div
              {...getRootProps()}
              className="h-48 w-full rounded-lg border border-gray-200 bg-white p-6 text-gray-400 shadow dark:border-gray-700 dark:bg-gray-800"
            >
              <input {...modifiedInputProps} />
              {isDragActive ? (
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <p className="text-center">
                    {t("apply.resume.dropzone.drop_here")}
                  </p>
                </div>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <p className="text-center">
                    {t("apply.resume.dropzone.drag_n_drop")}
                  </p>
                  <Button
                    onClick={open}
                    color="gray"
                    className="mt-auto flex w-fit"
                  >
                    <HiOutlineUpload className="mr-2 -translate-x-1" />
                    {t("apply.resume.dropzone.attach")}
                  </Button>
                </div>
              )}
            </div>
          )}

          {uloadedResume.exists && uloadedResume.base64 && (
            <div className="flex w-full flex-col justify-center">
              <Alert color="success" icon={HiCheckCircle} className="mb-8 ">
                <div className="flex">
                  <p className="mr-2 font-semibold">
                    {t("apply.resume.dropzone.your_resume")}
                  </p>
                  <p className="mr-4 italic">{uloadedResume.path}</p>
                  <button
                    title="Delete resume"
                    onClick={() => {
                      setUloadedResume({
                        exists: false,
                        path: "",
                        base64: null,
                      });
                    }}
                  >
                    <HiTrash className="fill-red-600" />
                  </button>
                </div>
              </Alert>
              <div className="flex w-full justify-center rounded-lg shadow-lg">
                <Document
                  file={{
                    data: uloadedResume.base64,
                  }}
                  loading={
                    <div className="flex w-full items-center justify-center">
                      <Spinner aria-label="Default status example" />
                    </div>
                  }
                  onLoadSuccess={(props) => {
                    const { numPages } = props;
                    setNumPages(numPages);
                  }}
                  // onLoadError={(e) =>
                  //   console.log("error from pdf parser: = ", e)
                  // }
                >
                  {Array.from(Array(numPages).keys()).map((pageNum) => {
                    return (
                      <Page
                        key={pageNum}
                        pageNumber={pageNum + 1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="react-pdf"
                        loading={
                          <div className="flex w-full items-center justify-center">
                            <Spinner aria-label="Default status example" />
                          </div>
                        }
                      />
                    );
                  })}
                </Document>
              </div>
            </div>
          )}
        </div>
      </div>
      <Continue disabled={stepIsInvalid} onClick={() => nextStep()} />
    </>
  );
};
