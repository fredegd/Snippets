"use client";
import React from "react";
import { useRouter } from "next/navigation";

function Logout() {
  const router = useRouter();

  const timer = setTimeout(() => {
    router.push("/login");
  }, 2000);
  return (
    <div className="w-full h-full flex items-center justify-center">
      See You Soon{" "}
    </div>
  );
}

export default Logout;
