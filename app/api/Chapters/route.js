import connectToDB from "@/app/database";
import ItemChapter from "@/app/models/Item";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const chapters = await ItemChapter.find();
    return chapters && NextResponse.json({ chapters }, { status: 200 });
  } catch (error) {
    console.log("Error loading items: ", error);
    return NextResponse.json(
      { message: "Error loading items", error },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDB();
    const body = await request.json();
    console.log("formdata CHAPTER is passing", body.formData);
    const itemChapterData = body.formData;
    await ItemChapter.create(itemChapterData);

    return NextResponse.json({ message: "Item Created" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
