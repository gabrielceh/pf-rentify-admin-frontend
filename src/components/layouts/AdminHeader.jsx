/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import logo from '../../assets/image/logo-rentify.png'
import HamburgerIcon from '../icons/HamburgerIcon'
import BtnDarkMode from './BtnDarkMode'
import BtnUser from './BtnUser'
import { routesName } from '../../utils/routes_name'

const AdminHeader = ({ openModal }) => {
	return (
		<header className='w-full shadow-md px-4 fixed z-10 top-0 right-0'>
			<div className='flex justify-between items-center w-full 2xl:max-w-[1920px] h-11 mx-auto py-8 '>
				<Link to={routesName.admin.index} className='w-36 h-11 md:hidden'>
					<img src={logo} alt='logo-rentify' className='w-full' />
				</Link>
				<section className='md:w-full  flex justify-end items-center gap-6'>
					<BtnDarkMode />
					<BtnUser />
					<button onClick={openModal} className='md:hidden'>
						<HamburgerIcon className='stroke-dark_purple dark:stroke-light_purple' />
					</button>
				</section>
			</div>
		</header>
	)
}

export default AdminHeader
