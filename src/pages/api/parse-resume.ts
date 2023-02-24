// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import nextConnect from "next-connect";
const { AffindaCredential, AffindaAPI } = require("@affinda/affinda");
const fs = require("fs");
const path = require("path");
import sample_response from "./sample_response.json";

type Data = {
  name: string;
};

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: error.message });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
  },
});

apiRoute.use(multer().any());

apiRoute.post((req, res) => {
  // res.status(500).json({ oops: "ooops" });
  res.status(200).json({ status: "success", result: sample_response });
  /* 
  console.log("req.files = ", req.files); // Your files here
  console.log("req.body = ", req.body); // Your form data here
  // Any logic with your data here

  // const credential = new AffindaCredential(process.env.AFFINDA_KEY);
  const credential = new AffindaCredential(
    "9142cb0c92f5859341b0f4b02d385f3d2d0b69ca"
  );
  const client = new AffindaAPI(credential);
  const readStream = fs.createReadStream(
    "/Users/abdulaliyev/web-projects/careers/resumeAbdulAliyev.pdf"
  );
  // const readStream = fs.createReadStream(
  //   path.join(__dirname, "resumeAbdulAliyev.pdf")
  // );
  // const readStream = fs.createReadStream(new Uint8Array(req.files[0]));

  // client
  //   .createResume({ file: readStream })
  //   .then((result) => {
  //     console.log("Returned data:");
  //     console.dir(result);
  //     res.status(200).json({ data: "success", result });
  //   })
  //   .catch((err) => {
  //     console.log("An error occurred:");
  //     console.error(err);
  //     res.status(500).json({ data: "error", err });
  //   });

  // Can also use a URL:

  // client
  //   .createResume({
  //     url: "https://api.affinda.com/static/sample_resumes/example.pdf",
  //   })
  //   .then((result) => {
  //     console.log("Returned data:");
  //     console.dir(result);
  //   })
  //   .catch((err) => {
  //     console.log("An error occurred:");
  //     console.error(err);
  //   });

  */
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
