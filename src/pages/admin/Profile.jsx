import { useSelector } from 'react-redux'
import { isImgValid } from '../../utils/isImgValid'
import { formatDate } from '../../utils/formatDate'
import { useEffect, useState } from 'react'
import imgNotFound from '../../assets/image/image-not-found.jpg'
import EditIcon from '../../components/icons/EditICon'
import CloseIcon from '../../components/icons/CloseIcon'
import ProfileFormEdit from '../../components/profile/ProfileFormEdit'

const Profile = () => {
	const [imgValid, setImgValid] = useState(false)
	const [date, setDate] = useState(false)
	const [showForm, setShowForm] = useState({
		name: false,
		phone: false,
		image: false,
	})
	const userState = useSelector((state) => state.user)

	useEffect(() => {
		isImgValid(userState.user.image, setImgValid)
		setDate(formatDate(userState.user.createdAt))
	}, [userState.user])

	const handleEdit = (value) => {
		setShowForm({
			...showForm,
			[value]: !showForm[value],
		})
	}

	return (
		<div>
			<div className='flex gap-3 items-end'>
				{showForm.image ? (
					<ProfileFormEdit
						label='Image'
						type='file'
						value='image'
						defaultValue={imgValid ? userState.user.image : imgNotFound}
					/>
				) : (
					<div className='w-60 h-60 rounded-full overflow-hidden'>
						<img
							src={imgValid ? userState.user.image : imgNotFound}
							alt={userState.user.name}
							className='w-full h-full object-cover'
						/>
					</div>
				)}
				<button onClick={() => handleEdit('image')}>
					{showForm.image ? <CloseIcon /> : <EditIcon />}
				</button>
			</div>

			<div className='flex gap-3 items-center'>
				{showForm.name ? (
					<ProfileFormEdit
						label='Name'
						type='text'
						value='name'
						defaultValue={userState.user.name || ''}
					/>
				) : (
					<h1 className='text-4xl'>{userState.user.name || 'No name'} </h1>
				)}
				<button onClick={() => handleEdit('name')}>
					{showForm.name ? <CloseIcon /> : <EditIcon />}
				</button>
			</div>

			<p>{userState.user.email}</p>

			<div className='flex gap-3 items-center'>
				{showForm.phone ? (
					<ProfileFormEdit
						label='Phone'
						type='number'
						value='phone'
						defaultValue={userState.user.phone || ''}
					/>
				) : (
					<p className=''>{userState.user.phone || 'No name'} </p>
				)}
				<button onClick={() => handleEdit('phone')}>
					{showForm.phone ? <CloseIcon /> : <EditIcon />}
				</button>
			</div>

			<p>{date}</p>
			<p>{userState.user.role}</p>
		</div>
	)
}

export default Profile
