import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOrdersByUser, getUserByIdDB } from '../../services/usersService'
import { formatDate } from '../../utils/formatDate'
import TitleSection from '../../components/TitleSection'
import Loader from '../../components/Loader'
import { statusColors, statusOrdersColors } from '../../utils/statusColors'
import BtnRefreshData from '../../components/BtnRefreshData'
import UserFormFilter from '../../components/UserFormFilter'
import { statusOrderOptions } from '../../utils/selectsOptions'
import { ADMIN_API } from '../../utils/apiRoutes'

const UserOrdersDetails = () => {
	const { id } = useParams()
	const [user, setUser] = useState(null)
	const [orders, setOrders] = useState({
		count: 0,
		next: null,
		results: [],
	})
	const [status, setStatus] = useState({
		orders: 'idle',
		user: 'idle',
		more: 'idle',
	})
	const [errors, setErrors] = useState(null)

	const getOrders = async (endpoint, setData, setStatus, setErrors) => {
		setStatus({ ...status, orders: 'loading' })
		try {
			const data = await getOrdersByUser(endpoint)
			setData(data)
			setStatus({ ...status, orders: 'success' })
		} catch (error) {
			console.log(error)
			setErrors(error)
			setStatus({ ...status, orders: 'error' })
		}
	}

	const getuser = async (id, setUser, setStatus, setErrors) => {
		setStatus({ ...status, user: 'loading' })
		try {
			const dataUser = await getUserByIdDB(id)
			setUser(dataUser)
			setStatus({ ...status, user: 'success' })
		} catch (error) {
			setErrors(error.response.data.error)
			setStatus({ ...status, user: 'error' })
		}
	}

	useEffect(() => {
		getuser(id, setUser, setStatus, setErrors)
		getOrders(`${ADMIN_API}/order/user/${id}`, setOrders, setStatus, setErrors)
	}, [id])

	useEffect(() => {
		return () => {
			setOrders({
				count: 0,
				next: null,
				results: [],
			})
			setUser(null)
			setStatus({
				orders: 'idle',
				user: 'idle',
				more: 'idle',
			})
		}
	}, [])

	const getMoreOrders = async () => {
		setStatus({ ...status, more: 'loading' })
		try {
			const { data } = await axios.get(orders.next)
			setOrders({
				...orders,
				next: data.next,
				results: [...orders.results, ...data.results],
			})
			setStatus({ ...status, more: 'success' })
		} catch (error) {
			setStatus({ ...status, more: 'more' })
			setErrors(errors.response.data.error)
		}
	}

	const restarData = () => {
		getOrders(`${ADMIN_API}/order/user/${id}`, setOrders, setStatus, setErrors)
	}

	const filterData = (endpoint) => {
		getOrders(`${ADMIN_API}/order/user/${id}/${endpoint}`, setOrders, setStatus, setErrors)
	}

	return (
		<div>
			<TitleSection title='User orders' />

			{user && (
				<section>
					<span>Id user: {user.idUser}</span>
					<div className='flex gap-2 items-center'>
						<h2 className='text-xl capitalize'>{user.name || user.email}</h2>
						<span
							className={`${statusColors[user.status]} capitalize rounded-full py-1 px-2 text-xs`}>
							{user.status}
						</span>
					</div>
				</section>
			)}

			<section className='flex items-center justify-between my-6'>
				<div className='flex items-center gap-5'>
					<BtnRefreshData onrefresh={restarData} />
					<UserFormFilter options={statusOrderOptions} onchange={filterData} />
				</div>
			</section>

			<section className='mt-8'>
				{orders.results.length ? (
					orders.results.map((order) => (
						<div
							key={order.idOrder}
							className='flex flex-col gap-4 mb-3 w-full p-4 rounded-md shadow-md bg-white dark:bg-card_dark'>
							<article className='flex justify-between items-center'>
								<div className='flex items-center gap-2'>
									<span
										className={`${
											statusOrdersColors[order.status]
										} text-xs capitalize px-2 py-1 rounded-full`}>
										{order.status || 'canceled'}
									</span>
									<span>ID: {order.idOrder}</span>
								</div>
								<span className='text-sm text-gray_dark'>Date: {formatDate(order.createdAt)}</span>
							</article>
							<article>Preference ID: {order.preferenceId}</article>
							<article>
								Payment ID: {order.paymentId || <span className='text-danger'>Canceled</span>}
							</article>
						</div>
					))
				) : (
					<span>No results</span>
				)}
			</section>
			{orders.next && (
				<button
					onClick={getMoreOrders}
					className='py-2 px-6 bg-medium_purple hover:bg-dark_purple text-white rounded-md transition'>
					{status.more === 'loading' ? (
						<Loader className='w-4 h-4 stroke-light_purple animate-spin inline' />
					) : (
						'More'
					)}
				</button>
			)}
		</div>
	)
}

export default UserOrdersDetails
