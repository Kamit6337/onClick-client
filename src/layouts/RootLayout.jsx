import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UseContinuousCheck from "../hooks/query/UseContinuousCheck";
import UseAllUser from "../hooks/query/UseAllUser";
import UseUserRooms from "../hooks/query/UseUserRooms";
import Loading from "../components/Loading";

const RootLayout = () => {
  const navigate = useNavigate();

  const { isError, error, isSuccess, data: user } = UseContinuousCheck();
  const { isLoading: usersIsLoading, isError: usersIsError } =
    UseAllUser(isSuccess);

  const { isLoading: roomsIsLoading, isError: roomssIsError } =
    UseUserRooms(isSuccess);

  useEffect(() => {
    if (isError || usersIsError || roomssIsError) {
      navigate("/error", {
        state: {
          errMsg: error?.message || "Something went wrong. Please login Again",
        },
      });
    }
  }, [isError, usersIsError, roomssIsError, error, navigate]);

  if (usersIsLoading || roomsIsLoading) {
    return <Loading />;
  }

  if (!user) return;

  return (
    <main className="max-w-full h-screen">
      <Outlet />
    </main>
  );
};

export default RootLayout;
