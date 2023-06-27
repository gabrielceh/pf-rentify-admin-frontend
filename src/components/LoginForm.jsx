import { useForm } from 'react-hook-form'
import { emailRegex, passRegex } from '../utils/regular_expresions'
import Input from './inputs/Input'
import Errors from './inputs/Errors'

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		email: '',
		password: '',
	})

	const submitForm = (data) => {
		console.log(data)
	}

	return (
		<form
			onSubmit={handleSubmit(submitForm)}
			className='flex flex-col justify-evenly items-center w-full max-w-[384px] md:w-[500px] md:max-w-[600px] h-96 mx-auto px-4 md:px-8 py-8 md:py-12 rounded-lg bg-white'>
			<div className='w-full flex flex-col gap-4'>
				<Input
					type='email'
					label='Your Email'
					name='email'
					placeholder='Ex: john@mail.com'
					register={register}
					options={{ required: true, pattern: emailRegex }}>
					{errors.email?.type === 'required' && <Errors errorMsg='Email is required' />}
					{errors.email?.type === 'pattern' && <Errors errorMsg='Email is not valid' />}
				</Input>

				<Input
					type='password'
					label='Your Password'
					name='password'
					register={register}
					options={{ required: true, pattern: passRegex }}>
					{errors.password?.type === 'required' && <Errors errorMsg='Password is required' />}
					{errors.password?.type === 'pattern' && <Errors errorMsg='Password is not valid' />}
				</Input>
			</div>

			<button
				type='submit'
				className='w-full bg-dark_purple text-white px-8 py-2 rounded-md mt-3 hover:bg-medium_purple active:scale-95 transition'>
				Login
			</button>
		</form>
	)
}

export default LoginForm
