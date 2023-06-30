/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form'
import Select from '../inputs/Select'
import { useDispatch } from 'react-redux'

const EditRolForm = ({ idUser, role, options, updateFunc }) => {
	const { control, handleSubmit } = useForm()
	const dispatch = useDispatch()

	const onsubmit = (data) => {
		if (data.role) {
			dispatch(updateFunc({ ...data, idUser }))
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onsubmit)}
			className='flex flex-col items-center gap-4 mt-8 w-full'>
			<Select
				name='role'
				label='Change role'
				control={control}
				defaultValue={role}
				options={options}
			/>
			<button
				type='submit'
				className='bg-dark_purple hover:bg-medium_purple text-white px-4 py-1 rounded-md'>
				Edit Role
			</button>
		</form>
	)
}

export default EditRolForm
