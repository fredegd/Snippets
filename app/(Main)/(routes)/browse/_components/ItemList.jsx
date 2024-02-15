import Image from "next/image";
import Link from "next/link";
import ItemCard from "./ItemCard";

export default function ItemList({ items }) {
  const uniqueCategories = [...new Set(items?.map(({ category }) => category))];

  return (
    <div className="p-5">
      <div>
        {items &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4 ">
                {items
                  .filter((item) => item.category === uniqueCategory)
                  .map((filteredItem, _index) => (
                    <ItemCard id={_index} key={_index} item={filteredItem} />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

