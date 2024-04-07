/* eslint-disable react/prop-types */
import { useState } from "react";
import { Icons } from "../assets/icons";
import { useDispatch } from "react-redux";
import { toggleSideNavbar } from "../redux/slice/toggleSlice";

const SearchUsers = ({ searchValue }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleSearch = (e) => {
    const { value } = e.target;
    setValue(value);
    searchValue(value);
  };

  return (
    <div className="w-full h-full flex justify-center items-center gap-4">
      <p
        className="text-2xl text-gray-300 cursor-pointer"
        onClick={() => dispatch(toggleSideNavbar(true))}
      >
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
