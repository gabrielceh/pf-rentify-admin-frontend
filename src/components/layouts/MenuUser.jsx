/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import { logoutAdmin } from '../../app/features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { routesName } from '../../utils/routes_name'

const MenuUser = ({ close }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleLogout = () => {
		close()
		dispatch(logoutAdmin())
		navigate(routesName.login, { replace: true })
	}

	return (
		<div className='absolute top-16 right-3 w-28 bg-white dark:bg-card_dark rounded-md overflow-hidden shadow-md transition-colors'>
			<button className='w-full px-2 py-3 hover:bg-medium_purple hover:text-white cursor-pointer transition-colors'>
				Your profile
			</button>
			<button
				onClick={handleLogout}
				className='w-full px-2 py-3 hover:bg-medium_purple hover:text-white cursor-pointer transition-colors'>
				Sign out
			</button>
		</div>
	)
}

export default MenuUser
