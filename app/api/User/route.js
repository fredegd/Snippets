import connectToDB from "@/app/database";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const foundUsers = await User.find();
    return foundUsers && NextResponse.json({ foundUsers, status: 200 });
  } catch (error) {
    console.log("Error loading users: ", error);
    return NextResponse.json(
      { message: "Error loading users", error },
      { status: 500 }
    );
  }
}
export async function POST(request) {
  try {
    await connectToDB();
    const body = await request.json();
    console.log("formdata USER is passing", body);
    const userData = body;
    const created = await User.create(userData).then((user) => {
      return user;
    });

    return NextResponse.json(
      { message: "User Created", created },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
