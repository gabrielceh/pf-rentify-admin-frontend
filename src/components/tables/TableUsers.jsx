/* eslint-disable react/prop-types */
import RowUser from './RowUser'

const TableUsers = ({ users }) => {
	return (
		<table className='w-full min-w-[700px]'>
			<thead className='border-b-[1px] border-b-gray_medium'>
				<tr className='text-left'>
					<th className='min-w-[150px] max-w-[200px] md:max-w-[250px] md:min-w-[200px] py-2'>
						Name
					</th>
					<th>Created</th>
					<th>Membership</th>
					<th>Status</th>
					<th>Orders</th>
					<th>Edit</th>
					<th>Copy</th>
				</tr>
			</thead>
			<tbody>
				{users?.map((user) => (
					<RowUser key={user.idUser} user={user} />
				))}
			</tbody>
		</table>
	)
}

export default TableUsers
