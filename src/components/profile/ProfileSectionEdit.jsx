/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import { firebaseErrors } from '../../utils/firebaseErrors'
import { useDispatch } from 'react-redux'
import ProfileFormEdit from './ProfileFormEdit'
import BtnEditProfile from './BtnEditProfile'
import { ToastContext } from '../../context/ToastContext'

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
	const { addToast } = useContext(ToastContext)

	useEffect(() => {
		if (statusSend === 'success') {
			addToast({
				title: 'Update',
				description: `${valueToModify} was updated`,
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

	const submit = async (data) => {
		setStatusSend('loading')
		try {
			// console.log(data)
			const name = await funcDB(data)
			// console.log(name)
			dispatch(funcStateField(name))
			setStatusSend('success')
		} catch (error) {
			// console.log(error)
			setStatusSend('error')
			if (error.code?.includes('auth/') || error.code?.includes('storage/')) {
				const errorMsg = firebaseErrors(error.code)
				setStatusSend('error')
				setErrorSend(errorMsg)
				return
			}
			setErrorSend('Error')
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
