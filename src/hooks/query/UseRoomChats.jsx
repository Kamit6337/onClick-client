import { useEffect, useState } from "react";
import { getReq } from "../../utils/api/api";

const UseRoomChats = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomChats = async () => {
      setIsLoading(true);
      try {
        const results = await Promise.all(
          data.data.map(async (room) => {
            const fetchChat = await getReq("/chat", { id: room._id });
            return fetchChat.data;
          })
        );

        console.log("results", results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (data) {
      fetchRoomChats();
    }
  }, [data]);

  return { isLoading, error };
};

export default UseRoomChats;
