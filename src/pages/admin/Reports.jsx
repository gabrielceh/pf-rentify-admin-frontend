import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReport } from '../../app/features/reports/reportSlice'
import TitleSection from '../../components/TitleSection'
import BtnSelectReports from '../../components/reports/BtnSelectReports'
import BarChartsDataContainer from '../../components/reports/BarChartsDataContainer'
import Loader from '../../components/Loader'

const Reports = () => {
	const [dataSelect, setDataSelect] = useState([])
	const [labelData, setLabelData] = useState('users')
	const [dataShow, setDataShow] = useState([])
	const reportState = useSelector((state) => state.report)
	const dispatch = useDispatch()

	useEffect(() => {
		updateData()
	}, [])

	useEffect(() => {
		if (reportState.data.users.length) {
			const dataOptions = Object.keys(reportState.data)
			setDataSelect(dataOptions)
			setDataShow(reportState.data[labelData])
		}
	}, [reportState.data.users])

	useEffect(() => {
		setDataShow(reportState.data[labelData])
	}, [labelData])

	const updateData = () => {
		dispatch(getReport())
	}

	return (
		<section>
			<TitleSection title='reports' />
			{reportState.status === 'loading' && (
				<div className='w-full h-[700px] grid place-content-center'>
					<Loader className='w-16 h-16 animate-spin' />
				</div>
			)}
			{reportState.status === 'success' && (
				<>
					<article className='mb-8'>
						<BtnSelectReports
							dataSelect={dataSelect}
							labelData={labelData}
							setLabelData={setLabelData}
							updateData={updateData}
						/>
						<div className='w-full h-[1px] bg-gray_medium dark:bg-gray_dark'></div>
					</article>

					<BarChartsDataContainer dataShow={dataShow} labelData={labelData} />
				</>
			)}
		</section>
	)
}

export default Reports
