"use client";
import React, { useState, useEffect } from "react";
import { getItemById } from "@/app/_services";
import ItemForm from "@/app/(Main)/(routes)/_components/ItemForm";

export default function ItemFormPage({ params }) {
  console.log(params.id, "params.id in the form page");

  const [itemData, setItemData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getItemById(params.id);
      setItemData(data?.foundItem);
    };
    fetchData();
  }, [params.id]);

  return (
    <div>
      <h1>Editor</h1>
      <div>
        {itemData ? (
          <ItemForm item={itemData} />
        ) : (
          <div className="flex justify-center items-center h-screen">
            <h2>Loading...</h2>
          </div>
        )}
      </div>
    </div>
  );
}
