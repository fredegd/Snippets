const gitHubUrl =
  "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc";

const url = "/api/Items";

export const getItems = async () => {
  try {
    const res = await fetch(url, {
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
