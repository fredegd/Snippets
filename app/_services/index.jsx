export const getItems = async () => {
  try {
    const res = await fetch("/api/Items", {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export const getItembyId = async (id) => {
  // const url = `/api/Items/${id}`;
  const url = `http://localhost:3000/api/Items/${id}`;
  console.log(url, "ist the API request id");
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
