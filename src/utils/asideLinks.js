import { routesName } from './routes_name'
import ReportsIcon from '../components/icons/ReportsIcon'
import UserAsideIcon from '../components/icons/UserAsideIcon'
import TeamIcon from '../components/icons/TeamIcon'

export const asideLinks = [
	{
		id: '1',
		name: 'Reports',
		to: routesName.admin.reports,
		icon: ReportsIcon(),
	},
	{
		id: '2',
		name: 'Users',
		to: routesName.admin.users,
		icon: UserAsideIcon(),
	},
	{
		id: '3',
		name: 'Team',
		to: routesName.admin.team,
		icon: TeamIcon(),
	},
]
