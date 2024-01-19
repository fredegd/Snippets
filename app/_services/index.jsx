export const getItems = async () => {
  try {
    const res = await fetch("/api/Items", {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Items");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading Items: ", error);
  }
};

export const getItembyId = async (id) => {
  const url = `/api/Items/${id}`;
  // const url = `http://localhost:3000/api/Items/${id}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch item");
    }
    console.log(res.body, " is the body response of api/Items/id");
    return res.json();
  } catch (error) {
    console.log("error", error);
  }
};
