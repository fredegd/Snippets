"use client";
import React, { useState, useEffect } from "react";

import { getItemById } from "../../../../_services";
import CoverPage from "./(components)/CoverPage";
import ItemDetails from "./(components)/ItemDetails";

export default function ItemPreview({ params }) {
  console.log(params.id);
  const [item, setItem] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getItemById(params.id);
      setItem(data?.foundItem);
    };
    fetchData();
  }, [params.id]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4">
        {item ? (
          <div className="col-span-3 ">
            <CoverPage data={item} />
            <ItemDetails item={item} />
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <h2>Loading...</h2>
          </div>
        )}
        <div className="col-span-3 xl:col-span-1">{/* chapter list */}</div>
      </div>
    </div>
  );
}
