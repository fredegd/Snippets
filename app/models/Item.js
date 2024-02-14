const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    imageBanner: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    level: {
      type: String,
      enum: ["beginner", "medium", "advanced"],
      required: true,
      default: "beginner",
    },
    category: {
      type: String,
      enum: ["Snippet", "Cheatsheet", "Tutorial", "Essay"],
      required: true,
      default: "cheatsheet",
    },
    itemTags: [{ type: mongoose.Schema.Types.ObjectId, ref: "ItemTag" }],
    itemChapters: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ItemChapter" },
    ],
    votes: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);

module.exports = Item;
