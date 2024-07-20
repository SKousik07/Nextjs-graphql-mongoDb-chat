import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';
import ProfileIcon from '../common/ProfileIcon';
import { useUser } from '@/context';

const SideBarHeader = () => {
    const { state, dispatch } = useUser()
    
    return (
        <div className="flex w-[100%] h-[60px] items-center justify-between bg-secondary-dark text-white px-4 border-r-2 border-primary-dark">
           <ProfileIcon userName={state?.user?.username} color='bg-tertiary-dark'/>
           <ArrowRightStartOnRectangleIcon  onClick={() => dispatch({ type: 'LOGOUT' })} className="w-6 h-6 cursor-pointer" />
        </div>
    )
}

export default SideBarHeader