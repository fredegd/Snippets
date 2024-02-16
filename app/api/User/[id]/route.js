import connectToDB from "@/app/database";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    const foundUser = await User.findOne({ _id: id });
    return NextResponse.json({ status: 200, foundUser });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    const body = await request.json();
    const userData = body.formData;
    const updateUserData = await User.findByIdAndUpdate(id, {
      ...userData,
    });
    return NextResponse.json({ message: "User Updated" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    const deleteUser = await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User Deleted" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
