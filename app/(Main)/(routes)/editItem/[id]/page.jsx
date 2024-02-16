"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { getItemById } from "@/app/_services";
import ItemForm from "@/app/(Main)/(routes)/_components/ItemForm";
import { ChevronLeftCircle } from "lucide-react";
import Link from "next/link";

export default function ItemFormPage({ params }) {
  const { data, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [itemData, setItemData] = useState();

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(false);
    } else {
      setLoading(true);
      router.push("/login");
    }
  }, [router, status]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getItemById(params.id);
      setItemData(data?.foundItem);
    };
    fetchData();
  }, [params.id]);

  return !loading ? (
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
        <ItemForm item={itemData} />
      </div>
    </div>
  ) : null;
}
