import { useForm } from 'react-hook-form'
import { emailRegex, passRegex } from '../utils/regular_expresions'
import { useDispatch, useSelector } from 'react-redux'
import { loginAdmin } from '../app/features/user/userSlice'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { routesName } from '../utils/routes_name'
import { ToastContext } from '../context/ToastContext'
import Loader from './Loader'
import Input from './inputs/Input'
import Errors from './inputs/Errors'

const LoginForm = () => {
	const { addToast } = useContext(ToastContext)
	const dispatch = useDispatch()
	const userState = useSelector((state) => state.user)
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		email: '',
		password: '',
	})

	useEffect(() => {
		if (userState.status === 'success') {
			navigate(routesName.admin.index, { replace: true })
		}
		if (userState.status === 'error') {
			addToast({
				title: 'Error',
				description: userState.error,
				type: 'danger',
			})
		}
	}, [userState.status])

	const submitForm = (data) => {
		dispatch(loginAdmin(data))
	}

	return (
		<form
			onSubmit={handleSubmit(submitForm)}
			className='flex flex-col justify-evenly items-center w-full max-w-[384px] md:w-[500px] md:max-w-[600px] h-96 mx-auto px-4 md:px-8 py-8 md:py-12 rounded-lg bg-white'>
			<div className='w-full flex flex-col gap-4'>
				<div className='flex flex-col gap-2 w-full'>
					<label htmlFor='email' className='text-gray_dark text-sm'>
						Your Email
					</label>
					<input
						type='email'
						id='email'
						name='email'
						{...register('email', { required: true, pattern: emailRegex })}
						placeholder='Ex: john@mail.com'
						className='w-full p-2 bg-body_light text-card_dark rounded-md border-2 border-gray_medium outline-none focus:outline-2 focus:outline-dark_purple'
					/>
					<div>
						{errors.email?.type === 'required' && <Errors errorMsg='Email is required' />}
						{errors.email?.type === 'pattern' && <Errors errorMsg='Email is not valid' />}
					</div>
				</div>

				<div className='flex flex-col gap-2 w-full'>
					<label htmlFor='password' className='text-gray_dark text-sm'>
						Your Password
					</label>
					<input
						type='password'
						id='password'
						name='password'
						{...register('password', { required: true, pattern: passRegex })}
						className='w-full p-2 bg-body_light text-card_dark rounded-md border-2 border-gray_medium outline-none focus:outline-2 focus:outline-dark_purple'
					/>
					<div>
						{errors.password?.type === 'required' && <Errors errorMsg='Password is required' />}
						{errors.password?.type === 'pattern' && (
							<Errors errorMsg='Password is not valid. Min 6 char. One number. One Capital letter' />
						)}
					</div>
				</div>
			</div>

			<button
				type='submit'
				className='w-full bg-dark_purple text-white text-center px-8 py-2 rounded-md mt-3 hover:bg-medium_purple active:scale-95 transition'>
				{userState.status === 'loading' ? (
					<Loader className='w-4 h-4 stroke-light_purple animate-spin inline' />
				) : (
					'Login'
				)}
			</button>
		</form>
	)
}

export default LoginForm
