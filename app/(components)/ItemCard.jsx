import StatusDisplay from "./StatusDisplay";
import PriorityDisplay from "./PriorityDisplay";
import DeleteBlock from "./DeleteBlock";
import ProgressDisplay from "./ProgressDisplay";
import Link from "next/link";

const ItemCard = ({ item }) => {
  function formatTimestamp(timestamp) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    // const date = new Date(timestamp);
    const date = new Date.now();
    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  }

  const createdDateTime = formatTimestamp(item.createdAt);

  return (
    <div className="flex flex-col hover:bg-card-hover bg-card rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <PriorityDisplay priority={item.priority} />
        <div className="ml-auto">
          <DeleteBlock id={item._id} />
        </div>
      </div>
      <Link href={`/itemPage/${item._id}`} style={{ display: "contents" }}>
        <h4 className="mb-1">{item.title}</h4>
        <hr className="h-px  border-0 bg-page mb-2 "></hr>
        <p className="whitespace-pre-wrap">{item.description}</p>

        <div className="flex-grow"></div>
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs  my-1">{createdDateTime}</p>
            <ProgressDisplay progress={item.progress} />
          </div>
          <div className="ml-auto  flex items-end">
            <StatusDisplay status={item.status} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;
