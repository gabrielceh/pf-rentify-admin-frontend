import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import reportSlice from './features/reports/reportSlice'

export const store = configureStore({
	reducer: {
		user: userSlice,
		report: reportSlice,
	},
})
