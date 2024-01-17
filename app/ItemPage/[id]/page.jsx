import EditItemForm from "@/app/(components)/EditItemForm";

const getItembyId = async (id) => {
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

let updateItemData = {};

const ItemPage = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true;

  if (EDITMODE) {
    updateItemData = await getItembyId(params.id);
    updateItemData = updateItemData.foundItem;
  } else {
    updateItemData = {
      _id: "new",
    };
  }
  //   return <div>Item Page{params.id}</div>;
  return <EditItemForm item={updateItemData} />;
};

export default ItemPage;
