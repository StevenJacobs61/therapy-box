import { useState, useEffect } from "react";

interface News {
  headline: string;
  subtext: string;
  linkUrl: string;
}

const useBBCNews = (): News => {
  const [news, setNews] = useState<News>({
    headline: "",
    subtext: "",
    linkUrl: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/news`);
        const blob = await res.blob();
        const reader = new FileReader();
        reader.onload = () => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(reader.result as string, "text/xml");
          const items = xmlDoc.getElementsByTagName("item");
          const firstItem = items[0];
          const headline = firstItem
            .getElementsByTagName("title")[0]
            ?.childNodes[0]?.nodeValue ?? "";
          const subtext = firstItem
            .getElementsByTagName("description")[0]
            ?.childNodes[0]?.nodeValue ?? "";
          const linkUrl = firstItem
            .getElementsByTagName("link")[0]
            ?.childNodes[0]?.nodeValue ?? "";
          const imageUrl = fetchImageUrl(linkUrl);
          setNews({ headline, subtext, linkUrl });
        };
        reader.readAsText(blob);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return news;
};


export default useBBCNews;

export const fetchImageUrl = async (linkUrl: string): Promise<string> => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/image`, {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ linkUrl })
    });
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const imgElement = doc.querySelector(".ssrcss-evoj7m-Image.ee0ct7c0");
    const imageUrl = imgElement?.getAttribute("src") ?? "";
    return imageUrl;
  };
    
