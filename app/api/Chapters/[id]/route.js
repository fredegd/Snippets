import connectToDB from "@/app/database";
import ItemChapter from "@/app/models/ItemChapter";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    console.log("id is here", id);
    const foundItemChapter = await ItemChapter.findOne({ _id: id });
    return NextResponse.json({ foundItemChapter }, { status: 200 });
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
    const itemChapterData = body.formData;

    const updateItemChapterData = await ItemChapter.findByIdAndUpdate(id, {
      ...itemChapterData,
    });
    return NextResponse.json(
      { message: "ItemChapter Updated" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    console.log("id of the deleted chapter:", id);
    const deleteItemChapter = await ItemChapter.findByIdAndDelete(id);
    console.log(deleteItemChapter, "deleteItem is here");
    return NextResponse.json({ message: "Item Deleted" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
