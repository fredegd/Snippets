import { useEffect } from "react";
import Chapter from "./Chapter";
import { Book } from "lucide-react";

export default function ItemDetails({ item }) {
  useEffect(() => {
    console.log(item, "is the item");
  }, [item]);
  return (
    <div className="mt-5 p-5 rounded-md border ">
      {item ? (
        <>
          <div>
            <h1 className=" font-medium">
              <strong>{item.title}</strong>
            </h1>

            <div className="flex items-center my-5">
              {item.chapterSection ? (
                <>
                  <h2 className="text-[15px] text-black">
                    <Book className="h-4 w-4" />
                  </h2>
                  <h2 className="text-[15px] text-gray-400 mx-2">
                    {item.chapterSection?.length}
                    {"  chapters"}
                  </h2>
                </>
              ) : null}
              {item.itemTags.map((tag, index) => (
                <h2 key={index} className="text-[15px] text-orange-400 mx-2">
                  {tag}
                </h2>
              ))}
            </div>

            <h6>{item.description}</h6>
          </div>
          <div className="mt-5">
            {item.chapterSection?.map((chapter) => (
              <Chapter key={chapter.id} content={chapter} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
