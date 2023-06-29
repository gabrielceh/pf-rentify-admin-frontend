/* eslint-disable react/prop-types */
import React from 'react'
import { useForm } from 'react-hook-form'
import SearchIcon from './icons/SearchIcon'
import { useDispatch } from 'react-redux'
import { debounce } from '../utils/debounce'

const Search = ({ searchFunction }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ search: '' })
	const dispatch = useDispatch()

	const debounceFunc = debounce((value) => {
		if (value.trim()) {
			dispatch(searchFunction(value))
		}
	}, 500)

	const handleSearch = (data) => {
		debounceFunc(data.search)
	}

	const onchange = (event) => {
		debounceFunc(event.target.value)
	}

	return (
		<form onSubmit={handleSubmit(handleSearch)} className='w-full'>
			<div className='flex md:justify-end gap-2'>
				<div className='flex items-center gap-2 w-10/12'>
					<SearchIcon className='stroke-gray_dark' />
					<input
						type='search'
						name='search'
						placeholder='Search...'
						{...register('search', { required: true })}
						onInput={onchange}
						className='px-3 py-1 bg-transparent outline-none w-full border-[1px] border-transparent border-b-gray_dark focus:border-b-dark_purple'
					/>
				</div>
				<button
					type='submit'
					className='bg-dark_purple hover:bg-medium_purple text-white px-3 py-1 rounded-md'>
					Search
				</button>
			</div>
			{errors.search?.type === 'required' && (
				<span className='text-danger text-sm'>Please, introduce a name to search</span>
			)}
		</form>
	)
}

export default Search
