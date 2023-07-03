/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import { isImgValid } from '../../utils/isImgValid'
import { updateImgDB } from '../../services/authService'
import { setImageProfile } from '../../app/features/user/userSlice'
import { firebaseErrors } from '../../utils/firebaseErrors'
import { useDispatch } from 'react-redux'
import imgNotFound from '../../assets/image/image-not-found.jpg'
import ProfileFormEdit from './ProfileFormEdit'
import BtnEditProfile from './BtnEditProfile'
import { ToastContext } from '../../context/ToastContext'

const ProfileImgSection = ({ user }) => {
	const [imgValid, setImgValid] = useState(false)
	const [showForm, setShowForm] = useState(false)
	const [statusSend, setStatusSend] = useState('idle')
	const [errorSend, setErrorSend] = useState(null)
	const dispatch = useDispatch()
	const { addToast } = useContext(ToastContext)

	useEffect(() => {
		isImgValid(user.image, setImgValid)
	}, [user])

	useEffect(() => {
		if (statusSend === 'success') {
			addToast({
				title: 'Update',
				description: `Your photo was updated`,
				type: 'success',
			})
			setShowForm(false)
		}
		if (statusSend === 'error') {
			// console.log(errorSend)
			addToast({
				title: 'Error',
				description: errorSend,
				type: 'danger',
			})
		}
	}, [statusSend])

	const handleEdit = () => {
		setShowForm(!showForm)
	}

	const submitImage = async (data) => {
		setStatusSend('loading')
		try {
			const urlimg = await updateImgDB(data)
			dispatch(setImageProfile(urlimg))
			setStatusSend('success')
		} catch (error) {
			// console.log(error)
			setStatusSend('error')
			if (error.code.includes('auth/') || error.code.includes('storage/')) {
				const errorMsg = firebaseErrors(error.code)
				setStatusSend('error')
				setErrorSend(errorMsg)
				return
			}
			setErrorSend(error.response.data.error)
		}
	}
	return (
		<>
			{showForm ? (
				<ProfileFormEdit
					label='Image'
					type='file'
					value='image'
					defaultValue={imgValid ? user.image : imgNotFound}
					eventSubmit={submitImage}
					loading={statusSend}
				/>
			) : (
				<div className='w-60 h-60 rounded-full overflow-hidden border-4 border-white bg-white'>
					<img
						src={imgValid ? user.image : imgNotFound}
						alt={user.name}
						className='h-full w-full object-cover'
					/>
				</div>
			)}
			<BtnEditProfile handleEdit={handleEdit} showForm={showForm} />
			{/* <button onClick={handleEdit}>{showForm ? <CloseIcon /> : <EditIcon />}</button> */}
		</>
	)
}

export default ProfileImgSection
