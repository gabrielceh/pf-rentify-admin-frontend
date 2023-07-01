/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { firebaseErrors } from '../../utils/firebaseErrors'
import { useDispatch } from 'react-redux'
import ProfileFormEdit from './ProfileFormEdit'
import BtnEditProfile from './BtnEditProfile'

const ProfileSectionEdit = ({
	user,
	valueToModify,
	inputType,
	inputLabel,
	funcDB,
	funcStateField,
	textSize = 'text-base',
}) => {
	const [showForm, setShowForm] = useState(false)
	const [statusSend, setStatusSend] = useState('idle')
	const [errorSend, setErrorSend] = useState(null)
	const dispatch = useDispatch()

	useEffect(() => {
		if (statusSend === 'success') {
			console.log(`${valueToModify} was updated`)
			setShowForm(false)
		}
		if (statusSend === 'error') {
			console.log(errorSend)
		}
	}, [statusSend])

	const handleEdit = () => {
		setShowForm(!showForm)
	}

	const submit = async (data) => {
		setStatusSend('loading')
		try {
			const name = await funcDB(data)
			dispatch(funcStateField(name))
			setStatusSend('success')
		} catch (error) {
			console.log(error)
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
		<div className='flex gap-3 items-center'>
			{showForm ? (
				<ProfileFormEdit
					label={inputLabel}
					type={inputType}
					value={valueToModify}
					defaultValue={user[valueToModify] || ''}
					eventSubmit={submit}
					loading={statusSend}
				/>
			) : (
				<p className={`${textSize}`}>
					{valueToModify === 'phone' && `${valueToModify}:`} {user[valueToModify] || 'No data'}{' '}
				</p>
			)}
			<BtnEditProfile handleEdit={handleEdit} showForm={showForm} />
			{/* <button onClick={handleEdit}>{showForm ? <CloseIcon /> : <EditIcon />}</button> */}
		</div>
	)
}

export default ProfileSectionEdit
