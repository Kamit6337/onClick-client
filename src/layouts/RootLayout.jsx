import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UseContinuousCheck from "../hooks/query/UseContinuousCheck";
import UseAllUser from "../hooks/query/UseAllUser";
import UseUserRooms from "../hooks/query/UseUserRooms";
import Loading from "../containers/Loading";
import GlobalForm from "../containers/GlobalForm";
import SideNavbar from "../containers/SideNavbar";
import UseRooms from "../hooks/query/UseRooms";

const RootLayout = () => {
  const navigate = useNavigate();

  const { isError, error, isSuccess, isLoading } = UseContinuousCheck();

  const { isLoading: usersIsLoading, error: usersError } =
    UseAllUser(isSuccess);

  const { isLoading: userRoomsIsLoading, error: userRoomsError } =
    UseUserRooms(isSuccess);

  const { isLoading: roomsIsLoading, error: roomsError } = UseRooms(isSuccess);

  useEffect(() => {
    if (isError || usersError || userRoomsError || roomsError) {
      navigate(
        `/login?msg=${
          error.message ||
          usersError.message ||
          userRoomsError.message ||
          roomsError.message
        }`
      );
    }
  }, [isError, usersError, userRoomsError, roomsError, error, navigate]);

  if (isLoading || usersIsLoading || roomsIsLoading || userRoomsIsLoading) {
    return <Loading />;
  }

  if (isError || usersError || userRoomsError || roomsError) return;

  return (
    <main className="max-w-full h-screen">
      <SideNavbar />
      <Outlet />
      <GlobalForm />
    </main>
  );
};

export default RootLayout;
