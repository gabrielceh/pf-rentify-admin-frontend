import { useState, useEffect } from 'react'

import { dataReports } from '../../utils/data'
import TitleSection from '../../components/TitleSection'
import BarChart from '../../components/reports/barCharts/BarChart'
import { useDispatch, useSelector } from 'react-redux'
import { getReport } from '../../app/features/reports/reportSlice'

const Reports = () => {
	const [dataSelect, setDataSelect] = useState([])
	const [typeChart, setTypeChart] = useState('bars')
	const [labelData, setLabelData] = useState('users')
	const [dataShow, setDataShow] = useState([])
	const reportState = useSelector((state) => state.report)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!reportState.data.users.length) {
			dispatch(getReport())
		}
		if (reportState.data.users.length) {
			const dataOptions = Object.keys(reportState.data)
			setDataSelect(dataOptions)
		}
	}, [])

	useEffect(() => {
		setDataShow(reportState.data[labelData])
	}, [labelData])

	return (
		<section>
			<TitleSection title='reports' />
			<article className='mb-8'>
				<div className='flex items-center gap-4 mb-4'>
					{dataSelect.map((select, index) => (
						<button
							key={index}
							onClick={() => setLabelData(select)}
							className={
								labelData === select
									? 'bg-dark_purple text-white px-2 py-1 rounded-md transition-colors capitalize'
									: 'px-2 py-1 rounded-md hover:bg-medium_purple hover:text-white transition-colors capitalize'
							}>
							{select}
						</button>
					))}
				</div>
				<div className='w-full h-[1px] bg-gray_medium dark:bg-gray_dark'></div>
				<div>
					<button onClick={() => setTypeChart('bars')}>Bars</button>
					<button onClick={() => setTypeChart('pie')}>Pie</button>
				</div>
			</article>

			<div>
				{labelData === 'users' && (
					<BarChart
						data={dataShow}
						dataKey='name'
						bars={[{ name: 'total', color: '#9900F0' }]}
						title='Users Status'
					/>
				)}
				{labelData === 'user-membership' && (
					<BarChart
						data={dataShow}
						dataKey='name'
						title='Users Membership'
						bars={[
							{ name: 'active', color: '#1cb891' },
							{ name: 'inactive', color: '#dbc027' },
							{ name: 'banned', color: '#ff3c7d' },
							{ name: 'total', color: '#9900F0' },
						]}
					/>
				)}
				{labelData === 'products' && (
					<BarChart
						data={dataShow}
						dataKey='name'
						title='Products'
						bars={[{ name: 'total', color: '#1cb891' }]}
					/>
				)}
			</div>
		</section>
	)
}

export default Reports
