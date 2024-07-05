import { useQuery } from "@apollo/client"
import SearchInput from "../sidebar/SearchInput"
import SideBarHeader from "../sidebar/SideBarHeader"
import { GET_USERS } from "@/constants"
import { useEffect, useState } from "react"
import { useUser } from "@/context"
import ChatListItem from "../sidebar/ChatListItem"
import "./sidebar.css"
const SideBarContainer = () => { 

   const { data, loading, error } = useQuery(GET_USERS)
   const { state, dispatch } = useUser()
   const [userList, setUserList ]=useState([])

   const handleSearch =(searchText: string) => {
      console.log("searchInput from search comp",searchText)
   }

   useEffect(()=>{
      if(data) {
         console.log("users-data",data)
         const otherUsers = data.users?.users.filter((user:any) => user.id !== state?.user?.id)
         console.log("otherUsers",otherUsers)
         setUserList(otherUsers)
      }
   },[data])

   return (
      <section className="w-[30%] h-screen bg-primary-dark">
         <SideBarHeader/>
         <div className="flex items-center justify-center w-[100%] h-[80px] bg-primary-dark text-white">
            <SearchInput onSearch={handleSearch}/>
         </div>
         <div className="custom-scrollbar" >
            { userList && userList.length > 0 && 
                userList.map((user: any,index) => (
                  <ChatListItem key={user.id || index } user={user} />
                ))
            }
             { userList && userList.length > 0 && 
                userList.map((user: any,index) => (
                  <ChatListItem key={user.id || index } user={user} />
                ))
            }
             { userList && userList.length > 0 && 
                userList.map((user: any,index) => (
                  <ChatListItem key={user.id || index } user={user} />
                ))
            }
             { userList && userList.length > 0 && 
                userList.map((user: any,index) => (
                  <ChatListItem key={user.id || index } user={user} />
                ))
            }
             { userList && userList.length > 0 && 
                userList.map((user: any,index) => (
                  <ChatListItem key={user.id || index } user={user} />
                ))
            }
             { userList && userList.length > 0 && 
                userList.map((user: any,index) => (
                  <ChatListItem key={user.id || index } user={user} />
                ))
            }
         </div>

      </section>
   )
}

export default SideBarContainer