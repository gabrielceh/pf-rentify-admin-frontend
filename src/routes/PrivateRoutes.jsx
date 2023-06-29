import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { routesName } from '../utils/routes_name'
import { logoutAdmin } from '../app/features/user/userSlice'
import { LSVariables } from '../utils/LSVariables'
import { ToastContext } from '../context/ToastContext'
import AdminLayout from '../components/layouts/AdminLayout'

const PrivateRoutes = () => {
	const userState = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { addToast } = useContext(ToastContext)

	useEffect(() => {
		const userAuth = localStorage.getItem(LSVariables.authAdmin)
			? JSON.parse(localStorage.getItem(LSVariables.authAdmin))
			: { loggin: false, user: {} }

		if (userAuth.user?.role === 'user') {
			dispatch(logoutAdmin())
			navigate(routesName.home)
			addToast({
				title: 'Error',
				description: 'You do not have permissions to access this section',
				type: 'danger',
			})
		}
	}, [userState.login])

	return (
		<>
			{!userState?.login ? (
				<Navigate to={routesName.login} />
			) : (
				<AdminLayout>
					<Outlet />
				</AdminLayout>
			)}
		</>
	)
}

export default PrivateRoutes
