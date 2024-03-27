import SpeedDial from "../../../../../components/SpeedDial";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import Person2Icon from "@mui/icons-material/Person2";
import { useDispatch } from "react-redux";
import {
  toggleGroupChatForm,
  toggleSingleChatForm,
} from "../../../../../redux/slice/toggleSlice";
const actions = [
  { id: 1, icon: <FileCopyIcon />, name: "Copy" },
  { id: 2, icon: <SaveIcon />, name: "Save" },
  { id: 3, icon: <Person2Icon />, name: "Chat" },
  { id: 4, icon: <Groups2OutlinedIcon />, name: "Group Chat" },
];

const ChatType = () => {
  const dispatch = useDispatch();

  const handleOptionClick = (id) => {
    if (id === 3) {
      dispatch(toggleSingleChatForm(true));
      return;
    }

    if (id === 4) {
      dispatch(toggleGroupChatForm(true));
      return;
    }
  };

  return (
    <>
      <SpeedDial
        actions={actions}
        position="right"
        size="bigger"
        handleOptionClick={handleOptionClick}
      />
    </>
  );
};

export default ChatType;
