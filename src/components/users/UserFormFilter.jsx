/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form'

const UserFormFilter = ({ options, onchange }) => {
	const { handleSubmit, register } = useForm({ filter: '' })

	const handleChange = (event) => {
		if (event.target.value) {
			onchange(event.target.value)
		}
	}

	return (
		<form onSubmit={handleSubmit(onsubmit)} className=''>
			<div className='flex flex-col justify-end'>
				<label htmlFor='filter' className='text-gray_dark text-sm px-2'>
					Filters:
				</label>
				<select
					name='filter'
					id='filter'
					className='px-2 py-1 bg-transparent outline-none border-b-[1px] border-transparent focus:border-b-dark_purple'
					{...register('filter')}
					onChange={handleChange}
					defaultValue=''>
					<option value='' className='bg-white dark:bg-card_dark'>
						SELECT
					</option>
					{options.map((opt) => (
						<option key={opt.value} value={opt.value} className='bg-white dark:bg-card_dark'>
							{opt.label}
						</option>
					))}
				</select>
			</div>
		</form>
	)
}

export default UserFormFilter
