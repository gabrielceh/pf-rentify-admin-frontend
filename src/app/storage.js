import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import reportSlice from './features/reports/reportSlice'
import usersSlice from './features/users/usersSlice'

export const store = configureStore({
	reducer: {
		user: userSlice,
		report: reportSlice,
		users: usersSlice,
	},
})
