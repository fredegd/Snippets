"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import DeleteBlock from "./DeleteBlock";

const EditItemForm = ({ item }) => {
  console.log(item, "is the item passed to the form");
  const EDITMODE = item._id === "new" ? false : true;
  const router = useRouter();
  const startingItemData = {
    imageBanner: "some image",
    title: "",
    description: "",
    level: "",
    category: "",
    itemTags: [],
    itemChapters: [],
    votes: 0,
    comments: [],
    author: "60f1b0b9e6b3a1b4a8f1b0b9",
  };

  if (EDITMODE) {
    startingItemData["imageBanner"] = item.imageBanner;
    startingItemData["title"] = item.title;
    startingItemData["description"] = item.description;
    startingItemData["level"] = item.level;
    startingItemData["category"] = item.category;
    startingItemData["itemTags"] = item.itemTags;
    startingItemData["itemChapters"] = item.itemChapters;
  }

  const [formData, setFormData] = useState(startingItemData);

  const addItemTag = () => {
    console.log(formData.itemTags.length);
    if (
      formData.itemTags.length >= 0 &&
      formData.itemTags[formData.itemTags.length - 1] !== ""
    ) {
      setFormData((preState) => ({
        ...preState,
        itemTags: [...preState.itemTags, ""],
      }));
    } else {
      alert("Please fill the empty tag first");
      return;
    }
  };
  const handleTagChange = (e) => {
    const value = e.target.value;
    const index = e.target.getAttribute("data-index");

    setFormData((preState) => {
      const updatedItemTags = [...preState.itemTags];
      updatedItemTags[index] = value;

      return {
        ...preState,
        itemTags: updatedItemTags,
      };
    });
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
      console.log(formData, "formData");
      const res = await fetch("/api/Items", {
        method: "POST",
        body: JSON.stringify({ formData }),
        //@ts-ignore
        "Content-Type": "application/json",
      });
      console.log(res);
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
        <h3>{EDITMODE ? "Update item" : "Create New item"}</h3>
        {/* <label>Image banner</label>
        <input
          id="banner"
          name="imageBanner"
          type="file"
          onChange={handleChange}
          required={true}
          // value={formData.imageBanner}
        /> */}
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

        {/* <label>Tags</label>
        <div className="grid grid-cols-2">
          {formData.itemTags?.map((itemTag, index) => (
            <input
              key={index}
              onChange={handleTagChange}
              type="text"
              value={itemTag}
              data-index={index}
            />
          ))}
        </div>

        <span onClick={addItemTag}>Add tag +</span> */}

        <input
          type="submit"
          className="btn max-w-xs"
          value={EDITMODE ? "Update item" : "Create item"}
        />
      </form>
      {EDITMODE && <DeleteBlock id={item._id} />}
    </div>
  );
};

export default EditItemForm;
