import AppRouter from './routes/AppRouter'
import { useContext, useEffect } from 'react'
import { ToastContext } from './context/ToastContext'
import { LSVariables } from './utils/LSVariables'
import { useDispatch } from 'react-redux'
import { resetUser, setUser } from './app/features/user/userSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase.config'
import Toast from './components/Toast/Toast'

const userAuth = localStorage.getItem(LSVariables.authAdmin)
	? JSON.parse(localStorage.getItem(LSVariables.authAdmin))
	: { loggin: false, user: {} }

function App() {
	const { toastList, deleteToast } = useContext(ToastContext)
	const dispatch = useDispatch()

	useEffect(() => {
		if (userAuth.login) {
			dispatch(setUser(userAuth.user))
		}
		const unsuscribe = onAuthStateChanged(auth, (user) => {
			if (!user) {
				localStorage.removeItem(LSVariables.authAdmin)
				dispatch(resetUser())
			}
		})
		return () => unsuscribe()
	}, [])

	return (
		<div className='bg-body_light text-text_light dark:bg-body_dark dark:text-text_dark min-h-screen transition'>
			<AppRouter />
			{toastList.length > 0 && (
				<Toast toastList={toastList} deleteToast={deleteToast} position='top-center' />
			)}
		</div>
	)
}

export default App
