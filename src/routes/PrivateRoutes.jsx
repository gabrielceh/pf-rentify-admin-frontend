import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import AdminLayout from '../components/layouts/AdminLayout'
import { routesName } from '../utils/routes_name'

const PrivateRoutes = () => {
	const userState = useSelector((state) => state.user)

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
