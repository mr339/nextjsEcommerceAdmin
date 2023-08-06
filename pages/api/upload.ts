import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "@/lib/mongoose";
import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime-types";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

const bucketName = "ganeshdai-testing";
const accessKeyId = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   const { method } = req;
  if (!accessKeyId || !secretAccessKey) {
    throw new Error("S3 credentials are not set.");
  }

  await mongooseConnect();
  try {
    await isAdminRequest(req, res);
  } catch (error) {
    throw "Not an admin. Access denied!";
  }
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

  const client = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
  });
  const links = [];
  for (const file of files.file) {
    const ext = file.originalFilename.split(".").pop();
    const newFilename = Date.now() + "." + ext;
    const contentType = mime.lookup(file.path) || "application/octet-stream";

    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,
        Body: fs.readFileSync(file.path),
        ACL: "public-read",
        ContentType: contentType,
      })
    );
    const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
    links.push(link);
  }

  return res.status(200).json({ links });
}

export const config = {
  api: { bodyParser: false },
};
