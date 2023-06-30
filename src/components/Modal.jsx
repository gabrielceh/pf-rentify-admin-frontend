/* eslint-disable react/prop-types */
const Modal = ({ children }) => {
	return (
		<div className='fixed z-50 top-0 left-0 w-full min-h-screen p-4 py-16 md:p-16 overflow-hidden bg-modal_bg_25 backdrop-blur-md'>
			{children}
		</div>
	)
}

export default Modal
