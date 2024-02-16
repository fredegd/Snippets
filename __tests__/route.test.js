import { GET, POST } from "../app/api/Items/[id]/route";
import Item from "@/app/models/Item";
import { NextResponse } from "next/server";

jest.mock("@/app/database");
jest.mock("@/app/models/Item");

describe("GET", () => {
  it("should return the items", async () => {
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
    Item.find.mockResolvedValue(items);

    const response = await GET();

    expect(response).toEqual(NextResponse.json(items));
  });
});

describe("POST", () => {
  it("should create a new item", async () => {
    const newItem = { id: 3, name: "Item 3" };
    const request = { body: { name: "Item 3" } };
    Item.create.mockResolvedValue(newItem);

    const response = await POST(request);

    expect(response).toEqual(NextResponse.json(newItem));
  });
});
