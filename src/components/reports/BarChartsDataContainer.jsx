/* eslint-disable react/prop-types */
import BarChartData from './barCharts/BarChartData'

const BarChartsDataContainer = ({ labelData, dataShow }) => {
	return (
		<div>
			{labelData === 'users' && (
				<BarChartData
					data={dataShow}
					dataKey='name'
					bars={[{ name: 'total', color: '#9900F0' }]}
					title='Users Status'
				/>
			)}
			{labelData === 'user-membership' && (
				<BarChartData
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
				<BarChartData
					data={dataShow}
					dataKey='name'
					title='Products'
					bars={[{ name: 'total', color: '#1cb891' }]}
				/>
			)}
		</div>
	)
}

export default BarChartsDataContainer
