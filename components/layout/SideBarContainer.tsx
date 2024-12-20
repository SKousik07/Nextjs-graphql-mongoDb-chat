import { useQuery } from "@apollo/client";
import SearchInput from "../sidebar/SearchInput";
import SideBarHeader from "../sidebar/SideBarHeader";
import { GET_OTHER_USERS } from "@/constants";
import { useEffect, useState } from "react";
import { useUser } from "@/context";
import ChatListItem from "../sidebar/ChatListItem";
import "./sidebar.css";
const SideBarContainer = ({ onLogOut }: { onLogOut: any }) => {
  const { state, dispatch } = useUser();
  const { data, loading, error } = useQuery(GET_OTHER_USERS, {
    variables: {
      id: state.user ? state.user?.id : "",
    },
    skip: !state.user,
    fetchPolicy: "network-only",
  });

  const [filteredUserList, setfilteredUserList] = useState([]);

  const handleSearch = (searchText: string) => {
    if (searchText === "" && data?.otherUsers)
      setfilteredUserList(data?.otherUsers?.users);
    else {
      if (searchText && data?.otherUsers) {
        setfilteredUserList(
          data.otherUsers?.users.filter((user: any) =>
            user.username.toLowerCase().includes(searchText.toLowerCase())
          )
        );
      }
    }
  };

  const checkNoNull = (otherUsers: any) => {
    const nullList = otherUsers.filter((user: any) => user.username === null);
    if (nullList.length > 0) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (data) {
      const otherUsers = data.otherUsers?.users;
      if (checkNoNull(otherUsers)) setfilteredUserList(otherUsers);
    }
  }, [data]);

  return (
    <section className="w-[30%] h-screen bg-primary-dark">
      <SideBarHeader onLogOut={onLogOut} />
      <div className="flex items-center justify-center w-[100%] h-[80px] bg-primary-dark text-white border-b-2 border-r-2 border-secondary-dark">
        <SearchInput onSearch={handleSearch} />
      </div>
      <div className="custom-scrollbar border-r-2 border-secondary-dark">
        {filteredUserList &&
          filteredUserList.length > 0 &&
          filteredUserList.map((user: any, index) => (
            <ChatListItem
              key={user.id || index}
              user={user}
              selectedUser={state.selectedUser}
              click={() => {
                dispatch({ type: "SELECTED_USER", payload: user });
              }}
              isSelected={state.selectedUser?.id === user.id}
            />
          ))}
        {filteredUserList && filteredUserList.length <= 0 && (
          <p className="text-center text-gray-400 p-3">No users found</p>
        )}
      </div>
    </section>
  );
};

export default SideBarContainer;
