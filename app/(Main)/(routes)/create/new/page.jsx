"use client";
import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ItemForm from "@/app/(Main)/(routes)/_components/ItemForm";

export default function ItemFormPage({ params }) {
  const { data, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      setLoading(false);
    } else {
      router.push("/login");
    }
  }, [router, status]);

  const [itemData, setItemData] = useState({
    _id: "new",
  });

  return !loading ? (
    <div>
      <h1>Create new Item</h1>
      <div>
        <ItemForm item={itemData} setItem={setItemData} />
      </div>
    </div>
  ) : null;
}
