/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import OnClickOutside from "../lib/onClickOutside";
import { useForm } from "react-hook-form";
import UseAllUser from "../hooks/query/UseAllUser";
import environment from "../utils/environment";
import UseSingleRoomCreation from "../hooks/mutation/SingleRoomCreation";
import Toastify from "../lib/Toastify";
import { Icons } from "../assets/icons";

const SearchUsers = ({ searchValue }) => {
  const [searchUsers, setSearchUsers] = useState([]);
  const { data: users } = UseAllUser(true);
  const { isError, error, mutate, isSuccess } = UseSingleRoomCreation();
  const { ToastContainer, showErrorMessage, showSuccessMessage } = Toastify();
  const [value, setValue] = useState("");

  const { register, reset } = useForm({
    defaultValues: {
      searchName: "",
    },
  });

  const success = () => {
    reset({ searchName: "" });
    setSearchUsers([]);
  };

  const { ref: divRef } = OnClickOutside(success);

  useEffect(() => {
    if (isError) {
      showErrorMessage({ message: error.message });
    }
  }, [isError, error, showErrorMessage]);

  useEffect(() => {
    if (isSuccess) {
      showSuccessMessage({ message: "Chat created" });
    }
  }, [isSuccess, showSuccessMessage]);

  const handleSearch = (e) => {
    const { value } = e.target;
    setValue(value);
    searchValue(value);
  };

  const handleUser = (user) => {
    setSearchUsers([]);
    mutate(user._id);
  };

  return (
    <div className="w-full h-full flex justify-center items-center gap-4">
      <p className="text-2xl text-gray-300">
        <Icons.hamburger />
      </p>
      <div>
        <input
          type="text"
          value={value}
          onChange={handleSearch}
          placeholder="Search Chat"
          className="text-color_1 border border-color_2 text-sm rounded-3xl p-1 pl-4 w-full"
        />
      </div>
    </div>
  );
};

export default SearchUsers;
