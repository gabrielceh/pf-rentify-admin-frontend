import { useDispatch, useSelector } from 'react-redux'
import { getTeamList, getTeamNextList, searchTeam } from '../../app/features/team/teamSlice'
import { ADMIN_API } from '../../utils/apiRoutes'
import { useContext, useEffect } from 'react'
import { selectTeamStatusOptions } from '../../utils/selectsOptions'
import { useModal } from '../../hooks/useModal'
import Loader from '../../components/Loader'
import TableTeam from '../../components/tables/TableTeams'
import BtnRefreshData from '../../components/BtnRefreshData'
import UserFormFilter from '../../components/UserFormFilter'
import Modal from '../../components/Modal'
import Search from '../../components/Search'
import SectionDescription from '../../components/SectionDescription'
import TitleSection from '../../components/TitleSection'
import CreateUserForm from '../../components/team/CreateUserForm'
import { ToastContext } from '../../context/ToastContext'

const Teams = () => {
	const dispatch = useDispatch()
	const teamState = useSelector((state) => state.team)
	const userState = useSelector((state) => state.user)
	const [isOpenCreate, openCreate, closeCreate] = useModal()
	const { addToast } = useContext(ToastContext)

	useEffect(() => {
		getAllTeam(`${ADMIN_API}/admins-sudo`)
	}, [])

	useEffect(() => {
		if (teamState.status === 'error') {
			addToast({
				title: 'Error',
				description: 'Somethin happened with product',
				type: 'danger',
			})
		}
	}, [teamState.status])

	const getAllTeam = (endpoint) => {
		dispatch(getTeamList(endpoint))
	}

	const getAllUsers = (endpoint) => {
		dispatch(getTeamList(endpoint))
	}

	const restarData = () => {
		dispatch(getTeamList(`${ADMIN_API}/admins-sudo`))
	}

	const filterData = (endpoint) => {
		getAllUsers(`${ADMIN_API}/admins-sudo/${endpoint}`)
	}

	const handleNext = () => {
		dispatch(getTeamNextList(teamState.next))
	}

	return (
		<div>
			<TitleSection title='Team' />
			<section className='mb-16 w-full flex flex-col md:flex-row md:justify-between md:items-center gap-y-12'>
				<SectionDescription description='List of the Rent-ify team' />
				<Search searchFunction={searchTeam} />
			</section>

			<section className='flex items-center justify-between mb-6'>
				<div className='flex items-center gap-5'>
					<BtnRefreshData onrefresh={restarData} />
					<UserFormFilter options={selectTeamStatusOptions} onchange={filterData} />
				</div>
				{userState.user.role === 'sudo' && (
					<button
						onClick={openCreate}
						className='bg-medium_purple hover:bg-dark_purple text-white px-3 py-1 rounded-md'>
						Create
					</button>
				)}
			</section>

			{teamState.status === 'loading' && (
				<div className='w-full h-[700px] grid place-content-center'>
					<Loader className='w-16 h-16 animate-spin' />
				</div>
			)}

			{teamState.status === 'success' && <TableTeam team={teamState.team} />}

			{teamState.next && teamState.status === 'success' ? (
				<div className='mt-6'>
					<button
						className='bg-dark_purple hover:bg-medium_purple text-white px-3 py-1 rounded-md'
						onClick={handleNext}>
						More
					</button>
				</div>
			) : (
				''
			)}

			{isOpenCreate && (
				<Modal>
					<button onClick={closeCreate}>close</button>
					<CreateUserForm closeModal={closeCreate} />
				</Modal>
			)}
		</div>
	)
}

export default Teams
