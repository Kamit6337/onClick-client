/* eslint-disable react/prop-types */
import UseContinuousCheck from "../../hooks/query/UseContinuousCheck";
import ChatType from "./SidebarMenu/ChatType";
import environment from "../../utils/environment";
import { useDispatch, useSelector } from "react-redux";
import {
  InitialDataState,
  setActiveRoom,
} from "../../redux/slice/InitialDataSlice";

const SERVER_URL = environment.SERVER_URL;

const SidebarMenu = ({ rooms }) => {
  const dispatch = useDispatch();
  const { data: user } = UseContinuousCheck();
  const { activeRoom } = useSelector(InitialDataState);

  const activeRoomSelected = (room) => {
    dispatch(setActiveRoom(room));
  };

  return (
    <div className="relative w-full h-full ">
      {rooms?.length > 0 ? (
        rooms.map((room, i) => {
          const { _id, name, members, photo, isGroupChat } = room;

          if (!isGroupChat) {
            const friend = members.find((friend) => friend._id !== user._id);

            const {
              name: friendName,
              email: friendEmail,
              photo: friendPhoto,
            } = friend;

            const userPhoto = `${SERVER_URL}/${friendPhoto}`;

            return (
              <div
                key={i}
                className={`w-full cursor-pointer hover:bg-color_3 hover:text-color_1 pl-6 border-b border-color_2 p-3 flex items-center gap-4 ${
                  _id === activeRoom?._id && "bg-color_3 text-color_1"
                }`}
                onClick={() => activeRoomSelected(room)}
              >
                <img
                  src={userPhoto}
                  alt="profile"
                  loading="lazy"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div>{friendName}</div>
                  <div className="text-xs">{friendEmail}</div>
                </div>
              </div>
            );
          }

          if (isGroupChat) {
            const groupPhoto = `${SERVER_URL}/${photo}`;

            return (
              <div
                key={i}
                className={`w-full cursor-pointer hover:bg-color_3 hover:text-color_1 pl-6 border-b border-color_2 p-3 flex items-center gap-4 ${
                  _id === activeRoom?._id && "bg-color_3 text-color_1"
                }`}
                onClick={() => activeRoomSelected(room)}
              >
                <img
                  src={groupPhoto}
                  alt="profile"
                  loading="lazy"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="truncate">{name}</div>
                  <div className="text-xs">{members.length} members</div>
                </div>
              </div>
            );
          }
        })
      ) : (
        <div className="w-full h-full flex flex-col justify-center pl-6">
          <p className="text-xl font-semibold tracking-wide">Sorry,</p>
          <p className="mt-1 mb-5">No chat available</p>
          <p className="text-xs">Search the user to create chat.</p>
        </div>
      )}
      <div className="absolute z-40 bottom-0 mb-8 ml-8">
        <ChatType />
      </div>
    </div>
  );
};

export default SidebarMenu;
