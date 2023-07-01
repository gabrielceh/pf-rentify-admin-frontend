import { useForm } from 'react-hook-form'
import { passRegex } from '../../utils/regular_expresions'
import { changePassword } from '../../services/authService'
import { ToastContext } from '../../context/ToastContext'
import TitleSection from '../../components/TitleSection'
import Errors from '../../components/inputs/Errors'
import Input from '../../components/inputs/Input'
import { useContext } from 'react'
import { firebaseErrors } from '../../utils/firebaseErrors'

const ChangePassword = () => {
	const { addToast } = useContext(ToastContext)
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm({
		odlpassword: '',
		password: '',
		repeatpassword: '',
	})

	const submit = async (data) => {
		try {
			const isChange = await changePassword({
				oldpassword: data.oldpassword,
				newpassword: data.password,
			})
			if (isChange) {
				addToast({
					title: 'Success',
					description: 'Password changed',
					type: 'success',
				})
				reset()
			}
		} catch (error) {
			addToast({
				title: 'Error',
				description:
					error.code === 'auth/wrong-password' ? 'Wrong password' : firebaseErrors(error.code),
				type: 'danger',
			})
		}
	}

	const repeatPasswordFunc = (data, form) => {
		if (form.password === data) {
			return true
		}
		return 'The passwords are not the same'
	}

	return (
		<div>
			<TitleSection title='Change your password' />

			<form action='' onSubmit={handleSubmit(submit)}>
				<Input
					label='Old password'
					type='password'
					name='oldpassword'
					register={register}
					defaultValue=''
					options={{ required: true, pattern: passRegex }}>
					{errors.oldpassword?.type === 'required' && <Errors errorMsg='Password is required' />}
					{errors.oldpassword?.type === 'pattern' && (
						<Errors errorMsg='Password is not valid. Min 6 char. One number. One Capital letter' />
					)}
				</Input>
				<Input
					label='Password'
					type='password'
					name='password'
					register={register}
					defaultValue=''
					options={{ required: true, pattern: passRegex }}>
					{errors.password?.type === 'required' && <Errors errorMsg='Password is required' />}
					{errors.password?.type === 'pattern' && (
						<Errors errorMsg='Password is not valid. Min 6 char. One number. One Capital letter' />
					)}
				</Input>
				<Input
					label='Repeat Password'
					type='password'
					name='repeatpassword'
					register={register}
					defaultValue=''
					options={{
						required: true,
						pattern: passRegex,
						validate: (data, form) => repeatPasswordFunc(data, form),
					}}>
					{errors.repeatpassword?.type === 'required' && <Errors errorMsg='Password is required' />}
					{errors.repeatpassword?.type === 'validate' && (
						<Errors errorMsg={errors.repeatpassword?.message} />
					)}
					{errors.repeatpassword?.type === 'pattern' && (
						<Errors errorMsg='Password is not valid. Min 6 char. One number. One Capital letter' />
					)}
				</Input>

				<button type='submit'>Change password</button>
			</form>
		</div>
	)
}

export default ChangePassword
