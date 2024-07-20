
import { useEffect, useState } from 'react';

const ProfileIcon = ({userName, color, size=40, fontSize="text-2xl" }: {userName: string, color?: string, size?: number, fontSize?: string}) => { 

    const [randomColor,setRandomColour] = useState("")

    useEffect(() => {
        setRandomColour(getRandomColor())
    }, [])

    const getRandomColor = () => {
        const colorList = ['bg-[#D62828]', 'bg-[#5887FF]', 'bg-[#6F584B]', 'bg-[#FF70A6]' ]
        const randomIndex = Math.floor(Math.random() * colorList.length)
        return colorList[randomIndex]
    }

    return (
        <div 
            style={{ width: `${size}px`, height: `${size}px` }}
            className= {`rounded-full flex items-center justify-center
                cursor-pointer ${color ? color : randomColor} `}
            >
            <span className={`text-white font-bold ${fontSize}`}>
                {userName ? userName[0].toUpperCase() : null}
            </span>
        </div>
    )
}

export default ProfileIcon