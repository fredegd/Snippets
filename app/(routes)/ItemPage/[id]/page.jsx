// import { getItembyId } from "@/app/_services";
import EditItemForm from "@/app/(components)/EditItemForm";

const getItemById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Items/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch item");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};



const ItemPage = async ({ params }) => {
  let updateItemData = {};

console.log(updateItemData, "updateItemData first");
  const EDITMODE = params.id === "new" ? false : true;

  if (EDITMODE) {
    updateItemData = await getItemById(params.id);
    updateItemData = updateItemData?.foundItem;
    console.log(updateItemData, "updateItemData");
  } else {
    updateItemData = {
      _id: "new",
    };
  }
  //   return <div>Item Page{params.id}</div>;
  return <EditItemForm item={updateItemData} />;
};

export default ItemPage;
