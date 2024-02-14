import connectToDB from "@/app/database";
import Item from "@/app/models/Item";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const tags = await ItemTag.find();
    return tags && NextResponse.json({ tags }, { status: 200 });
  } catch (error) {
    console.log("Error loading tags: ", error);
    return NextResponse.json(
      { message: "Error loading tags", error },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDB();
    const body = await request.json();
    console.log("formdata is passing", body.formData);
    const tagData = body.formData;
    await ItemTag.create(tagData);

    return NextResponse.json({ message: "Item Created" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
