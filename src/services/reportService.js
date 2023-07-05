import axios from 'axios'
import { REPORTS_API } from '../utils/apiRoutes'
import { getTokenConfig } from '../utils/tokenConfig'

export const getReportsFromDB = async () => {
	const config = getTokenConfig()
	const { data } = await axios.get(REPORTS_API, config)

	return data
}
