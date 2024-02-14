"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import DeleteBlock from "./DeleteBlock";

const EditItemForm = ({ tags }) => {
  const [formData, setFormData] = useState(startingItemData);
  const [newTag, setNewTag] = useState(""); // State to hold the new tag being entered

  const addItemTag = () => {
    if (newTag.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        itemTags: [...prevData.itemTags, newTag.trim()],
      }));
      setNewTag(""); // Clear the new tag input
    }
  };

  const handleTagChange = (e, index) => {
    const updatedTags = [...formData.itemTags];
    updatedTags[index] = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      itemTags: updatedTags,
    }));
  };

  const handleRemoveTag = (index) => {
    const updatedTags = [...formData.itemTags];
    updatedTags.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      itemTags: updatedTags,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      console.log(e.target.files[0]);
      setFormData((preState) => ({
        ...preState,
        [name]: e.target.files[0],
        [name]: value,
      }));
    } else {
      console.log(name, value, type);
      setFormData((preState) => ({
        ...preState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/Items/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      if (!res.ok) {
        throw new Error("Failed to update item");
      }
    } else {
      const res = await fetch("/api/Items", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      if (!res.ok) {
        throw new Error("Failed to create item");
      }
    }

    router.refresh();
    router.push("/browse");
  };

  return (
    <div className=" flex justify-center">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/2"
      >
        <label>Banner</label>
        <input
          id="imageBanner"
          name="imageBanner"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.imageBanner}
        />
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows="5"
        />
        <label>Level</label>
        <select
          name="level"
          value={formData.level}
          required={true}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="beginner">Beginner</option>
          <option value="medium">Medium</option>
          <option value="advanced">Advanced</option>
        </select>

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          required={true}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="Snippet">Snippet</option>
          <option value="Cheatsheet">Cheatsheet</option>
          <option value="Tutorial">Tutorial</option>
          <option value="Essay">Essay</option>
        </select>

        <label>Tags</label>

        {formData.itemTags?.map((tag, index) => (
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
          <span onClick={addItemTag} className="cursor-pointer">
            Add tag +
          </span>
        </div>
        <input
          type="submit"
          className="btn max-w-xs border border-orange-accent bg-slate-200 hover:bg-orange-accent"
          value={EDITMODE ? "Update item" : "Create item"}
        />
      </form>
      {EDITMODE && <DeleteBlock id={item._id} />}
    </div>
  );
};

export default EditItemForm;
