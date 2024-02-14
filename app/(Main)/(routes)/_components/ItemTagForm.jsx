"use client";
import React, { useState } from "react";
const ItemTagForm = ({ tags, setTags }) => {
  const [newTag, setNewTag] = useState("");

  const addItemTag = async (e) => {
    e.preventDefault();

    if (newTag.trim() !== "") {
      setTags((prevData) => [...prevData, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleTagChange = (e, index) => {
    const updatedTags = [...tags];
    updatedTags[index] = e.target.value;
    setTags((prevData) => [...prevData, updatedTags]);
  };

  const handleRemoveTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags((prevData) => [...prevData, updatedTags]);
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={addItemTag}
        method="post"
        className="flex flex-col gap-3 w-1/2"
      >
        <label>Tags</label>

        {tags.map((tag, index) => (
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