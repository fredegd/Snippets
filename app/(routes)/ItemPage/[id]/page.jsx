import EditItemForm from "@/app/(components)/EditItemForm";

// import { getItemById } from "@/app/_services";
import { getItemById } from "../../../_services/index";

// const getItemById = async (id) => {
//   try {
//     const res = await fetch(`http://localhost:3000/api/Items/${id}`, {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch item");
//     }

//     return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

export default async function ItemPage({ params }) {
  let updateItemData = {};
  const EDITMODE = params.id === "new" ? false : true;

  if (EDITMODE) {
    updateItemData = await getItemById(params.id);
    updateItemData = updateItemData?.foundItem;
  } else {
    updateItemData = {
      _id: "new",
    };
  }
  return <EditItemForm item={updateItemData} />;
}
