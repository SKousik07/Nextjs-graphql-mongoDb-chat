import { useUser } from "@/context"
import WelcomeUser from "../WelcomeUser"
import ProfileIcon from "../common/ProfileIcon"
import ChatInput from "../ChatInput"
import { useMutation, useQuery, useSubscription } from "@apollo/client"
import { ADD_MESSAGE, GET_GROUP, GROUP_UPDATED } from "@/constants"
import { useEffect, useState } from "react"

const MainContainer = ({user,selectedUser}: {user: any, selectedUser: any}) => { 
    
    
    const [addMessage, { data: dataMutation, loading: loadingMutation, error: errorMutation }] = useMutation(ADD_MESSAGE)
    const [combinedId,setCombinedId] = useState("")
    const { data: dataQuery, loading: loadingQuery, error: errorQuery } = useQuery(GET_GROUP, {
      variables: {
          combinedId
      },
      skip: !combinedId,
      fetchPolicy: 'network-only',
    })
    const { data : dataSubscription } = useSubscription(GROUP_UPDATED, {
      variables: {
            combinedId
      }
    })

    useEffect(()=>{
        if(selectedUser){
            if(selectedUser.id < user.id)
                setCombinedId(`${selectedUser?.id}-${user?.id}`)
            else
                setCombinedId(`${user?.id}-${selectedUser?.id}`)
        }
    },[selectedUser,user])

    useEffect(()=>{
       console.log("dataQuery",dataQuery)
    },[dataQuery])

    useEffect(()=>{
       console.log("dataSubscription",dataSubscription)
    },[dataSubscription])

    const handleMessage = async (message: string) => {
        console.log("message",message)
        console.log("combinedId",combinedId)
        const response = await addMessage({
            variables: {
                combinedId,
                content: message,
                userId: user.id,
                type: "text"
            }
        })
        console.log("ADD_MESSAGE", response)
    }
    return (
       <section className="w-[70%] h-screen bg-primary-dark ">
         {
            !selectedUser &&  <WelcomeUser user={user}/>
         }
         {
            selectedUser && (
               <div className="w-[100%] h-[100%] bg-[#5b2a86]">
                  {/* header */}
                  <div className="w-[100%] h-[60px]  flex items-center justify-start bg-secondary-dark text-white px-4">
                     <ProfileIcon userName={selectedUser?.username} />
                     <p className="ml-2 ">{selectedUser?.username}</p>
                  </div>
                  {/* chat area */}
                  <div className="bg-[url('/assets/tg-chat-bg.png')] bg-cover  w-[100%] h-[calc(100%-130px)] flex items-center justify-center text-white px-4">
                   
                  </div>
                  {/* chat input */}
                  <div className="w-[100%] h-[70px] flex items-center justify-center bg-secondary-dark text-white px-4">
                     <ChatInput emitMessage={handleMessage}/>
                  </div>
               </div>
            )
         }
        
       </section>
    )
 }
 
 export default MainContainer