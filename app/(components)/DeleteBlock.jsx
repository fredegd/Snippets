"use client";

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const DeleteBlock = ({ id }) => {
  const router = useRouter();

  const deleteItem = async () => {
    if (
      confirm(`you want to delete item_${id}` + "\n are you sure ???") == true
    ) {
      const res = await fetch(`http://localhost:3000/api/Items/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
        router.push("/browse");
      }
    } else {
      return;
    }
  };

  return (
    <div onClick={deleteItem}>
      <FontAwesomeIcon
        icon={faX}
        className=" text-red-400 hover:cursor-pointer hover:text-red-200"
      />
    </div>
  );
};

export default DeleteBlock;