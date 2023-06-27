/* eslint-disable react/prop-types */
import logoWhite from '../../assets/image/logo-rentify-white.png'
import CloseIcon from '../icons/CloseIcon'

const AdminAside = ({ isOpen, closeModal }) => {
	const modalOpenClasses = isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
	const menuOpenClasses = isOpen ? 'left-0' : 'left-[-100vh]'

	return (
		<div>
			<div
				className={`min-h-full flex justify-end items-start p-4 w-full fixed z-20 bg-modal_bg_50 top-0 left-0 md:opacity-0 md:invisible ${modalOpenClasses} backdrop-blur transition-opacity`}
				onClick={closeModal}>
				<button onClick={closeModal}>
					<CloseIcon className='stroke-white' />
				</button>
			</div>
			<aside
				className={`flex flex-col justify-between items-center h-full w-60 p-4 pb-20 fixed z-20 bg-dark_purple md:left-0 ${menuOpenClasses} transition-all overflow-auto scrollbar-thin scrollbar-thumb-light_purple scrollbar-thumb-rounded-md`}>
				<div>
					<img src={logoWhite} alt='rentify-logo' />
				</div>
			</aside>
		</div>
	)
}

export default AdminAside
