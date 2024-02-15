import React, { useState, useEffect } from "react";

const ItemChapterForm = ({ chapters, setChapters }) => {
  const [newChapter, setNewChapter] = useState({
    imageBanner: "",
    title: "",
    description: "",
    content: "",
    chapterNumber: 1,
  });

  useEffect(() => {
    // Fetch existing chapters when the component mounts
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    try {
      const res = await fetch("/api/Chapters");
      const data = await res.json();
      setChapters(data.chapters);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  const addChapter = async () => {
    try {
      const res = await fetch("/api/Chapters", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ formData: newChapter }),
      });

      if (res.ok) {
        const createdChapter = await res.json();
        setChapters((prevChapters) => [...prevChapters, createdChapter]);
        setNewChapter({
          imageBanner: "",
          title: "",
          description: "",
          content: "",
          chapterNumber: newChapter.chapterNumber + 1,
        });
      } else {
        console.error("Failed to create chapter");
      }
    } catch (error) {
      console.error("Error creating chapter:", error);
    }
  };

  const handleChapterChange = (e, field) => {
    setNewChapter((prevChapter) => ({
      ...prevChapter,
      [field]: e.target.value,
    }));
  };

  const removeChapter = async (index, chapterId) => {
    try {
      const res = await fetch(`/api/chapters/${chapterId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setChapters((prevChapters) =>
          prevChapters.filter((_, i) => i !== index)
        );
      } else {
        console.error("Failed to delete chapter");
      }
    } catch (error) {
      console.error("Error deleting chapter:", error);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-1/2">
      <h3>Chapters</h3>

      {chapters.map((chapter, index) => (
        <div key={index} className="flex flex-col items-center gap-2">
          <span>{`Chapter ${chapter.chapterNumber}`}</span>
          <input
            type="text"
            value={chapter.imageBanner}
            onChange={(e) => handleChapterChange(e, "imageBanner")}
            placeholder="Image Banner"
          />
          <input
            type="text"
            value={chapter.title}
            onChange={(e) => handleChapterChange(e, "title")}
            placeholder="Title"
          />
          <textarea
            value={chapter.description}
            onChange={(e) => handleChapterChange(e, "description")}
            placeholder="Description"
            rows="3"
          />
          <textarea
            value={chapter.content}
            onChange={(e) => handleChapterChange(e, "content")}
            placeholder="Content"
            rows="5"
          />
          <span
            onClick={() => removeChapter(index, chapter._id)}
            className="cursor-pointer"
          >
            Remove
          </span>
        </div>
      ))}
      <button onClick={addChapter}>Add Chapter +</button>
    </div>
  );
};

export default ItemChapterForm;
