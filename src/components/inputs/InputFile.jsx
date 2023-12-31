/* eslint-disable react/prop-types */
const InputFile = ({ label, name, register, url, options = {}, onchange = () => {}, children }) => {
	return (
		<div className=' flex flex-col justify-center items-center max-w-[300px]'>
			<div className='w-60 h-60 rounded-full overflow-hidden border-4 border-white bg-white'>
				<img src={url} alt={name} className='h-full w-full object-cover' />
			</div>
			<div className='flex flex-col gap-2'>
				<label htmlFor={name} className='text-gray_dark text-sm'>
					{label}
				</label>
				<input
					type='file'
					id={name}
					{...register(name, options)}
					className='p-2 w-[250px] bg-body_light dark:bg-card_dark rounded-md border-2 border-gray_medium outline-none focus:outline-2 focus:outline-dark_purple'
					onChange={onchange}
				/>
				<div>{children}</div>
			</div>
		</div>
	)
}

export default InputFile
