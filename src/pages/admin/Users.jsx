import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUsersList, searchUser } from '../../app/features/users/usersSlice'
import Loader from '../../components/Loader'
import RowUser from '../../components/tables/RowUser'
import SectionDescription from '../../components/SectionDescription'
import TitleSection from '../../components/TitleSection'
import Search from '../../components/Search'
import RefreshIcon from '../../components/icons/RefreshIcon'

const Users = () => {
	const dispatch = useDispatch()
	const usersState = useSelector((state) => state.users)

	useEffect(() => {
		getAllUsers()
	}, [])

	const getAllUsers = () => {
		dispatch(getUsersList())
	}

	return (
		<div>
			<TitleSection title='Users' />
			<div className='mb-16 w-full flex flex-col md:flex-row md:justify-between md:items-center gap-y-12'>
				<SectionDescription description='List of users registered in Rent-ify' />
				<div className='flex items-center gap-2'>
					<button
						onClick={getAllUsers}
						className='hover:scale-110 transition-transform'
						title='Reload data'>
						<RefreshIcon className='stroke-gray_dark w-6 h-6' />
					</button>
					<Search searchFunction={searchUser} />
				</div>
			</div>

			{usersState.status === 'loading' && (
				<div className='w-full h-[700px] grid place-content-center'>
					<Loader className='w-16 h-16 animate-spin' />
				</div>
			)}
			{usersState.status === 'success' && (
				<table className='w-full min-w-[600px]'>
					<thead className='border-b-[1px] border-b-gray_medium'>
						<tr className='text-left'>
							<th className='min-w-[150px] max-w-[200px] md:max-w-[250px] md:min-w-[200px] py-2'>
								Name
							</th>
							<th>Created</th>
							<th>Membership</th>
							<th>Status</th>
							<th>Edit</th>
							<th>Copy</th>
						</tr>
					</thead>
					<tbody>
						{usersState.users.map((user) => (
							<RowUser key={user.idUser} user={user} />
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}

export default Users
