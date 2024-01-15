import Item from "@/app/models/Item";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const items = await Item.find();

    return NextResponse.json({ items }, { status: 200 });
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
    const body = await request.json();
    const itemData = body.formData;

    await Item.create(itemData);

    return NextResponse.json({ message: "Item Created" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const itemData = body.formData;

    await Item.updateOne({ _id: itemData._id }, itemData);

    return NextResponse.json({ message: "Item Updated" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const itemData = body.formData;

    await Item.deleteOne({ _id: itemData._id });

    return NextResponse.json({ message: "Item Deleted" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
