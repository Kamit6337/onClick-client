import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getReq } from "../../utils/api/api";
import { useEffect } from "react";
import { initialRoomsAndChats } from "../../redux/slice/InitialDataSlice";

const UseRooms = (isSuccess = false) => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["fetchRooms"],
    queryFn: () => getReq("/room"),
    enabled: isSuccess,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (query?.data) {
      dispatch(initialRoomsAndChats(query.data));
    }
  }, [query, dispatch]);

  return query;
};

export default UseRooms;
