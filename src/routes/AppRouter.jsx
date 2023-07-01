import { Route, Routes } from 'react-router-dom'
import { routesName } from '../utils/routes_name'
import Home from '../pages/Home'
import Login from '../pages/Login'
import PublicRoutes from './PublicRoutes'
import Index from '../pages/admin/Index'
import PrivateRoutes from './PrivateRoutes'
import Profile from '../pages/admin/Profile'
import Users from '../pages/admin/Users'
import Teams from '../pages/admin/Teams'
import Reports from '../pages/admin/Reports'
import UserOrdersDetails from '../pages/admin/UserOrdersDetails'

const AppRouter = () => {
	return (
		<Routes>
			<Route path={routesName.home} element={<Home />} />
			<Route path='/' element={<PublicRoutes />}>
				<Route path={routesName.login} element={<Login />} />
			</Route>

			<Route path='/admin' element={<PrivateRoutes />}>
				<Route path={routesName.admin.index} element={<Index />} />
				<Route path={routesName.admin.profile} element={<Profile />} />
				<Route path={routesName.admin.reports} element={<Reports />} />
				<Route path={routesName.admin.users} element={<Users />} />
				<Route path={routesName.admin.team} element={<Teams />} />
				<Route path={`${routesName.admin.usersOrders}/:id`} element={<UserOrdersDetails />} />
			</Route>
		</Routes>
	)
}

export default AppRouter
