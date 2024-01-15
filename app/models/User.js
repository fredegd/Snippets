import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vote" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
