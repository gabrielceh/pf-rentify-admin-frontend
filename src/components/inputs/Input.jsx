/* eslint-disable react/prop-types */
const Input = ({
	label,
	type,
	name,
	placeholder = '',
	defaultValue = '',
	register,
	options,
	children,
}) => (
	<div className='flex flex-col gap-2 w-full'>
		<label htmlFor={name} className='text-gray_dark text-sm'>
			{label}
		</label>
		<input
			type={type}
			id={name}
			{...register(name, options)}
			placeholder={placeholder}
			defaultValue={defaultValue}
			className='w-full p-2 bg-body_light dark:bg-card_dark rounded-md border-2 border-gray_medium outline-none focus:outline-2 focus:outline-dark_purple'
		/>
		<div>{children}</div>
	</div>
)

export default Input
