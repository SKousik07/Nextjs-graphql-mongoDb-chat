import { useUser } from "@/context";

const MessageBox = ({ message }: any) => {
  const { state, dispatch } = useUser();

  return (
    <div
      className={`h-[40px] p-4 m-4 flex items-center justify-center  rounded-[10px]
        ${
          message?.from?.id === state.user.id
            ? "ml-auto bg-tertiary-dark text-white"
            : "mr-auto bg-secondary-dark text-white"
        }`}
    >
      {message.content}
    </div>
  );
};

export default MessageBox;
