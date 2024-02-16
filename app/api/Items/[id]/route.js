import connectToDB from "@/app/database";
import Item from "@/app/models/Item";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    const foundItem = await Item.findOne({ _id: id });
    return NextResponse.json({ foundItem, status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    // console.log("params", params, params.id, { id });

    const body = await request.json();
    const itemData = body.formData;

    const updateItemData = await Item.findByIdAndUpdate(id, {
      ...itemData,
    });
    return NextResponse.json({ message: "Item Updated" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    console.log("id of the deleted item:", id);
    const deleteItem = await Item.findByIdAndDelete(id);
    console.log(deleteItem, "deleteItem is here");
    return NextResponse.json({ message: "Item Deleted" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
