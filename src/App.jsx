import { useContext, useEffect } from 'react'
import { ToastContext } from './context/ToastContext'
import { LSVariables } from './utils/LSVariables'
import { useDispatch, useSelector } from 'react-redux'
import { setInitialUser } from './app/features/user/userSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase.config'
import AppRouter from './routes/AppRouter'
import Toast from './components/Toast/Toast'
import Loader from './components/Loader'

const userAuth = localStorage.getItem(LSVariables.authAdmin)
	? JSON.parse(localStorage.getItem(LSVariables.authAdmin))
	: { loggin: false, user: {} }

function App() {
	const { toastList, deleteToast } = useContext(ToastContext)
	const userState = useSelector((state) => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		if (userAuth.login) {
			dispatch(setInitialUser({ idUser: userAuth.user.idUser, token: userAuth.token }))
		}

		const unsuscribe = onAuthStateChanged(auth, () => {})
		return () => unsuscribe()
	}, [])

	return (
		<div className='bg-body_light text-text_light dark:bg-body_dark dark:text-text_dark min-h-screen transition'>
			{userState.status === 'loading' ? (
				<div className='fixed min-h-screen w-full grid place-content-center'>
					<Loader className='w-8 h-8 animate-spin' />
				</div>
			) : (
				<>
					<AppRouter />

					{toastList.length > 0 && (
						<Toast
							toastList={toastList}
							deleteToast={deleteToast}
							position='top-center'
							autoDeleteTime={2000}
						/>
					)}
				</>
			)}
		</div>
	)
}

export default App
