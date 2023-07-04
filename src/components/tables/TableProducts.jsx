/* eslint-disable react/prop-types */
import RowProduct from './RowProduct'

const TableProducts = ({ products }) => {
	return (
		<table className='w-full min-w-[700px]'>
			<thead className='border-b-[1px] border-b-gray_medium'>
				<tr className='text-left'>
					<th className='min-w-[150px] max-w-[200px] md:max-w-[250px] md:min-w-[200px] py-2'>
						Name
					</th>
					<th>View</th>
					<th>Status</th>
					<th>Copy</th>
				</tr>
			</thead>
			<tbody>
				{products.map((product) => (
					<RowProduct key={product.idProd} product={product} />
				))}
			</tbody>
		</table>
	)
}

export default TableProducts
