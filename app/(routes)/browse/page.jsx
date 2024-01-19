"use client";
import React from "react";
import { useState, useEffect } from "react";
import ItemCard from "../../(components)/ItemCard";

import { getItems } from "../../_services";

function Browse() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getItems();
      setItems(data.items);
    };
    fetchData();
  }, []);

  // const data = getItems();

  // Make sure we have items needed for production build.
  if (!items) {
    return <p>No items.</p>;
  } else {
    // const items = data.items;

    const uniqueCategories = [
      ...new Set(items?.map(({ category }) => category)),
    ];

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
}

export default Browse;
