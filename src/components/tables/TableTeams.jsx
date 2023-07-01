/* eslint-disable react/prop-types */
import RowTeam from './RowTeam'

const TableTeam = ({ team }) => {
	return (
		<table className='w-full min-w-[700px]'>
			<thead className='border-b-[1px] border-b-gray_medium'>
				<tr className='text-left'>
					<th className='min-w-[150px] max-w-[200px] md:max-w-[250px] md:min-w-[200px] py-2'>
						Name
					</th>
					<th>Created</th>
					<th>Role</th>
					<th>Status</th>
					<th>Edit</th>
					<th>Copy</th>
				</tr>
			</thead>
			<tbody>
				{team?.map((user) => (
					<RowTeam key={user.idUser} user={user} />
				))}
			</tbody>
		</table>
	)
}

export default TableTeam
