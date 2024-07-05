import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

const ProfileIcon = ({userName, color }: {userName: string, color?: string}) => { 

    const [randomColor,setRandomColour] = useState("")

    useEffect(() => {
        setRandomColour(getRandomColor())
    }, [])

    const getRandomColor = () => {
        const colorList = ['bg-tertiary-dark','bg-[#D62828]', 'bg-[#5887FF]', 'bg-[#6F584B]', 'bg-[#FF70A6]' ]
        const randomIndex = Math.floor(Math.random() * colorList.length)
        return colorList[randomIndex]
    }
    return (
        <div className= {`rounded-full flex items-center justify-center w-[40px] h-[40px]
                cursor-pointer ${color ? color : randomColor} `}>
            <span className='text-white font-bold text-2xl'>
                {userName ? userName[0].toUpperCase() : null}
            </span>
        </div>
    )
}

export default ProfileIcon