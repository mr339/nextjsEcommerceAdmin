import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
  categoryName: { type: String, required: true },
});

export const Category = models.Category || model("Category", CategorySchema);
