import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UseContinuousCheck from "../hooks/query/UseContinuousCheck";
import UseAllUser from "../hooks/query/UseAllUser";
import UseUserRooms from "../hooks/query/UseUserRooms";
import Loading from "../components/Loading";
import GlobalForm from "../containers/GlobalForm";
import SideNavbar from "../containers/SideNavbar";

const RootLayout = () => {
  const navigate = useNavigate();

  const {
    isError,
    error,
    isSuccess,
    data: user,
    isLoading,
  } = UseContinuousCheck();

  const { isLoading: usersIsLoading, isError: usersIsError } =
    UseAllUser(isSuccess);

  const { isLoading: roomsIsLoading, isError: roomssIsError } =
    UseUserRooms(isSuccess);

  useEffect(() => {
    if (isError || usersIsError || roomssIsError) {
      navigate(`/login?msg=${error.message}`);
    }
  }, [isError, usersIsError, roomssIsError, error, navigate]);

  if (isLoading || usersIsLoading || roomsIsLoading) {
    return <Loading />;
  }

  if (!user) return;

  return (
    <main className="max-w-full h-screen">
      <SideNavbar />
      <Outlet />
      <GlobalForm />
    </main>
  );
};

export default RootLayout;
