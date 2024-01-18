import { getItembyId } from "@/app/_services";
import EditItemForm from "@/app/(components)/EditItemForm";

let updateItemData;

const ItemPage = async ({ params }) => {
  const { id } = params;
  console.log(id, "id");
  const EDITMODE = params.id === "new" ? false : true;

  if (EDITMODE) {

    updateItemData = await getItembyId(id);

    updateItemData = updateItemData?.foundItem;
  } else {
    updateItemData = {
      _id: "new",
    };
  }
  //   return <div>Item Page{params.id}</div>;
  return updateItemData && <EditItemForm item={updateItemData} />;
};

export default ItemPage;
