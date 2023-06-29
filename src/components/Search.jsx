import React from 'react'
import { useForm } from 'react-hook-form'
import SearchIcon from './icons/SearchIcon'

const Search = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ search: '' })

	const handleSearch = (data) => {
		console.log(data)
	}

	const onchange = (event) => {
		console.log(event.target.value)
	}

	return (
		<form
			onSubmit={handleSubmit(handleSearch)}
			className='w-full md:w-1/2 flex md:justify-end gap-2'>
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
			{errors.search?.type === 'required' && <p>Please, introduce a name to search</p>}
			<button
				type='submit'
				className='bg-dark_purple hover:bg-medium_purple text-white px-3 py-1 rounded-md'>
				Search
			</button>
		</form>
	)
}

export default Search
