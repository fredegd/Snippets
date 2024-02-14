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

const ItemTag = mongoose.models.Item || mongoose.model("Item", itemTagSchema);

module.exports = ItemTag;
