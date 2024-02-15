import connectToDB from "@/app/database";
import ItemTag from "@/app/models/ItemTag";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    const foundTag = await ItemTag.findOne({ _id: id });
    return NextResponse.json({ foundTag }, { status: 200 });
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
    const tagData = body.formData;
    const updateTagData = await ItemTag.findByIdAndUpdate(id, {
      ...tagData,
    });
    return NextResponse.json({ message: "ItemTag Updated" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    const deleteTag = await ItemTag.findByIdAndDelete(id);
    return NextResponse.json({ message: "ItemTag Deleted" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
