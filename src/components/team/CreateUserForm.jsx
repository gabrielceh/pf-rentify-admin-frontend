/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form'
import Input from '../inputs/Input'
import { emailRegex, passRegex } from '../../utils/regular_expresions'
import Errors from '../inputs/Errors'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
// import InputFile from '../inputs/InputFile'
import { useContext, useEffect } from 'react'
import { ToastContext } from '../../context/ToastContext'
import { createUserAdmin } from '../../app/features/team/teamSlice'
import CloseIcon from '../icons/CloseIcon'

const CreateUserForm = ({ closeModal }) => {
	const dispatch = useDispatch()
	const teamState = useSelector((state) => state.team)
	const { addToast } = useContext(ToastContext)
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm()

	useEffect(() => {
		if (teamState.statusCreated === 'success') {
			closeModal()
			return addToast({
				title: 'Success',
				description: 'User created',
				type: 'success',
			})
		}
		if (teamState.statusCreated === 'error') {
			return addToast({
				title: 'Error',
				description: teamState.errorCreated,
				type: 'danger',
			})
		}
	}, [teamState.statusCreated])

	const onsubmit = (data) => {
		dispatch(createUserAdmin(data))
	}

	return (
		<div className='relative bg-white dark:bg-card_dark w-full max-w-[400px] h-[400px] mx-auto p-4 rounded-lg'>
			<button
				onClick={closeModal}
				className='absolute right-4 bg-dark_purple hover:bg-medium_purple p-1 rounded-md'>
				<CloseIcon className='stroke-white w-6 h-6' />
			</button>
			<div className='mt-8'>
				<h3 className='text-xl mb-4'>Create Admin user</h3>
				<form action='' onSubmit={handleSubmit(onsubmit)}>
					<Input
						label='Email'
						type='email'
						name='email'
						register={register}
						options={{ required: true, pattern: emailRegex }}>
						{errors.email?.type === 'required' && <Errors errorMsg='Email is required' />}
						{errors.email?.type === 'pattern' && <Errors errorMsg='Email is not valid' />}
					</Input>
					<Input
						label='Password'
						type='password'
						name='password'
						register={register}
						options={{ required: true, pattern: passRegex }}>
						{errors.password?.type === 'required' && <Errors errorMsg='Password is required.' />}
						{errors.password?.type === 'pattern' && (
							<Errors errorMsg='Password is not valid. At least one number and one capital letter' />
						)}
					</Input>
					{/* <Input
					label='Name'
					type='text'
					name='name'
					register={register}
					options={{ required: true }}>
					{errors.name?.type === 'required' && <Errors errorMsg='Name is required' />}
				</Input>
				<Input label='Phone' type='number' name='phone' register={register} options={{}}></Input>

				<InputFile label='Picture' name='file' register={register}></InputFile> */}

					<button
						type='submit'
						className='w-full bg-dark_purple text-white text-center px-8 py-2 rounded-md mt-3 hover:bg-medium_purple active:scale-95 transition'>
						{teamState.statusCreated === 'loading' ? (
							<Loader className='w-4 h-4 stroke-light_purple animate-spin inline' />
						) : (
							'Create'
						)}
					</button>
				</form>
			</div>
		</div>
	)
}

export default CreateUserForm
