import { useDispatch, useSelector } from "react-redux";
import { toggleSingleChatForm } from "../redux/slice/toggleSlice";
import { useMemo, useState } from "react";
import UseContinuousCheck from "../hooks/query/UseContinuousCheck";
import environment from "../utils/environment";
import { postReq } from "../utils/api/api";
import { InitialDataState } from "../redux/slice/InitialDataSlice";
import { AllUserState } from "../redux/slice/AllUserSlice";

const SingleChatForm = () => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector(AllUserState);
  const { rooms } = useSelector(InitialDataState);
  const { data: user } = UseContinuousCheck();
  const [userSelected, setUserSelected] = useState(null);

  console.log("allUsers", allUsers);

  const filteredAllUser = useMemo(() => {
    if (!allUsers) return [];

    // const filterSingleRooms = rooms.filter((room) => !room.isGroupChat);

    let filterUsers = allUsers.filter((obj) => obj._id !== user._id);

    // filterUsers = filterUsers.filter(
    //   (obj) =>
    //     !filterSingleRooms.find((room) =>
    //       room.members.find((member) => member._id === obj._id)
    //     )
    // );

    return filterUsers;
  }, [allUsers, user]);

  const [searchedUser, setSearchedUser] = useState([]);
  const [value, setValue] = useState("");

  const handleCreateChat = async () => {
    if (!userSelected) return;

    try {
      const createdSingleChat = await postReq("/room/single", {
        id: userSelected._id,
        name: userSelected.name,
      });
      console.log("createdSingleChat", createdSingleChat);
      handleCancel();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setValue(value);
    if (!value) {
      setSearchedUser([]);
      return;
    }

    const findUsers = filteredAllUser.filter(
      (user) =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedUser(findUsers);
  };

  const handleCancel = () => {
    dispatch(toggleSingleChatForm({ bool: false }));
  };

  return (
    <section className="h-full w-full absolute z-50 top-0 left-0 backdrop-blur-sm flex justify-center items-center">
      <main className="w-96 py-10 border rounded-md flex flex-col items-center justify-center gap-10 bg-color_2">
        <div className="px-5 w-full">
          {userSelected ? (
            <div className="border flex gap-4 p-3 rounded-md">
              <div className="w-10">
                <img
                  src={`${environment.SERVER_URL}/${userSelected.photo}`}
                  alt={userSelected.name}
                  className="w-full object-cover rounded-full"
                />
              </div>
              <div className="text-sm ">
                <p>{userSelected.name}</p>
                <p className="text-xs mt-2">{userSelected.email}</p>
              </div>
            </div>
          ) : (
            <div className="w-full relative">
              <input
                type="text"
                value={value}
                onChange={handleSearch}
                placeholder="Search by Name or Email"
                className="p-2 px-5 w-full text-color_1 rounded-md"
              />

              {searchedUser.length > 0 && (
                <div className="absolute z-10 mt-1 rounded-md top-full left-0 w-full bg-color_1 border">
                  {searchedUser.map((user, i) => {
                    const { name, email, photo } = user;

                    const formImage = `${environment.SERVER_URL}/${photo}`;

                    return (
                      <div
                        key={i}
                        className="border-b last:border-none flex gap-4 p-3 cursor-pointer"
                        onClick={() => setUserSelected(user)}
                      >
                        <div className="w-10">
                          <img
                            src={formImage}
                            alt={name}
                            className="w-full object-cover rounded-full"
                          />
                        </div>
                        <div className="text-sm ">
                          <p>{name}</p>
                          <p className="text-xs mt-2">{email}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 w-full px-5">
          <button
            className="flex-1 bg-white text-color_1 py-1 rounded-md"
            onClick={handleCreateChat}
          >
            Create Chat
          </button>
          <button
            className="flex-1 bg-white text-color_1 py-1 rounded-md"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </main>
    </section>
  );
};

export default SingleChatForm;
