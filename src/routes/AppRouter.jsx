import { Route, Routes } from 'react-router-dom'
import { routesName } from '../utils/routes_name'
import Home from '../pages/Home'
import Login from '../pages/Login'
import PublicRoutes from './PublicRoutes'
import Index from '../pages/admin/Index'
import PrivateRoutes from './PrivateRoutes'

const AppRouter = () => {
	return (
		<Routes>
			<Route path={routesName.home} element={<Home />} />
			<Route path='/' element={<PublicRoutes />}>
				<Route path={routesName.login} element={<Login />} />
			</Route>

			<Route path='/admin' element={<PrivateRoutes />}>
				<Route path={routesName.admin.index} element={<Index />} />
			</Route>
		</Routes>
	)
}

export default AppRouter
