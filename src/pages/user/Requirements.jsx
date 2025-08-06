// Packages
import { useEffect, useState } from 'react';
import { API_DOMAIN } from '../../config';
import useWebsiteDomain from '../../hooks/useWebsiteDomain';
// Components
import Button from '../../components/Button';
import ConfirmModal from '../../components/ConfirmModal';
import LinkButton from '../../components/LinkButton';
import MessageModal from '../../components/MessageModal';
// Icons
import { AiOutlineFileAdd } from 'react-icons/ai';

export default function Requirements() {
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [requirements, setRequirements] = useState([]);
	const [delReqId, setDelReqId] = useState('');
	const domain = useWebsiteDomain();

	function getRequirements() {
		fetch(`${API_DOMAIN}/user/requirements.php`, { credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setRequirements(response.requirements);
				} else {
					setError(response.message);
				}
			})
			.catch(error => console.error(error));
	}

	function Delete(id) {
		const data = new FormData();
		data.append('action', 'delete');
		data.append('requirement-id', id);
		data.append('domain', domain);
		fetch(`${API_DOMAIN}/user/requirements.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess(response.message);
					setDelReqId(null);
					window.location.reload();
				} else {
					setError(response.message);
				}
			})
			.catch(error => console.error(error));
	}

	useEffect(() => {
		getRequirements();
		document.title = 'Manage Requirements';
	}, []);

	return (
		<>
			{error && (
				<MessageModal type='error' onClose={() => setError('')}>
					{error}
				</MessageModal>
			)}
			{success && (
				<MessageModal type='success' onClose={() => setSuccess('')}>
					{error}
				</MessageModal>
			)}
			{delReqId && (
				<ConfirmModal onConfirm={() => Delete(delReqId)} onCancel={() => setDelReqId('')}>
					Are you sure you want to delete this requirement?
				</ConfirmModal>
			)}

			<LinkButton type='link' to='/post-requirement' className='mx-auto mt-3 block w-fit'>
				<AiOutlineFileAdd className='my-1 mr-2 inline-block h-7 w-7' />
				Post Requirement
			</LinkButton>

			<div className='mx-5 mb-48 mt-5'>
				<h1 className='text-center text-3xl'>My Requirements</h1>
				{requirements.length === 0 && <h2 className='mt-6 text-center text-3xl'>No Requirements Listed</h2>}

				{requirements.length > 0 && (
					<div>
						{requirements.map(requirements => (
							<div className='my-6 flex justify-center'>
								{/* <Button onClick={() => edit(service.id)} className="py-14 px-1 mx-2 bg-lp-light-blue">Edit</Button> */}
								<div
									className=' w-3/4 max-w-6xl flex-wrap rounded-2xl border border-gray-300 bg-lp-light-blue p-3 
										sm:flex-nowrap'>
									<h2 className='my-3 mr-2 font-bold'>Title: {requirements.title}</h2>
									<div className='my-3 mr-2 '>Price: {requirements.price}</div>
									<div className='my-3 mr-2'>Complete by: {requirements.complete_by}</div>
									{/* <div><Link type='link' to='/'>Link to a page</Link></div> */}
								</div>
								<div className='my-6 flex justify-evenly'>
									<LinkButton
										to={`/edit-requirement/${requirements.id}`}
										type='link'
										className='ml-3 mt-5 w-full pt-6 text-center'>
										Edit Requirement
									</LinkButton>
									{/* <Button onClick={() => Delete(requirements.id)}>Delete Requirement</Button> */}
									<Button
										onClick={() => setDelReqId(requirements.id)}
										className='ml-3 mt-5 w-full text-center'>
										Delete Requirement
									</Button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
}
