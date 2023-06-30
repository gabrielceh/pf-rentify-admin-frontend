/* eslint-disable react/prop-types */
import BtnRefreshData from '../BtnRefreshData'

const BtnSelectReports = ({ dataSelect, labelData, setLabelData, updateData }) => {
	return (
		<div className='flex  items-center gap-4 mb-4 w-full '>
			<BtnRefreshData onrefresh={updateData} />
			<div className='flex items-center gap-2 snap-x overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-dark_purple scrollbar-thumb-rounded-md scrollbar-track-light_purple'>
				{dataSelect.map((select, index) => (
					<button
						key={index}
						onClick={() => setLabelData(select)}
						className={
							labelData === select
								? 'bg-dark_purple text-white px-2 py-1 rounded-md transition-colors capitalize min-w-[120px] w-[120px] truncate scroll-ml-6 snap-start'
								: 'px-2 py-1 rounded-md hover:bg-medium_purple hover:text-white transition-colors capitalize min-w-[120px] w-[120px] truncate scroll-ml-6 snap-start'
						}>
						{select}
					</button>
				))}
			</div>
		</div>
	)
}

export default BtnSelectReports
