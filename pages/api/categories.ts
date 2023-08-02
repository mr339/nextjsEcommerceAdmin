// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await mongooseConnect();
  if (method === "GET") {
    res.status(200).json(await Category.find().populate("parent"));
  }

  if (method === "POST") {
    const { categoryName, parentCategory } = req.body;
    const CategoryDoc = await Category.create({
      categoryName,
      parent: parentCategory,
    });
    res.status(200).json(CategoryDoc);
  }

  if (method === "PUT") {
    const { categoryName, parentCategory, _id } = req.body;
    await Category.updateOne(
      { _id },
      { categoryName: categoryName, parent: parentCategory }
    );
    res.status(200).json(true);
  }

  if (method === "DELETE") {
    if (req.query?._id) {
      await Category.deleteOne({ _id: req.query._id });
      res.status(200).json(true);
    }
  }
}
