import axios from "axios";
import { useState } from "react";
import { UrlInfo } from "../types/url";

export function useCrawl() {
  const [data, setData] = useState<UrlInfo | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");

  const crawl = (url: string, depth: number, maxUrl: number) => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
    setIsloading(true);
    axios.get<UrlInfo>(`${API_URL}/crawl`, {
      params: {
        url,
        depth,
        maxUrl
      }
    }).then((res) => {
      setData(res.data);
      setError("");
    }).catch((err) => {
      if (typeof err === "string") {
        setError(err);
      } else {
        setError("Something wrong happened");
      }
    }).finally(() => {
      setIsloading(false);
    })
  };

  return {
    crawl,
    data,
    isLoading,
    error,
  };
}
