const CreateSingleChat = () => {
  return (
    <div>
      <div className="relative w-full h-full flex justify-center items-center">
        <input
          type="text"
          {...register("searchName", {
            pattern: /^[A-Za-z]+$/i,
          })}
          spellCheck="false"
          autoCorrect="off"
          autoComplete="off"
          onChange={handleSearch}
          placeholder="Search User"
          className="text-color_1 border border-color_2 rounded-3xl p-1 pl-4 w-full"
        />

        {/* MARK: SEARCHED USERS */}
        <div className="absolute top-full mt-1 left-0 w-full z-50  bg-color_1">
          <div className="bg-color_2 rounded-lg" ref={divRef}>
            {searchUsers.length > 0 &&
              searchUsers.map((user, i) => {
                const { name, email, photo } = user;

                const userPhoto = `${environment.SERVER_URL}/${photo}`;

                return (
                  <div
                    key={i}
                    className={`w-full p-3 px-4 flex gap-6 items-center cursor-pointer hover:bg-color_3 hover:text-color_1 first:hover:rounded-t-lg last:hover:rounded-b-lg`}
                    onClick={() => handleUser(user)}
                  >
                    <div className="w-9">
                      <img
                        src={userPhoto}
                        alt="profile"
                        className="w-full rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div>{name}</div>
                      <div className="text-xs">{email}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSingleChat;
