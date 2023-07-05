/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Select from '../inputs/Select'

const EditStatusProduct = ({ idProd, dataToEdit, status, options, updateFunc }) => {
	const { control, handleSubmit } = useForm()
	const dispatch = useDispatch()

	const onsubmit = (data) => {
		if (data[dataToEdit]) {
			dispatch(updateFunc({ ...data, idProd }))
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onsubmit)}
			className='flex flex-col items-center gap-4 mt-8 w-full'>
			<Select
				name={dataToEdit}
				label={`Change ${dataToEdit}`}
				control={control}
				defaultValue={status}
				options={options}
			/>
			<button
				type='submit'
				className='bg-dark_purple hover:bg-medium_purple text-white px-4 py-1 rounded-md'>
				Edit Status
			</button>
		</form>
	)
}

export default EditStatusProduct
