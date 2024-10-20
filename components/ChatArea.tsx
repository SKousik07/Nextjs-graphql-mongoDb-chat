import { useEffect, useRef } from "react";
import MessageBox from "./MessageBox";
import "./chatArea.css";
const ChatArea = ({ messageList }: any) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    if (messageList.length > 0) scrollToBottom();
  }, [messageList]); // Scrolls to the bottom whenever messages change

  return (
    <div className="custom-scrollbar2 w-[100%] h-[100%] flex flex-col items-center text-black">
      {messageList &&
        messageList.length > 0 &&
        messageList.map((msg: any) => {
          return <MessageBox message={msg} key={msg.id} />;
        })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatArea;
