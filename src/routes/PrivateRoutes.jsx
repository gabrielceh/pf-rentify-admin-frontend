import { Outlet } from 'react-router-dom'
import AdminLayout from '../components/layouts/AdminLayout'

const PrivateRoutes = () => {
	return (
		<AdminLayout>
			<Outlet />
		</AdminLayout>
	)
}

export default PrivateRoutes
