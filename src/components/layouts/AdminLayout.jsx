import { useModal } from '../../hooks/useModal'

import AdminAside from './AdminAside'
import AdminHeader from './AdminHeader'

/* eslint-disable react/prop-types */
const AdminLayout = ({ children }) => {
	const [isOpenSide, openSide, closeSide] = useModal()
	return (
		<div className='flex'>
			<AdminAside isOpen={isOpenSide} closeModal={closeSide} />
			<div className='w-full md:pl-60 '>
				<AdminHeader openModal={openSide} />
				<main className='px-4 mt-4'>{children}</main>
			</div>
		</div>
	)
}

export default AdminLayout
