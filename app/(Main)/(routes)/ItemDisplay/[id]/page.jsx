"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { getItemById } from "../../../../_services";
import CoverPage from "./_components/CoverPage";
import ItemDetails from "./_components/ItemDetails";
import { useSession } from "next-auth/react";
import { FilePenLine } from "lucide-react";

export default function ItemPreview({ params }) {
  const { status } = useSession();
  console.log(status);
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
            {status == "authenticated" && (
              <Link
                href={`/editItem/${item._id}`}
                style={{ display: "contents" }}
              >
                <span className="w-20 ml-auto p-1  flex justify-center text-gray-500 hover:text-orange-500 cursor-pointer">
                  <FilePenLine />
                  Edit
                </span>
              </Link>
            )}
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
