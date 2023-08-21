import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    line_items: Object,
    name: String,
    city: String,
    email: String,
    country: String,
    streetAddress: String,
    postalCode: String,
    paid: Boolean,
  },
  {
    timestamps: true,
  }
);

export const Order = models.Order || model("Order", OrderSchema);
