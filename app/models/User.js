const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: false },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: false },
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
