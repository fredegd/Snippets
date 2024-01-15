import React from "react";
import ItemCard from "./(components)/ItemCard";

const getItems = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Items", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

const Dashboard = async () => {
  const data = await getItems();

  // Make sure we have items needed for production build.
  if (!data?.items) {
    return <p>No items.</p>;
  }

  const items = data.items;

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
};

export default Dashboard;
