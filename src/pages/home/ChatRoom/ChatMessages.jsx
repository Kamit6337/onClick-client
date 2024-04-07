import UseContinuousCheck from "../../../hooks/query/UseContinuousCheck";
import changeDate from "../../../utils/javaScript/changeDate";

/* eslint-disable react/prop-types */
const ChatMessages = ({ chat, isGroupChat = false }) => {
  const { data: user } = UseContinuousCheck();

  const { message, updatedAt, isLabel, label } = chat;

  if (isLabel) {
    return (
      <div className="flex justify-center">
        <p>{label}</p>
      </div>
    );
  }

  const {
    sender: { _id: id, name },
  } = chat;

  if (id !== user?._id) {
    return (
      <div className={`flex items-end gap-2 w-max self-end  `}>
        <p className="text-xs mb-1">{changeDate(updatedAt)}</p>
        <div
          className={`${
            isGroupChat ? "p-2" : "p-1"
          } px-4 border border-color_3 text-color_1 bg-color_3 rounded-2xl max-w-96 mobile:max-w-60 `}
        >
          {isGroupChat && (
            <p className="font-extrabold tracking-wide text-color_1 ">
              {name.split(" ")[0]}
            </p>
          )}
          <p className="break-all font-thin">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-end gap-2 w-max self-start `}>
      <div
        className={`${
          isGroupChat ? "p-2" : "p-1"
        } px-4 border border-color_3 rounded-2xl max-w-96 mobile:max-w-60`}
        //   onContextMenu={handleContextMenu}
      >
        {isGroupChat && (
          <p className="font-extrabold tracking-wide text-color_3 ">
            {name.split(" ")[0]}
          </p>
        )}

        <p className="font-thin break-all">{message}</p>
      </div>
      <p className="text-xs mb-1">{changeDate(updatedAt)}</p>
    </div>
  );
};

export default ChatMessages;
