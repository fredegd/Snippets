import Item from "@/app/models/Item";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  const foundItem = await Item.findOne({ _id: id });
  return NextResponse.json({ foundItem }, { status: 200 });
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;

    const body = await request.json();
    const itemData = body.formData;

    const updateItemData = await Item.findOneAndUpdate(id, {
      ...itemData,
    });
    return NextResponse.json({ message: "Item Updated" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const deleteItem = await Item.findOneAndDelete(id);
    return NextResponse.json({ message: "Item Deleted" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
