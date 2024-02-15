"use client";
import React, { useState, useEffect } from "react";
import { getItemById } from "@/app/_services";
import ItemForm from "@/app/(Main)/(routes)/_components/ItemForm";
import { ChevronLeftCircle } from "lucide-react";
import Link from "next/link";

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
      <div className=" flex justify-between">
        <h1>Editor</h1>

        <Link href={`../ItemDisplay/${params.id}`}>
          <h3 className="flex gap-2 items-center hover:text-orange-400">
            <ChevronLeftCircle />
            {" Back to item"}
          </h3>
        </Link>
      </div>
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
