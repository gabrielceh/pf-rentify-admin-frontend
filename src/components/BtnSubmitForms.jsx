/* eslint-disable react/prop-types */
import Loader from './Loader'

const BtnSubmitForms = ({ loadingStatus, label = '' }) => {
	return (
		<button
			type='submit'
			className='w-full bg-dark_purple text-white text-center px-8 py-2 rounded-md mt-3 hover:bg-medium_purple active:scale-95 transition'>
			{loadingStatus === 'loading' ? (
				<Loader className='w-4 h-4 stroke-light_purple animate-spin inline' />
			) : (
				<>{label}</>
			)}
		</button>
	)
}

export default BtnSubmitForms
