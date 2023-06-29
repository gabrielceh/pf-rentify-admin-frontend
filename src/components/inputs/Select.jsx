/* eslint-disable react/prop-types */
import { Controller } from 'react-hook-form'

const Select = ({ name, label, control, defaultValue, options, ...props }) => {
	return (
		<div className='flex flex-col items-center gap-3 w-full text-center'>
			<label htmlFor={name} className='text-gray_dark text-sm font-bold'>
				{label}
			</label>
			<Controller
				name={name}
				control={control}
				defaultValue={defaultValue}
				render={({ field }) => (
					<select
						{...field}
						{...props}
						id={name}
						className='w-1/2 py-1 px-2 border-b-[1px] border-b-gray_dark focus:outline-dark_purple bg-white dark:bg-card_dark'>
						{options.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				)}
			/>
		</div>
	)
}

export default Select
