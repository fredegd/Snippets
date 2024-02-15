"use client";
import { MinusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const DeleteBlock = ({ id }) => {
  const router = useRouter();

  const deleteItem = async () => {
    if (
      confirm(`you want to delete item_${id}` + "\n are you sure ???") == true
    ) {
      const res = await fetch(`/api/Items/${id}`, {
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
    <div className=" mx-5 mt-16 p-2 w-full border border-red-500">
      <h5> danger zone !!!</h5>

      <div className="flex items-center ">
        <p>
          Delete this Object. Once you delete there is no going back. Please be
          sure of this action.
        </p>
        <button
          onClick={deleteItem}
          className=" ml-auto flex gap-2 w-48 border rounded-md  border-red-400  items-center justify-center text-red-400  hover:cursor-pointer hover:text-red-200"
        >
          <h5>DELETE ITEM</h5>
          <MinusCircle />
        </button>
      </div>
    </div>
  );
};

export default DeleteBlock;