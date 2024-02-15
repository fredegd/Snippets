import User from "@/app/models/User";

import connectToDB from "@/app/database";

import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { email, password } = await req.json();

  await connectToDB();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse.error("User already exists", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });

  try {
    await newUser.save();
    return new NextResponse("User is registered", { status: 201 });
  } catch (error) {
    return new NextResponse.error(error, { status: 500 });
  }
};
