import { IncomingForm } from "formidable";
import { promises as fs } from "fs";

var mv = require("mv");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);

      var oldPath = files.file.filepath;
      var newPath = `./public/images/${files.file.originalFilename}`;
      mv(oldPath, newPath, function (err) {});
      return res.json({ status: "200", message: "Uploaded Successfully..." });
    });
  });
};
