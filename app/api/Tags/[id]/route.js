import connectToDB from "@/app/database";
import Tag from "@/app/models/Tag";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    const foundTag = await Tag.findOne({ _id: id });
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
    const updateTagData = await Tag.findByIdAndUpdate(id, {
      ...tagData,
    });
    return NextResponse.json({ message: "Tag Updated" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    const deleteTag = await Tag.findByIdAndDelete(id);
    return NextResponse.json({ message: "Tag Deleted" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
