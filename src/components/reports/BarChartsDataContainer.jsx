/* eslint-disable react/prop-types */
import { barchartcoptions } from '../../utils/barchartVariables'
import BarChartData from './barCharts/BarChartData'

const BarChartsDataContainer = ({ labelData, dataShow }) => {
	return (
		<div>
			{labelData === barchartcoptions.users && (
				<BarChartData
					data={dataShow}
					dataKey='name'
					bars={[{ name: 'total', color: '#9900F0' }]}
					title='Users Status'
				/>
			)}
			{labelData === barchartcoptions['user-membership'] && (
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
			{labelData === barchartcoptions.products && (
				<BarChartData
					data={dataShow}
					dataKey='name'
					title='Products'
					bars={[{ name: 'total', color: '#1cb891' }]}
				/>
			)}
			{labelData === barchartcoptions.suscriptions && (
				<BarChartData
					data={dataShow}
					dataKey='name'
					title='Suscriptions'
					bars={[{ name: 'total', color: '#1cb891' }]}
				/>
			)}
			{labelData === barchartcoptions['products-featured'] && (
				<BarChartData
					data={dataShow}
					dataKey='name'
					title='Products Featured'
					bars={[{ name: 'total', color: '#1cb891' }]}
				/>
			)}
			{labelData === barchartcoptions.orders && (
				<BarChartData
					data={dataShow}
					dataKey='name'
					title='Orders'
					bars={[{ name: 'total', color: '#1cb891' }]}
				/>
			)}
		</div>
	)
}

export default BarChartsDataContainer
