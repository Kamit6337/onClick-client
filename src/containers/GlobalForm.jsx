import { useSelector } from "react-redux";
import { toggleInitialState } from "../redux/slice/toggleSlice";
import SingleChatForm from "../components/SingleChatForm";

const GlobalForm = () => {
  const { singleChatForm, groupChatForm, updateGroupChat } =
    useSelector(toggleInitialState);

  if (singleChatForm) {
    return <SingleChatForm />;
  }

  return;
};

export default GlobalForm;
