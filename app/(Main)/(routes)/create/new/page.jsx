"use client";
import React, { useState, useEffect } from "react";
import ItemForm from "@/app/(Main)/(routes)/_components/ItemForm";

export default function ItemFormPage({ params }) {
  const [itemData, setItemData] = useState({
    _id: "new",
  });

  return (
    <div>
      <h1>Create new Item</h1>
      <div>
        {itemData ? (
          <ItemForm item={itemData} setItem={setItemData} />
        ) : (
          <div className="flex justify-center items-center h-screen">
            <h2>Loading...</h2>
          </div>
        )}
      </div>
    </div>
  );
}
