import ProfileIcon from "./ProfileIcon"

const ChatListItem = ({user}: {user: any}) => {
    return (
        <div className="flex w-[100%] h-[70px] bg-red text-white hover:bg-secondary-dark">
           <div className="flex items-center justify-center w-[20%] h-[100%]">
                <ProfileIcon userName={user.username}/>
           </div>
           <div className="flex items-center border-b-2  border-secondary-dark justify-start p-2 w-[80%] h-[100%] ">
                {user.username}
           </div>
        </div>
    )
}

export default ChatListItem