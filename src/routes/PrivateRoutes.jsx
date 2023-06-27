import { Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
	return (
		<div>
			<Outlet />
		</div>
	)
}

export default PrivateRoutes
