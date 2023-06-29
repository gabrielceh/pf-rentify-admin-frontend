import RefreshIcon from '../icons/RefreshIcon'

/* eslint-disable react/prop-types */
const BtnSelectReports = ({ dataSelect, labelData, setLabelData, updateData }) => {
	return (
		<div className='flex justify-between items-center gap-4 mb-4 w-full'>
			<div className='flex items-center gap-4'>
				{dataSelect.map((select, index) => (
					<button
						key={index}
						onClick={() => setLabelData(select)}
						className={
							labelData === select
								? 'bg-dark_purple text-white px-2 py-1 rounded-md transition-colors capitalize'
								: 'px-2 py-1 rounded-md hover:bg-medium_purple hover:text-white transition-colors capitalize'
						}>
						{select}
					</button>
				))}
			</div>
			<button
				className='p-2 rounded-md hover:scale-110 transition-transform'
				onClick={updateData}
				title='refresh data'>
				<RefreshIcon className='stroke-gray_dark w-6 h-6' />
			</button>
		</div>
	)
}

export default BtnSelectReports
