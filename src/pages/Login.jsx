import LoginForm from '../components/LoginForm'
import logo from '../assets/image/logo-rentify.png'
import blurImg from '../assets/image/blur.svg'

const Login = () => {
	return (
		<div
			className='grid place-content-center min-h-screen bg-no-repeat bg-cover bg-center p-4 md:p-8 w-full bg-white'
			style={{ backgroundImage: `url(${blurImg})` }}>
			<section className='flex flex-col justify-center items-center gap-5 mb-12'>
				<img src={logo} alt='rentify-logo' className='w-5/12 min-w-[135px]' />
				<h3 className='text-center text-xl md:text-3xl text-card_dark'>Sign in to your account</h3>
			</section>

			<LoginForm />
		</div>
	)
}

export default Login
