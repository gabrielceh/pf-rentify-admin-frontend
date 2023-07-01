import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUsersList, getUsersNextList, searchUser } from '../../app/features/users/usersSlice'
import { USERS_API } from '../../utils/apiRoutes'
import { selectUserStatusOptions } from '../../utils/selectsOptions'
import Loader from '../../components/Loader'
import SectionDescription from '../../components/SectionDescription'
import TitleSection from '../../components/TitleSection'
import Search from '../../components/Search'
import BtnRefreshData from '../../components/BtnRefreshData'
import UserFormFilter from '../../components/UserFormFilter'
import TableUsers from '../../components/tables/TableUsers'

const Users = () => {
	const dispatch = useDispatch()
	const usersState = useSelector((state) => state.users)

	useEffect(() => {
		getAllUsers(`${USERS_API}/all`)
	}, [])

	const getAllUsers = (endpoint) => {
		dispatch(getUsersList(endpoint))
	}

	const restarData = () => {
		dispatch(getUsersList(`${USERS_API}/all`))
	}

	const filterData = (endpoint) => {
		getAllUsers(`${USERS_API}/${endpoint}`)
	}

	const handleNext = () => {
		dispatch(getUsersNextList(usersState.next))
	}

	return (
		<div>
			<TitleSection title='Users' />
			<section className='mb-16 w-full flex flex-col md:flex-row md:justify-between md:items-center gap-y-12'>
				<SectionDescription description='List of users registered in Rent-ify' />
				<Search searchFunction={searchUser} />
			</section>

			<section className='flex items-center gap-5'>
				<BtnRefreshData onrefresh={restarData} />
				<UserFormFilter options={selectUserStatusOptions} onchange={filterData} />
			</section>

			{usersState.status === 'loading' && (
				<div className='w-full h-[700px] grid place-content-center'>
					<Loader className='w-16 h-16 animate-spin' />
				</div>
			)}
			{usersState.status === 'success' && <TableUsers users={usersState.users} />}

			{usersState.next && usersState.status === 'success' ? (
				<div className='mt-6'>
					<button
						className='bg-dark_purple hover:bg-medium_purple text-white px-3 py-1 rounded-md'
						onClick={handleNext}>
						More
					</button>
				</div>
			) : (
				''
			)}
		</div>
	)
}

export default Users
