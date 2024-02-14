import React from "react";

function DisplayItem({ item }) {
  console.log(item, "item");
  if (!item) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="p-5">
        <div className="mb-4">
          <h1>{item?.title}</h1>
          <p>{item?.description}</p>
          <p>{item?.category}</p>
        </div>
      </div>
    );
  }
}
export default DisplayItem;
