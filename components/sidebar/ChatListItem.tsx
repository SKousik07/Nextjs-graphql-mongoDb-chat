import ProfileIcon from "../common/ProfileIcon"

const ChatListItem = ({user,click,isSelected}: {user: any, click: any, isSelected: boolean}) => {
    return (
        <div onClick={click} className={`flex w-[100%] h-[70px] bg-red text-white rounded-[10px] ${!isSelected && 'hover:bg-secondary-dark'} ${isSelected && 'bg-tertiary-dark '}`}>
           <div className="flex items-center justify-center w-[20%] h-[100%]">
                <ProfileIcon userName={user.username}/>
           </div>
           <div className={`flex items-center mr-[10px] ${!isSelected && 'border-b-2'}  border-secondary-dark justify-start p-2 w-[calc(80%-10px)] h-[100%] `}>
                {user.username}
           </div>
        </div>
    )
}

export default ChatListItem