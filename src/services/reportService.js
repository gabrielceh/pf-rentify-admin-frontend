import axios from 'axios'
import { REPORTS_API } from '../utils/apiRoutes'

export const getReportsFromDB = async () => {
	const { data } = await axios.get(REPORTS_API)

	return data
}
