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

export const getItemById = async (id) => {
  // const url = `/api/Items/${id}`;
  const url = `/api/Items/${id}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch item");
    }
    return res.json();
  } catch (error) {
    console.log("error", error);
  }
};
