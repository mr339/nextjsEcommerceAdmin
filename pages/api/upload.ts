import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "@/lib/mongoose";
import multiparty from "multiparty";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   const { method } = req;
  await mongooseConnect();
  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        // Handle the error appropriately, for example, by rejecting the promise
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });

  console.log("teststs", files.file);
  return res.status(200).json("ok");

  //   if (method === "POST") {
  //     const { title, description, price } = req.body;
  //     const productDoc = await Product.create({
  //       title,
  //       description,
  //       price,
  //     });
  //     res.status(200).json(productDoc);
  //   }
}

export const config = {
  api: { bodyParser: false },
};
