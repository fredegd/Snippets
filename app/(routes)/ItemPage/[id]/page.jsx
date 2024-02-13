import EditItemForm from "@/app/(components)/EditItemForm";

// import { getItemById } from "@/app/_services";
import { getItemById } from "../../../_services/index";


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
