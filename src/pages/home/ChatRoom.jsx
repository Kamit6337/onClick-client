/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useLayoutEffect, useMemo, useRef } from "react";
import ChatMediaMessage from "./ChatRoom/ChatMediaMessage";
import { useSelector } from "react-redux";
import ChatRoomHeader from "./ChatRoom/ChatRoomHeader";
import Toastify from "../../lib/Toastify";
import { InitialDataState } from "../../redux/slice/InitialDataSlice";
import ChatMessage from "./ChatRoom/ChatMessages";
import { postReq } from "../../utils/api/api";

const ChatRoom = () => {
  const divRef = useRef(null);
  const { chats, activeRoom } = useSelector(InitialDataState);
  const { ToastContainer, showErrorMessage } = Toastify();

  const chatMessages = useMemo(() => {
    if (!activeRoom) {
      return [];
    }
    const findRoomChats = chats.filter((obj) => obj.room === activeRoom._id);
    return findRoomChats;
  }, [activeRoom, chats]);

  useLayoutEffect(() => {
    if (divRef.current) {
      const divHeight = divRef.current.scrollHeight;

      divRef.current.scrollTo({
        top: divHeight,
        behavior: "auto", // Use "auto" for instant move
      });
    }
  }, [chats]);

  const { register, getValues, reset } = useForm({
    defaultValues: {
      inputChat: "",
    },
  });

  const sendChat = async () => {
    try {
      const { inputChat } = getValues();

      if (!inputChat) return;

      const res = {
        message: inputChat,
        room: activeRoom._id,
      };

      const sendChatMsg = await postReq("/chat", res);
      console.log("sendChatMsg", sendChatMsg);
      reset({ inputChat: "" });
    } catch (error) {
      showErrorMessage({ message: error.message });
    }
  };

  const sendChatFromInput = async (e) => {
    if (e.key === "Enter") {
      await sendChat();
    }
  };

  if (!activeRoom) {
    return (
      <div className="w-full h-full flex justify-center items-center text-xl font-semibold tracking-wider">
        <p>Please Select a Chat</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-full">
        {/* MARK: HEADER */}
        <ChatRoomHeader chatMessages={chatMessages} />

        {/* MARK: CHAT MESSAGES AREA */}
        <div
          className=" overflow-y-scroll p-6 mobile:px-1 flex flex-col gap-4 w-full"
          ref={divRef}
          style={{ height: "calc(100% - 112px)" }}
        >
          {chatMessages?.length > 0 ? (
            chatMessages.map((chat, i) => {
              return (
                <ChatMessage
                  key={i}
                  chat={chat}
                  isGroupChat={activeRoom?.isGroupChat}
                />
              );
            })
          ) : (
            <p className="h-full w-full flex justify-center items-center text-xl font-semibold tracking-wide">
              No chat available
            </p>
          )}
        </div>

        {/* MARK: INPUT CHAT BOX */}
        <div className="w-full top_box_shadow bottom-0 border-t border-color_2 py-2 px-4 pr-10 h-14 flex justify-between gap-4 items-center">
          <div className="w-10 h-full">
            <ChatMediaMessage />
          </div>
          <div className="w-full">
            <input
              type="text"
              {...register("inputChat", {
                pattern: /^[A-Za-z]+$/i,
              })}
              spellCheck="false"
              autoCorrect="off"
              autoComplete="off"
              onKeyDown={sendChatFromInput}
              placeholder="Chat Message"
              className="text-color_1  border border-color_2 rounded-3xl p-1 px-6 w-full"
            />
          </div>
          <div
            disabled={getValues().inputChat === ""}
            onClick={() => sendChat()}
            className="cursor-pointer bg-color_1 text-color_4 border px-5 py-1 rounded-3xl"
          >
            Send
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ChatRoom;
