// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await mongooseConnect();
  if (method === "GET") {
    if (req.query?.id) {
      res.status(200).json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.status(200).json(await Product.find());
    }
  }
  if (method === "POST") {
    const { title, description, price, images, category, properties } =
      req.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
      category,
      properties,
    });
    res.status(200).json(productDoc);
  }

  if (method === "PUT") {
    const { title, description, price, images, _id, category, properties } =
      req.body;
    await Product.updateOne(
      { _id },
      {
        title: title,
        description: description,
        price: price,
        images: images,
        category: category,
        properties: properties,
      }
    );
    res.status(200).json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query.id });
      res.status(200).json(true);
    }
  }
}
