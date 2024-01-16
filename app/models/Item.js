import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
    category: {
      type: string,
      // enum: ["frontend", "backend", "fullstack"],
      required: true,
      default: "frontend",
    },
    itemChapters: [
      { type: mongoose.Schema.Types.ObjectId, ref: "itemChapter" },
    ],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    votes: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);

export default Item;
