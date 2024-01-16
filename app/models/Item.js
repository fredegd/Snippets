import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);

mongoose.Promise = global.Promise;

const itemSchema = new Schema(
  {
    imageBanner: { type: String, required: true },
    title: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    level: {
      type: String,
      enum: ["beginner", "medium", "advanced"],
      required: true,
      default: "beginner",
    },
    itemTags: [{ type: mongoose.Schema.Types.ObjectId, ref: "itemTag" }],
    itemChapters: [
      { type: mongoose.Schema.Types.ObjectId, ref: "itemChapter" },
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

export default Item;
