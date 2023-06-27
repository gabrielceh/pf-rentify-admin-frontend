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
		<form onSubmit={handleSubmit(submitForm)}>
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

			<button type='submit'>Login</button>
		</form>
	)
}

export default LoginForm
