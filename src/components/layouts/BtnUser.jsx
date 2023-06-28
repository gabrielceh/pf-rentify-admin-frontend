import { useSelector } from 'react-redux'
import { useModal } from '../../hooks/useModal'
import { useEffect, useState } from 'react'
import { isImgValid } from '../../utils/isImgValid'
import UserICon from '../icons/UserIcon'
import MenuUser from './MenuUser'

const BtnUser = () => {
	const userState = useSelector((state) => state.user)
	const [isOpen, openMenu, closeMenu] = useModal()
	const [imgValid, setImgValid] = useState(false)

	useEffect(() => {
		isImgValid(userState.user.image, setImgValid)
	}, [])

	const handleClickMenu = () => {
		if (isOpen) closeMenu()
		else openMenu()
	}

	return (
		<>
			<button
				onClick={handleClickMenu}
				className='flex justify-end items-center gap-2 max-w-[144px] trucate font-bold self-end hover:text-dark_purple dark:hover:text-light_purple'>
				{imgValid ? (
					<img
						src={userState.user.image}
						alt={userState.user.name}
						className='w-8 h-8 rounded-full'
					/>
				) : (
					<UserICon className='stroke-dark_purple dark:stroke-light_purple w-8 h-8' />
				)}
				<span className='truncate max-w-[112px] hidden md:inline'>
					{userState.user.name || userState.user.email}
				</span>
			</button>

			{isOpen && <MenuUser close={closeMenu} />}
		</>
	)
}

export default BtnUser
