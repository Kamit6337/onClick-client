import { useQuery } from "@tanstack/react-query";
import { getAuthReq } from "../../utils/api/authApi";

const UseContinuousCheck = () => {
  const query = useQuery({
    queryKey: ["continuousCheck"],
    queryFn: () => getAuthReq("/login/check"),
    staleTime: Infinity,
    refetchInterval: 15 * 60 * 1000,
  });
  return query;
};

export default UseContinuousCheck;
