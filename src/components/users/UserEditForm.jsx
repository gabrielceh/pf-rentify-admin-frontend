/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form'
import Select from '../inputs/Select'

const UserEditForm = ({ idUser, status, options }) => {
	const { control, handleSubmit } = useForm()

	const onsubmit = (data) => {
		console.log({ ...data, idUser })
	}

	return (
		<form
			onSubmit={handleSubmit(onsubmit)}
			className='flex flex-col items-center gap-4 mt-8 w-full'>
			<Select
				name='status'
				label='Change status'
				control={control}
				defaultValue={status}
				options={options}
			/>
			<button
				type='submit'
				className='bg-dark_purple hover:bg-medium_purple text-white px-4 py-1 rounded-md'>
				Edit
			</button>
		</form>
	)
}

export default UserEditForm
