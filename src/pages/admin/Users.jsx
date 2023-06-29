import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUsersList } from '../../app/features/users/usersSlice'
import Loader from '../../components/Loader'
import RowUser from '../../components/tables/RowUser'
import SectionDescription from '../../components/SectionDescription'
import TitleSection from '../../components/TitleSection'
import Search from '../../components/Search'
const Users = () => {
	const dispatch = useDispatch()
	const usersState = useSelector((state) => state.users)

	useEffect(() => {
		dispatch(getUsersList())
	}, [])

	return (
		<div>
			<TitleSection title='Users' />
			<div className='mb-16 w-full flex flex-col md:flex-row md:justify-between md:items-center gap-y-12'>
				<SectionDescription description='List of users registered in Rent-ify' />
				<Search />
			</div>

			{usersState.status === 'loading' && <Loader />}
			{usersState.status === 'success' && (
				<table className='w-full min-w-[600px]'>
					<thead className='border-b-[1px] border-b-gray_medium'>
						<tr className='text-left'>
							<th className='max-w-[250px] min-w-[200px] py-2'>Name</th>
							<th>Created at</th>
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
