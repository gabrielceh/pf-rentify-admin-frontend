/* eslint-disable react/prop-types */
import RefreshIcon from './icons/RefreshIcon'

const BtnRefreshData = ({ onrefresh }) => {
	return (
		<button
			className='p-2 rounded-md hover:scale-110 transition-transform'
			onClick={onrefresh}
			title='Reload data'>
			<RefreshIcon className='stroke-gray_dark w-6 h-6' />
		</button>
	)
}

export default BtnRefreshData
