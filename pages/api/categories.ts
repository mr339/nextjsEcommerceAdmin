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
    res.status(200).json(await Category.find());
  }

  if (method === "POST") {
    const { categoryName } = req.body;
    const CategoryDoc = await Category.create({
      categoryName,
    });
    res.status(200).json(CategoryDoc);
  }

  if (method === "PUT") {
    const { title, description, price, images, _id } = req.body;
    await Category.updateOne(
      { _id },
      { title: title, description: description, price: price, images: images }
    );
    res.status(200).json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Category.deleteOne({ _id: req.query.id });
      res.status(200).json(true);
    }
  }
}
