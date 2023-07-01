import { useSelector } from 'react-redux'
import { formatDate } from '../../utils/formatDate'
import { isImgValid } from '../../utils/isImgValid'
import { useEffect, useState } from 'react'
import { updateNameDB, updatePhoneDB } from '../../services/authService'
import { setNameProfile, setPhoneProfile } from '../../app/features/user/userSlice'
import imgNotFound from '../../assets/image/image-not-found.jpg'
import ProfileImgSection from '../../components/profile/ProfileImgSection'
import ProfileSectionEdit from '../../components/profile/ProfileSectionEdit'

const Profile = () => {
	const [date, setDate] = useState(false)
	const [imgValid, setImgValid] = useState(false)

	const userState = useSelector((state) => state.user)

	useEffect(() => {
		setDate(formatDate(userState.user.createdAt))
		isImgValid(userState.user.image, setImgValid)
	}, [userState.user])

	return (
		<div>
			<section
				className='h-[40vh] w-full bg-black bg-center bg-cover rounded-t-md overflow-hidden'
				style={{
					backgroundImage: `url(${imgValid ? userState.user.image : imgNotFound})`,
				}}>
				<div className='bg-modal_bg_50 w-full h-full backdrop-blur-md'></div>
			</section>

			<div className='flex gap-3 justify-center items-center w-[300px] mx-auto relative -top-32'>
				<ProfileImgSection user={userState.user} />
			</div>

			<div className='relative -top-24 flex flex-col items-center justify-center gap-8'>
				<ProfileSectionEdit
					user={userState.user}
					valueToModify={'name'}
					inputType='text'
					inputLabel='Name'
					funcDB={updateNameDB}
					funcStateField={setNameProfile}
					textSize='text-4xl'
				/>

				<section className='flex flex-col md:flex-row justify-between items-center gap-4 w-full md:w-10/12 mx-auto'>
					<p>{userState.user.email}</p>

					<ProfileSectionEdit
						user={userState.user}
						valueToModify={'phone'}
						inputType='tel'
						inputLabel='Phone'
						funcDB={updatePhoneDB}
						funcStateField={setPhoneProfile}
					/>

					<p>{date}</p>
				</section>
			</div>
		</div>
	)
}

export default Profile
