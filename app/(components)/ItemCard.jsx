import DeleteBlock from "./DeleteBlock";
import ProgressDisplay from "./ProgressDisplay";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

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

    const date = new Date(timestamp);

    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  }

  const createdDateTime = formatTimestamp(item.createdAt);

  return (
    <div className="flex flex-col hover:bg-card-hover bg-card rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <div>
          <Image
            width={200}
            height={300}
            src="https://images.unsplash.com/photo-1589443184442-719996f6e523"
            alt="random-img"
            className="rounded-md"
          />
        </div>
        <div className="ml-auto">
          <Link href={`/ItemPage/${item._id}`} style={{ display: "contents" }}>
            <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
          </Link>
        </div>
      </div>
      <Link href={`/ItemDisplay/${item._id}`} style={{ display: "contents" }}>
        <h4 className="mb-1">{item.title}</h4>
        <hr className="h-px  border-0 bg-page mb-2 "></hr>
        <p className="whitespace-pre-wrap">{item.description}</p>

        <div className="flex-grow"></div>
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs  my-1">{createdDateTime}</p>
            {/* <ProgressDisplay progress={50} /> */}
          </div>
          <div className="ml-auto  flex items-end">
            <span>{item._id}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;
