/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

const BarChartData = ({ data, dataKey, bars, title }) => {
	return (
		<>
			<div className='mb-8'>
				<h3 className='text-center text-xl'>{title}</h3>
			</div>
			<ResponsiveContainer width={'100%'} minWidth={300} height={550}>
				<BarChart data={data}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey={dataKey} />
					<YAxis />
					<Tooltip labelStyle={{ color: 'black' }} />
					<Legend />
					{bars.map((bar, index) => (
						<Bar key={index} dataKey={bar.name} fill={bar.color} />
					))}
				</BarChart>
			</ResponsiveContainer>
		</>
	)
}

export default BarChartData
