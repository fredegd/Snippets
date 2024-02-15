import User from "@/app/models/User";
import connectToDB from "@/app/database";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { email, password } = await req.json();
  await connectToDB();

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return NextResponse.error(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ email, password: hashedPassword });

  try {
    await newUser.save();
    return NextResponse.json(
      { message: "User is registered" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
