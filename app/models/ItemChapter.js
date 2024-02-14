const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemChapterSchema = new Schema(
  {
    imageBanner: { type: String, required: true },
    title: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    chapterNumber: { type: Number, required: true },
    parentItem: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  },
  {
    timestamps: true,
  }
);

const ItemChapter =
  mongoose.models.ItemChapter ||
  mongoose.model("ItemChapter", itemChapterSchema);

export default ItemChapter;
