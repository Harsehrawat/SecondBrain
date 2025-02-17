import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function useFetchContent() {
  const [content, setContent] = useState<{ title: string; link: string; type: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [username ,setUsername] = useState<string>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/content`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        setContent(response.data.content || []);
        setLoading(false);
        setUsername(response.data.username);
        console.log(`username received by FE:${response.data.username}`);
        if(response.data.message){
          setError(response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching content:", err);
        setError("Sever error occured");
        setLoading(false);
      });
  }, []);

  return { content, loading, error,username };
}

