import { useQuery } from "@tanstack/react-query";
import { getReq } from "../../utils/api/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fillAllUsers } from "../../redux/slice/AllUserSlice";

const UseAllUser = (isSuccess = false) => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["allUser"],
    queryFn: () => getReq("/user/all"),
    staleTime: Infinity,
    enabled: isSuccess,
  });

  useEffect(() => {
    if (query?.isSuccess) {
      dispatch(fillAllUsers(query.data));
    }
  }, [query, dispatch]);

  return query;
};

export default UseAllUser;
