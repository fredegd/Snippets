const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemTagSchema = new Schema(
  {
    tag: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ItemTag =
  mongoose.models.Item || mongoose.model("ItemTag", itemTagSchema);

module.exports = ItemTag;
