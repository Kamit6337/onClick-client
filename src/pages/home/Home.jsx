import SidebarMenu from "./SidebarMenu";
import ChatRoom from "./ChatRoom";
import { useSelector } from "react-redux";
import SearchUsers from "../../components/SearchUsers";
import { InitialDataState } from "../../redux/slice/InitialDataSlice";
import { useState } from "react";
import useSocketConnection from "../../hooks/socket/useSocketConnection";

const Home = () => {
  useSocketConnection();
  const { rooms, activeRoom } = useSelector(InitialDataState);
  const [filterRooms, setFilterRooms] = useState([]);

  const searchValue = (value) => {
    if (!value) {
      setFilterRooms([]);
      return;
    }
    const findGroupChat = rooms.filter((room) =>
      room.name?.toLowerCase().includes(value.toLowerCase())
    );

    const findChats = rooms.filter(
      (room) =>
        !room.isGroupChat &&
        room.members.find((member) =>
          member.name.toLowerCase().includes(value.toLowerCase())
        )
    );
    const combine = [...findGroupChat, ...findChats];
    setFilterRooms(combine);
  };

  return (
    <>
      <article className="w-full h-full flex">
        {/* NOTE: LEFT SIDE */}
        <section className="w-72 h-full border-r border-color_2 flex flex-col ">
          <header className="w-full h-14 border-b border-color_2">
            <SearchUsers searchValue={searchValue} />
          </header>
          {/* MARK: SIDEBAR MENU */}
          <div className="w-full flex-1">
            <SidebarMenu
              rooms={filterRooms.length > 0 ? filterRooms : rooms}
              activeRoom={activeRoom}
            />
          </div>
        </section>

        {/* MARK: CHAT MESSAGES */}
        <main className="flex-1 h-full">
          <ChatRoom />
        </main>
      </article>
    </>
  );
};

export default Home;
