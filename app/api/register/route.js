import User from "@/app/models/User";
import connectToDB from "@/app/database";
import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { name, email, password } = await req.json();
    await connectToDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return NextResponse.json({ error: "User already exists"}, { status: 400 });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      try {
        const user = await newUser.save().then((user) => {
          console.log("User created successfully:", user);
        });
        return NextResponse.json({ status: 200, user });
      } catch (saveError) {
        console.error("Error saving user to the database:", saveError);
        return NextResponse.json({
          status: 500,
          error: "Failed to save user to the database",
        });
      }
    }
  } catch (error) {
    console.error("Error during user creation:", error);
    return NextResponse.json({
      status: 500,
      error: "Internal server error during user creation",
    });
  }
};
