import { useState } from "react"
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const ChatInput = ({emitMessage}: {emitMessage: any}) => {
    const [message,setMessage] = useState("")
   
    const handleSubmit = (e: any) => {
        e.preventDefault()
        emitMessage(message)
        setMessage("")
    }

    return (
        <form onSubmit={handleSubmit} className="w-[95%] h-full flex items-center justify-center">
            <input
                className="bg-primary-dark text-white outline-none px-4 py-2 w-full rounded-full mr-2"
                placeholder="Type a message..."
                type="text"
                value={message}
                onChange={(e)=> setMessage(e.target.value)}
            />
            <PaperAirplaneIcon className="h-7 w-7 text-white cursor-pointer" onClick={handleSubmit} />
        </form>
    )
}

export default ChatInput