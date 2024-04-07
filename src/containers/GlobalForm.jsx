import { useSelector } from "react-redux";
import { toggleInitialState } from "../redux/slice/toggleSlice";
import SingleChatForm from "../components/SingleChatForm";
import GroupChatForm from "../components/GroupChatForm";
import UpdateGroupChatForm from "../pages/home/ChatRoom/UpdateGroupChatForm";
import RightClickMenu from "../pages/home/ChatRoom/RightClickMenu";

const GlobalForm = () => {
  const { singleChatForm, groupChatForm, updateGroupChat, showChatOptions } =
    useSelector(toggleInitialState);

  if (singleChatForm.bool) {
    return <SingleChatForm />;
  }

  if (groupChatForm.bool) {
    return <GroupChatForm />;
  }

  if (updateGroupChat) {
    return <UpdateGroupChatForm update={true} />;
  }

  // if (showChatOptions) {
  //   return <RightClickMenu data={showChatOptions.data} />;
  // }

  return null;
};

export default GlobalForm;
