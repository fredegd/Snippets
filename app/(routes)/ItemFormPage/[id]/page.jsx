"use client";
import React, { useState, useEffect } from "react";
import { getItemById } from "@/app/_services";
// import { getItemById } from "../../../_services/index";
import EditItemForm from "@/app/(components)/EditItemForm";

export default function ItemFormPage({ params }) {
  console.log(params.id, "params.id in the form page");

  const [itemData, setItemData] = useState();

  const EDITMODE = params.id === "new" ? false : true;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getItemById(params.id);
      setItemData(data?.foundItem);
    };

    if (EDITMODE) {
      fetchData();
    } else {
      setItemData({
        _id: "new",
      });
    }
  }, [EDITMODE, params.id]);

  return (
    <div>
      {EDITMODE ? <h1>Edit Item</h1> : <h1>Add Item</h1>}
      <div>
        {itemData ? (
          <EditItemForm item={itemData} />
        ) : (
          <div className="flex justify-center items-center h-screen">
            <h2>Loading...</h2>
          </div>
        )}
      </div>
    </div>
  );
}
