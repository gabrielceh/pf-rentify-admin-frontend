/* eslint-disable react/prop-types */
const Input = ({ label, type, name, placeholder = '', register, options, children }) => (
	<div className='flex flex-col gap-2'>
		<label htmlFor={name}>{label}</label>
		<input type={type} id={name} {...register(name, options)} placeholder={placeholder} />
		<div>{children}</div>
	</div>
)

export default Input
