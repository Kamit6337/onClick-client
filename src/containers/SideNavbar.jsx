import { useDispatch, useSelector } from "react-redux";
import OnClickOutside from "../lib/onClickOutside";
import {
  toggleInitialState,
  toggleSideNavbar,
} from "../redux/slice/toggleSlice";
import UseContinuousCheck from "../hooks/query/UseContinuousCheck";
import environment from "../utils/environment";
import { getAuthReq } from "../utils/api/authApi";
import { useNavigate } from "react-router-dom";
import Toastify from "../lib/Toastify";

const SideNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sideNavbar } = useSelector(toggleInitialState);
  const { data: user } = UseContinuousCheck();
  const { ToastContainer, showErrorMessage } = Toastify();

  const handleLogout = async () => {
    try {
      const logoutReq = await getAuthReq("/logout");
      console.log("logout req", logoutReq);
      navigate("/login");

      window.location.reload();
    } catch (error) {
      showErrorMessage({
        message: error.message || "Issues in Logout. Try later...",
      });
    }
  };

  const modifyPhoto = `${environment.SERVER_URL}/${user.photo}`;
  return (
    <>
      {sideNavbar && (
        <div className="absolute z-[49] top-0 left-0 w-full h-full backdrop-blur-sm" />
      )}
      <main
        className={`h-full w-80 bg-red-300 transition-all duration-700 absolute z-50 top-0 left-0`}
        style={{ transform: `translateX(${sideNavbar ? "0%" : "-100%"})` }}
        onMouseLeave={() => dispatch(toggleSideNavbar(false))}
      >
        <div className="p-6 border-b">
          <div className="w-14">
            <img
              src={modifyPhoto}
              alt={user.name}
              className="w-full object-cover rounded-full"
            />
          </div>
          <div className="mt-2 text-xs">
            <p className="text-sm">{user.name}</p>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="absolute bottom-0 w-full p-6 flex justify-center border-t">
          <div
            className="border py-2 px-14 rounded-md cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
};

export default SideNavbar;
