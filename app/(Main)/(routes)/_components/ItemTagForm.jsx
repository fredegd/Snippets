"use client";
import React, { useState } from "react";

const ItemTagForm = ({ tags, itemId }) => {
  const [tagFormData, setTagFormData] = useState(tags);
  const [newTag, setNewTag] = useState("");

  const addTag = async (e) => {
    e.preventDefault();

    if (newTag.trim() !== "") {
      // Make a request to create a new tag
      const res = await fetch("/api/Tags", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ tag: newTag.trim() }),
      });

      if (res.ok) {
        const createdTag = await res.json();

        // Add the created tag to the form data
        setTagFormData((prevData) => [...prevData, createdTag.created.tag]);
        setNewTag("");
      } else {
        // Handle error when creating the tag
        console.error("Failed to create tag");
      }
    }
  };

  const handleTagChange = (e, index) => {
    const updatedTags = [...tagFormData];
    updatedTags[index] = e.target.value;
    setTagFormData((prevData) => ({
      ...prevData,
      itemTags: updatedTags,
    }));
  };

  const handleRemoveTag = (index) => {
    const updatedTags = [...tagFormData];
    updatedTags.splice(index, 1);
    setTagFormData((prevData) => ({
      ...prevData,
      itemTags: updatedTags,
    }));
  };

  return (
    <div className=" flex justify-center">
      <form
        onSubmit={addTag}
        method="post"
        className="flex flex-col gap-3 w-1/2"
      >
        <label>Tags</label>

        {tagFormData.map((tag, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              id={`itemTag_${index}`}
              name="itemTags"
              type="text"
              onChange={(e) => handleTagChange(e, index)}
              value={tag}
            />
            <span
              onClick={() => handleRemoveTag(index)}
              className="cursor-pointer"
            >
              Remove
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <input
            id="newTag"
            name="newTag"
            type="text"
            onChange={(e) => setNewTag(e.target.value)}
            value={newTag}
          />
          <input type="submit" value="Add tag +" />
        </div>
      </form>
    </div>
  );
};

export default ItemTagForm;
