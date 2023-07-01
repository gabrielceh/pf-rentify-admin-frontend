/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Input from '../inputs/Input'
import Errors from '../inputs/Errors'
import Loader from '../Loader'
import InputFile from '../inputs/InputFile'
import { getImageToShow } from '../../utils/showImg'
import { phoneRegex } from '../../utils/regular_expresions'

const ProfileFormEdit = ({ value, type, label, defaultValue, eventSubmit, loading }) => {
	const [urlImageToShow, seturlImageToShow] = useState(defaultValue)
	const userState = useSelector((state) => state.user)

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm()

	const onsubmit = (data) => {
		let dataForm = {}
		if (type !== 'file') {
			dataForm = { ...data, idUser: userState.user.idUser, uid: userState.user.uid }
		} else {
			const file = data.image[0]
			dataForm = { file: file, idUser: userState.user.idUser, uid: userState.user.uid }
		}

		eventSubmit(dataForm)
	}

	const handleImageChange = async (event) => {
		const url = await getImageToShow(event.target.files[0])
		seturlImageToShow(url)
	}

	const validateImageFile = (files) => {
		const file = files[0]
		if (file.type.split('/')[0] === 'image') {
			// 500kb (tamaño máximo permitido)
			if (file.size <= 512000) {
				return true
			} else {
				return 'Max 500kb'
			}
		} else {
			return 'Please, select a image'
		}
	}

	return (
		<form
			action=''
			onSubmit={handleSubmit(onsubmit)}
			className='flex items-center gap-2 w-full max-w-[300px] mx-auto'>
			{type !== 'file' ? (
				<>
					<Input
						label={label}
						type={type}
						name={value}
						register={register}
						defaultValue={defaultValue}
						options={{ required: true, pattern: type === 'tel' ? phoneRegex : '' }}>
						{errors[value]?.type === 'required' && <Errors errorMsg={`${value} is required`} />}
						{errors[value]?.type === 'pattern' && <Errors errorMsg={`${value} is not valid`} />}
					</Input>
					<button
						type='submit'
						className='bg-dark_purple text-white text-center px-8 py-2 rounded-md mt-3 hover:bg-medium_purple active:scale-95 transition'>
						{loading === 'loading' ? (
							<Loader className='w-4 h-4 stroke-light_purple animate-spin inline' />
						) : (
							'Edit'
						)}
					</button>
				</>
			) : (
				<div>
					<InputFile
						label={label}
						name={value}
						register={register}
						options={{ required: true, validate: validateImageFile }}
						onchange={handleImageChange}
						url={urlImageToShow}>
						{errors[value]?.type === 'validate' && <Errors errorMsg={errors[value].message} />}
						{errors[value]?.type === 'required' && <Errors errorMsg='Img is required' />}
					</InputFile>
					<button
						type='submit'
						className='bg-dark_purple text-white text-center px-8 py-2 rounded-md mt-3 hover:bg-medium_purple active:scale-95 transition'>
						{loading === 'loading' ? (
							<Loader className='w-4 h-4 stroke-light_purple animate-spin inline' />
						) : (
							'Edit'
						)}
					</button>
				</div>
			)}
		</form>
	)
}

export default ProfileFormEdit
