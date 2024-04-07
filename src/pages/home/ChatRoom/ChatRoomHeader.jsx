/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../../../assets/icons";
import UseContinuousCheck from "../../../hooks/query/UseContinuousCheck";
import OnClickOutside from "../../../lib/onClickOutside";
import { toggleUpdateGroupChatForm } from "../../../redux/slice/toggleSlice";
import DeleteSingleChat from "../../../hooks/mutation/DeleteSingleChat";
import DeleteGroupChat from "../../../hooks/mutation/DeleteGroupChat";
import Toastify from "../../../lib/Toastify";
import { deleteReq } from "../../../utils/api/api";
import { InitialDataState } from "../../../redux/slice/InitialDataSlice";

const ChatRoomHeader = ({ chatMessages }) => {
  const dispatch = useDispatch();
  const { activeRoom } = useSelector(InitialDataState);
  const { data: user } = UseContinuousCheck(true);
  const [toggleOptions, setToggleOptions] = useState(false);
  const [deleteOption, setDeleteOption] = useState("Delete");
  const { ToastContainer, showErrorMessage } = Toastify();

  const filterChatMessages = useMemo(() => {
    if (!chatMessages) return [];
    const filter = chatMessages.filter((chat) => !chat.isLabel);
    return filter;
  }, [chatMessages]);

  useEffect(() => {
    if (
      activeRoom &&
      activeRoom.isGroupChat &&
      activeRoom.admin?._id !== user._id
    ) {
      setDeleteOption("Leave Group");
    } else {
      setDeleteOption("Delete");
    }
  }, [activeRoom, user]);

  const handleDelete = async () => {
    try {
      await deleteReq("/room/single", {
        id: activeRoom._id,
      });
    } catch (error) {
      showErrorMessage({ message: error.message });
    }
  };

  const success = () => {
    setToggleOptions(false);
  };

  const { ref: optionRef } = OnClickOutside(success);

  return (
    <>
      <div className="relative w-full h-14 bottom_box_shadow flex justify-between items-center px-4 text-color_4 border-b border-color_3">
        {/* MARK: LEFT SIDE - NAME OR GROUP NAME */}
        {activeRoom?.isGroupChat ? (
          <div className="flex gap-2 items-center w-60">
            <p>{activeRoom?.name}</p>
            <p className="text-xs">{activeRoom?.members.length} members</p>
          </div>
        ) : (
          <p className="w-60 mobile:w-max">
            {activeRoom?.members?.find((id) => id !== user.id).name}
          </p>
        )}

        <p className="mr-40 mobile:mr-0 whitespace-nowrap">
          Total Chat : {filterChatMessages.length}
        </p>
        <div className="relative">
          <p
            className="rounded-full hover:bg-color_2 cursor-pointer p-2"
            onClick={() => setToggleOptions((prev) => !prev)}
            ref={optionRef}
          >
            <Icons.options className="text-xl" />
          </p>
          {toggleOptions && (
            <div className="absolute bg-color_2 z-50 right-0 top-full -mt-1 mr-6 border border-color_3 rounded-xl whitespace-nowrap">
              <p className="px-6 py-3 rounded-t-xl border-b border-color_3 hover:bg-color_1/80 cursor-pointer">
                Info
              </p>
              {activeRoom?.isGroupChat && (
                <p
                  className="px-6 py-3 border-b border-color_3 hover:bg-color_1/80 cursor-pointer"
                  onClick={() => dispatch(toggleUpdateGroupChatForm(true))}
                >
                  Update
                </p>
              )}
              <p
                className="px-6 py-3 rounded-b-xl hover:bg-color_1/80 cursor-pointer"
                onClick={handleDelete}
              >
                {deleteOption}
              </p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ChatRoomHeader;
