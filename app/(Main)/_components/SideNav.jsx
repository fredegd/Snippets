"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileSearch, Store, Bookmark, PackagePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useSession } from "next-auth/react";

export default function SideBarNav() {
  const { status } = useSession();
  const user = status === "authenticated";
  const router = useRouter();
  const menuList = [
    {
      name: "Browse",
      icon: FileSearch,
      path: "/browse",
      protected: false,
    },

    {
      name: "Create",
      icon: PackagePlus,
      path: "/create/new",
      protected: true,
    },

    {
      name: "Favourites",
      icon: Bookmark,
      path: "/collections/favourites",
      protected: true,
    },
    {
      name: "About",
      icon: Store,
      path: "/about",
      protected: false,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="h-full  md:w-64 xs:w-32  b-white border-r flex flex-col overflow-y-auto shadow-md ">
      <Link href={"/"}>
        <div className="h-24 flex flex-col items-center justify-center  border-b">
          <Image
            src={"/logo.svg"}
            className="w-3/4 hidden sm:block md:hidden"
            alt={"logo"}
            width={100}
            height={70}
          />
          <Image
            src={"/cs_logo.svg"}
            className="w-11/12 hidden md:block"
            alt={"logo"}
            width={100}
            height={70}
          />
        </div>
      </Link>
      <div className="flex flex-col">
        {menuList.map((item, index) => {
          // if the user is not logged in and the index is greater than 1 (user routes)
          // shows nothing else than the Browse and About button
          return !user && item.protected ? null : (
            <Link href={item.path} passHref={true} key={index}>
              <div
                className={`flex gap-2 items-center p-5 px-6 text-gray-500
                           hover:bg-gray-100 cursor-pointer
              ${activeIndex === index ? "bg-orange-100 text-orange-500" : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                <item.icon className="h-6 w-6" />
                <h4 className="md:flex hidden">{item.name}</h4>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
