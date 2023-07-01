/* eslint-disable react/prop-types */
import CloseIcon from '../icons/CloseIcon'
import EditIcon from '../icons/EditICon'

const BtnEditProfile = ({ handleEdit, showForm }) => {
	return (
		<button onClick={handleEdit}>
			{showForm ? (
				<CloseIcon className='stroke-gray_dark hover:stroke-medium_purple w-6 h-6 transition' />
			) : (
				<EditIcon className='stroke-gray_dark hover:stroke-medium_purple w-6 h-6 transition' />
			)}
		</button>
	)
}

export default BtnEditProfile
