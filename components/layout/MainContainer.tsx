import { useUser } from "@/context";
import WelcomeUser from "../WelcomeUser";
import ProfileIcon from "../common/ProfileIcon";
import ChatInput from "../ChatInput";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  ADD_MESSAGE,
  GET_GROUP,
  GET_OTHER_USERS,
  GET_USER,
  GROUP_UPDATED,
} from "@/constants";
import { useEffect, useState } from "react";
import client from "@/lib/apollo-client";
import ChatArea from "../ChatArea";

const MainContainer = ({
  user,
  selectedUser,
}: {
  user: any;
  selectedUser: any;
}) => {
  const [
    addMessage,
    { data: dataMutation, loading: loadingMutation, error: errorMutation },
  ] = useMutation(ADD_MESSAGE);
  const [combinedId, setCombinedId] = useState("");
  const [messageList, setMessageList] = useState([]);
  const {
    data: dataQuery,
    loading: loadingQuery,
    error: errorQuery,
  } = useQuery(GET_GROUP, {
    variables: {
      combinedId,
    },
    skip: !combinedId,
    fetchPolicy: "network-only",
  });
  const {
    data: dataSubscription,
    loading: loadingSubscription,
    error: errorSubscription,
  } = useSubscription(GROUP_UPDATED, {
    variables: {
      combinedId,
    },
  });

  useEffect(() => {
    console.log("combbbbbbb", selectedUser);
    if (selectedUser) {
      if (selectedUser.id < user.id)
        setCombinedId(`${selectedUser?.id}-${user?.id}`);
      else setCombinedId(`${user?.id}-${selectedUser?.id}`);
    }
  }, [selectedUser, user]);

  useEffect(() => {
    console.log("dataQuery", dataQuery);
    if (dataQuery?.getGroup.messages) {
      console.log("messages", dataQuery?.getGroup.messages);
      setMessageList(dataQuery?.getGroup.messages);
    }
  }, [dataQuery]);

  useEffect(() => {
    console.log("dataSubscription", dataSubscription);
    if (dataSubscription?.groupUpdated.messages) {
      console.log("messages", dataSubscription?.groupUpdated.messages);
      setMessageList(dataSubscription?.groupUpdated.messages);
      //client.refetchQueries({ include: [GET_USER, GET_OTHER_USERS] });
    }
  }, [dataSubscription, client]);

  const handleMessage = async (message: string) => {
    console.log("message", message);
    console.log("combinedId", combinedId);
    const response = await addMessage({
      variables: {
        combinedId,
        content: message,
        userId: user.id,
        type: "text",
      },
    });
    console.log("ADD_MESSAGE", response);
  };

  if (errorSubscription) return <p>Error: {errorSubscription.message}</p>;
  return (
    <section className="w-[70%] h-screen bg-primary-dark ">
      {!selectedUser && <WelcomeUser user={user} />}
      {selectedUser && (
        <div className="w-[100%] h-[100%] bg-[#5b2a86]">
          {/* header */}
          <div className="w-[100%] h-[60px]  flex items-center justify-start bg-secondary-dark text-white px-4">
            <ProfileIcon userName={selectedUser?.username} />
            <p className="ml-2 ">{selectedUser?.username}</p>
          </div>
          {/* chat area */}
          <div className="bg-[url('/assets/tg-chat-bg.png')] bg-cover  w-[100%] h-[calc(100%-130px)] flex items-center justify-center text-white ">
            <ChatArea messageList={messageList} />
          </div>
          {/* chat input */}
          <div className="w-[100%] h-[70px] flex items-center justify-center bg-secondary-dark text-white px-4">
            <ChatInput emitMessage={handleMessage} />
          </div>
        </div>
      )}
    </section>
  );
};

export default MainContainer;
