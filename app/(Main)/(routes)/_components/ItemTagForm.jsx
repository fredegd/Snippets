"use client";
import React, { useState } from "react";
import { PlusCircle, MinusCircle } from "lucide-react";
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
    setTags(updatedTags);
  };

  const handleRemoveTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  return (
    <div className="ml-auto">
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
              <MinusCircle />
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

          <button type="submit">
            <PlusCircle />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemTagForm;