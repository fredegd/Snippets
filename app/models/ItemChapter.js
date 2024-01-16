import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI);

mongoose.Promise = global.Promise;

const itemChapterSchema = new mongoose.Schema(
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
  mongoose.model.ItemChapter ||
  mongoose.model("ItemChapter", itemChapterSchema);

export default ItemChapter;
