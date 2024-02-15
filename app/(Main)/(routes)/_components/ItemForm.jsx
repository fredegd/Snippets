"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import ItemTagForm from "./ItemTagForm";
import DeleteBlock from "./DeleteBlock";

const EditItemForm = ({ item, setItem }) => {
  const router = useRouter();

  const EDITMODE = item._id === "new" ? false : true;
  const startingItemData = !EDITMODE
    ? {
        imageBanner:
          "https://images.unsplash.com/photo-1589443184442-719996f6e523",
        title: "",
        description: "",
        level: "",
        category: "",
        itemTags: [],
        itemChapters: [],
        votes: 0,
        comments: [],
        author: "60f1b0b9e6b3a1b4a8f1b0b9",
      }
    : {
        imageBanner: item.imageBanner,
        title: item.title,
        description: item.description,
        level: item.level,
        category: item.category,
        itemTags: item.itemTags,
        itemChapters: item.itemChapters,
        votes: 0,
        comments: [],
        author: "60f1b0b9e6b3a1b4a8f1b0b9",
      };

  const [formData, setFormData] = useState(startingItemData);
  const [tags, setTags] = useState(EDITMODE ? item.itemTags : []);

  useEffect(() => {
    console.log("tag", tags);
    setFormData((prevState) => ({ ...prevState, itemTags: tags }));
  }, [tags]);

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
    <div className=" flex flex-col justify-center">
      <div className="flex">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col gap-3 w-4/6"
        >
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

          <label>Image banner</label>
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

          <input
            type="submit"
            className="btn max-w-xs border border-orange-accent bg-slate-200 hover:bg-orange-accent"
            value={EDITMODE ? "SAVE CHANGES" : "CREATE ITEM"}
          />
        </form>
        <ItemTagForm tags={tags} setTags={setTags} />
      </div>
      <div className="flex flex-col">
        {EDITMODE && <DeleteBlock id={item._id} />}
      </div>
    </div>
  );
};

export default EditItemForm;
