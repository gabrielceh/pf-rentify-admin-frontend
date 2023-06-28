import { useModal } from '../../hooks/useModal'

import AdminAside from './AdminAside'
import AdminHeader from './AdminHeader'

/* eslint-disable react/prop-types */
const AdminLayout = ({ children }) => {
	const [isOpenSide, openSide, closeSide] = useModal()
	return (
		<div className='flex'>
			<AdminAside isOpen={isOpenSide} closeModal={closeSide} />
			<div className='w-full md:pl-60 relative'>
				<AdminHeader openModal={openSide} />
				<main className='p-4 mt-20 w-full 2xl:max-w-[1920px] h-[90vh]  mx-auto'>
					<div className='w-full h-full border-[1px] border-dashed rounded-lg border-gray_dark p-4 overflow-auto scrollbar-thin scrollbar-thumb-dark_purple scrollbar-thumb-rounded-md scrollbar-track-medium_purple'>
						{children}
					</div>
				</main>
			</div>
		</div>
	)
}

export default AdminLayout
