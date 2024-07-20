import ProfileIcon from "./common/ProfileIcon"

const WelcomeUser = ({user}: {user: any}) => { 
    return (
        <div className="flex flex-col w-[100%] h-[100%] items-center justify-center text-white">
            <ProfileIcon userName={user.username} size={200} color='bg-tertiary-dark' fontSize="text-6xl"/>
            <h1 className="text-4xl font-bold mt-4 mb-2 font-mono">Welcome,{user.username.slice(0,1).toUpperCase() + user.username.slice(1)}</h1>
            <p className="text-center mt-2 ">~ Let's connect to the world ~</p>
        </div>
    )
}

export default WelcomeUser