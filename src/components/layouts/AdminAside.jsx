/* eslint-disable react/prop-types */
import { Link, NavLink } from 'react-router-dom'
import logoWhite from '../../assets/image/logo-rentify-white.png'
import { asideLinks } from '../../utils/asideLinks'
import CloseIcon from '../icons/CloseIcon'
import { routesName } from '../../utils/routes_name'

const AdminAside = ({ isOpen, closeModal }) => {
	const modalOpenClasses = isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
	const menuOpenClasses = isOpen ? 'left-0' : 'left-[-100vh]'

	const activeLink =
		'flex items-center gap-2 w-full p-2 rounded-md text-white bg-medium_purple hover:bg-light_purple transition-colors'
	const noActiveLink =
		'flex items-center gap-2 w-full p-2 rounded-md text-white hover:bg-light_purple transition-colors'

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
				className={`flex flex-col justify-start items-center gap-8 h-full w-60 p-4 pb-20 fixed z-20 bg-dark_purple md:left-0 ${menuOpenClasses} transition-all overflow-auto scrollbar-thin scrollbar-thumb-light_purple scrollbar-thumb-rounded-md`}>
				<Link to={routesName.admin.index} className='grid place-content-center'>
					<img src={logoWhite} alt='rentify-logo' />
				</Link>

				<div className='w-full flex flex-col gap-2'>
					{asideLinks.map((link) => (
						<NavLink
							key={link.id}
							to={link.to}
							className={({ isActive }) => (isActive ? activeLink : noActiveLink)}>
							<span className='aside-link-container'>{link.icon}</span>
							<span>{link.name}</span>
						</NavLink>
					))}
				</div>
			</aside>
		</div>
	)
}

export default AdminAside
