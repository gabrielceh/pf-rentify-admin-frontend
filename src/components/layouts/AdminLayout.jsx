import { useLocation } from 'react-router-dom'
import { useModal } from '../../hooks/useModal'

import AdminAside from './AdminAside'
import AdminHeader from './AdminHeader'
import { useDispatch, useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { useContext, useEffect } from 'react'
import { logoutAdmin } from '../../app/features/user/userSlice'
import { ToastContext } from '../../context/ToastContext'

/* eslint-disable react/prop-types */
const AdminLayout = ({ children }) => {
	const [isOpenSide, openSide, closeSide] = useModal()
	const userState = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const { pathname } = useLocation()
	const { addToast } = useContext(ToastContext)

	useEffect(() => {
		if (userState.token) {
			const decode = jwtDecode(userState.token)
			if (decode.exp < Date.now() / 1000) {
				dispatch(logoutAdmin())
				addToast({
					title: 'Expired Session',
					description: 'Your session has expired',
					type: 'warning',
				})
			}
		}
	}, [pathname])

	return (
		<div className='flex'>
			<AdminAside isOpen={isOpenSide} closeModal={closeSide} />
			<div className='w-full md:pl-60 relative'>
				<AdminHeader openModal={openSide} />
				<main className='p-4 mt-20 w-full 2xl:max-w-[1920px] h-[90vh]  mx-auto'>
					<div className='w-full h-full border-[1px] border-dashed rounded-lg border-gray_dark p-4 overflow-auto scrollbar-thin scrollbar-thumb-dark_purple scrollbar-thumb-rounded-md scrollbar-track-medium_purple'>
						{children}
					</div>
				</main>
			</div>
		</div>
	)
}

export default AdminLayout
