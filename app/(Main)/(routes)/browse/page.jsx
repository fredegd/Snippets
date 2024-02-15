"use client";
import React from "react";
import { useState, useEffect } from "react";
import ItemCard from "./_components/ItemCard";
import { getItems } from "@/app/_services/index";
import CategoryFilter from "./_components/CategoryFilter";
import ItemList from "./_components/ItemList";

function Browse() {
  const [items, setItems] = useState();
  const [allItems, setAllItems] = useState();
  const [tagFilters, setTagFilters] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getItems().then((res) => {
        setItems(res?.items);
        setAllItems(res?.items);

        const tags = new Set();
        tags.add("all tags");
        res.items.forEach((item) => {
          item.itemTags.forEach((tag) => {
            tags.add(tag);
          });
        });
        let uniqueTag = Array.from(tags);
        setTagFilters(uniqueTag);
      });
    };
    fetchData();
  }, []);

  const filterItemsByTag = (tag) => {
    if (tag === "all tags") {
      setItems(allItems);
      return;
    }
    const filtered = allItems.filter((item) => {
      return item.itemTags.includes(tag);
    });

    setItems(filtered);
  };

  return (
    <div>
      {tagFilters ? (
        <CategoryFilter
          filters={tagFilters}
          selectedTag={(tag) => filterItemsByTag(tag)}
        />
      ) : null}
      {items ? (
        <ItemList items={items} />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );

  // if (!items) {
  //   return <p>Loading...</p>;
  // } else {
  //   const uniqueCategories = [
  //     ...new Set(items?.map(({ category }) => category)),
  //   ];

  //   return (
  //     <div className="p-5">
  //       <div>
  //         {items &&
  //           uniqueCategories?.map((uniqueCategory, categoryIndex) => (
  //             <div key={categoryIndex} className="mb-4">
  //               <h2>{uniqueCategory}</h2>
  //               <div className="lg:grid grid-cols-2 xl:grid-cols-4 ">
  //                 {items
  //                   .filter((item) => item.category === uniqueCategory)
  //                   .map((filteredItem, _index) => (
  //                     <ItemCard id={_index} key={_index} item={filteredItem} />
  //                   ))}
  //               </div>
  //             </div>
  //           ))}
  //       </div>
  //     </div>
  //   );
  // }
}

export default Browse;
