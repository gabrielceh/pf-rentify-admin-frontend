/* eslint-disable react/prop-types */
import logo from '../../assets/image/logo-rentify.png'
import HamburgerIcon from '../icons/HamburgerIcon'
import BtnDarkMode from './BtnDarkMode'

const AdminHeader = ({ openModal }) => {
	return (
		<header className='w-full shadow-md px-4'>
			<div className='flex justify-between items-center w-full h-11 py-8 '>
				<section className='w-36 h-11 md:hidden'>
					<img src={logo} alt='logo-rentify' className='w-full' />
				</section>
				<section className='md:w-full  flex justify-end items-center gap-6'>
					<BtnDarkMode />
					<button onClick={openModal} className='md:hidden'>
						<HamburgerIcon className='stroke-dark_purple dark:stroke-light_purple' />
					</button>
				</section>
			</div>
		</header>
	)
}

export default AdminHeader
