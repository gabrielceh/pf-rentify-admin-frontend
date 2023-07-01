import { useSelector } from 'react-redux'
import { useState } from 'react'
import 'react-calendar/dist/Calendar.css'
import '../../styles/Calendar.css'
import TitleSection from '../../components/TitleSection'
import Calendar from 'react-calendar'

const Index = () => {
	const [date, setDate] = useState(new Date())
	const userState = useSelector((state) => state.user)

	return (
		<div>
			<TitleSection title={`Welcome, ${userState.user.name || userState.user.email} 🥳`} />
			<div className='w-full min-w-[350px] max-w-[500px] mt-16'>
				<Calendar onChange={setDate} value={date} />
			</div>
		</div>
	)
}

export default Index
