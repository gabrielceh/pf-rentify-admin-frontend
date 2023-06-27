import AppRouter from './routes/AppRouter'
function App() {
	return (
		<div className='bg-body_light text-text_light dark:bg-body_dark dark:text-text_dark min-h-screen transition'>
			<AppRouter />
		</div>
	)
}

export default App
