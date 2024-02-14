"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { getItemById } from "../../../../_services";
import CoverPage from "./_components/CoverPage";
import ItemDetails from "./_components/ItemDetails";

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
            <div className="ml-auto">
              <Link
                href={`/editItem/${item._id}`}
                style={{ display: "contents" }}
              >
                <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>Edit
              </Link>
            </div>
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