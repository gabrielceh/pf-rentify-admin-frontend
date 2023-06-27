/* eslint-disable react/prop-types */
const Errors = ({ errorMsg }) => {
	return (
		<div>
			<span className='text-danger text-sm'>{errorMsg}</span>
		</div>
	)
}

export default Errors
