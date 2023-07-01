import bgHome from '../assets/image/rentify-home.png'
import logo from '../assets/image/logo-rentify-white.png'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { routesName } from '../utils/routes_name'

const Home = () => {
	const userState = useSelector((state) => state.user)
	const navigate = useNavigate()

	const handleNavAdmin = () => {
		navigate(routesName.admin.index)
	}
	const handleNavLogin = () => {
		navigate(routesName.login)
	}

	return (
		<div
			style={{ backgroundImage: `url("${bgHome}")` }}
			className='blur-in-expand w-full min-h-screen bg-cover bg-center bg-modal_bg_50'>
			<div className='bg-modal_bg_80 w-full min-h-screen flex flex-col items-center justify-center gap-8'>
				<figure className='scale-up-top'>
					<figcaption className='text-3xl text-white text-center'>Admin</figcaption>
					<img src={logo} alt='rentify' className='w-[400px]' />
				</figure>

				{userState.login ? (
					<button
						onClick={handleNavAdmin}
						className='scale-up-top border-2 border-gray_dark px-12 py-2 text-white rounde-md hover:scale-110 transition'>
						Admin
					</button>
				) : (
					<button
						onClick={handleNavLogin}
						className='border-2 border-gray_dark px-12 py-2 text-white rounde-md hover:scale-110 transition'>
						Login
					</button>
				)}
				<div className='absolute bottom-2 right-4 text-gray_dark text-xs'>
					<a
						href='https://www.freepik.es/foto-gratis/co-trabajando-personas-trabajando-juntas_23988373.htm#query=networking&position=3&from_view=keyword&track=sph#position=3&query=networking'
						rel='noreferrer'
						target='_blank'>
						Freepik
					</a>
				</div>
			</div>
		</div>
	)
}

export default Home
