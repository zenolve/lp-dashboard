// Packages
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useWebsiteDomain from '../../hooks/useWebsiteDomain';
// Config
import { API_DOMAIN } from '../../config';
// Data
import expertCategories from '../../data/expertCategories.json';
// Components
import Button from '../../components/Button';
import ConfirmModal from '../../components/ConfirmModal';
import { Link as LPLink } from '../../components/Link';
import LinkButton from '../../components/LinkButton';
import MessageModal from '../../components/MessageModal';
import Form from '../../components/form/Form';
import Select from '../../components/form/Select';
import TextArea from '../../components/form/TextArea';
import TextInput from '../../components/form/TextInput';

export function EditService() {
	const { serviceId } = useParams();
	const navigate = useNavigate();
	const domain = useWebsiteDomain();

	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [confirmMessage, setConfirmMessage] = useState('');
	const [confirmAction, setConfirmAction] = useState(() => () => {});
	const [followUpMessage, setFollowUpMessage] = useState('');
	const [service, setService] = useState({
		status: '',
		name: '',
		keywords: '',
		desc: ''
	});
	const [lister, setLister] = useState({
		id: null,
		name: '',
		image: null
	});
	const [content, setContent] = useState([]);

	useEffect(() => {
		getService();
		document.title = 'Edit Service';
	}, []);

	function getService() {
		const data = new FormData();
		data.append('action', 'getSingle');
		data.append('serviceId', serviceId);
		fetch(`${API_DOMAIN}/admin/services.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setService(response.service);
					setLister(response.lister);
					setContent(response.content);
				} else {
					setError(`Error, service can't be fetched: ${response.error}`);
				}
			})
			.catch(error => console.error(error));
	}

	function confirmUpdate() {
		if (Object.values(service).some(value => value === '')) {
			setError('You must fill out all fields');
			return;
		}

		setConfirmAction(() => () => {
			update();
			setConfirmMessage('');
		});
		setConfirmMessage('Are you sure you want to update the details of this service?');
	}

	function update() {
		const data = new FormData();
		data.append('action', 'update');
		data.append('id', serviceId);
		data.append('name', service.name);
		data.append('keywords', service.keywords);
		data.append('desc', service.desc);
		data.append('domain', domain);
		fetch(`${API_DOMAIN}/admin/services.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('Successfully updated service');
				} else {
					setError(`Error updating service: ${response.error}`);
				}
			})
			.catch(error => console.error(error));
	}

	function confirmRemove() {
		setConfirmAction(() => () => {
			remove();
			setConfirmMessage('');
		});
		setConfirmMessage('Are you sure you want to delete this service?');
	}

	function remove() {
		const data = new FormData();
		data.append('action', 'remove');
		data.append('id', serviceId);
		data.append('domain', domain);
		fetch(`${API_DOMAIN}/admin/services.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('Successfully deleted service');
				} else {
					setError(`Error deleting service: ${response.error}`);
				}
			})
			.catch(error => console.error(error));
	}

	function confirmFollowUp() {
		if (followUpMessage.length === 0) {
			setError('Please enter an email body');
			return;
		}

		setConfirmAction(() => () => {
			sendFollowUp();
			setConfirmMessage('');
		});
		setConfirmMessage('Are you sure you want to send this email to the service lister?');
	}

	function sendFollowUp() {
		const data = new FormData();
		data.append('action', 'followUp');
		data.append('id', serviceId);
		data.append('message', followUpMessage);
		data.append('domain', domain);
		fetch(`${API_DOMAIN}/admin/services.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('Follow up email sent');
				} else {
					setError(response.error);
				}
			})
			.catch(error => console.error(error));
	}

	function confirmApprove(id) {
		setConfirmAction(() => () => {
			approve(id);
			setConfirmMessage('');
		});
		setConfirmMessage('Are you sure you want to approve this service?');
	}

	function approve(id) {
		const data = new FormData();
		data.append('action', 'approve');
		data.append('id', id);
		data.append('domain', domain);
		fetch(`${API_DOMAIN}/admin/services.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('Service approved + Email sent');
				} else {
					setError(`Error, service can't be approved: ${response.error}`);
				}
			})
			.catch(error => console.error(error));
	}

	function confirmDeny(id) {
		setConfirmAction(() => () => {
			deny(id);
			setConfirmMessage('');
		});
		setConfirmMessage('Are you sure you want to deny this service?');
	}

	function deny(id) {
		const data = new FormData();
		data.append('action', 'deny');
		data.append('id', id);
		data.append('domain', domain);
		fetch(`${API_DOMAIN}/admin/services.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('Service denied + Email sent');
				} else {
					setError(`Error, service can't be denied: ${response.error}`);
				}
			})
			.catch(error => console.error(error));
	}

	return (
		<>
			{error && (
				<MessageModal type='error' onClose={() => setError('')}>
					{error}
				</MessageModal>
			)}
			{success && (
				<MessageModal type='success' onClose={() => navigate('/admin/manage-services')}>
					{success}
				</MessageModal>
			)}
			{confirmMessage && (
				<ConfirmModal onConfirm={confirmAction} onCancel={() => setConfirmMessage('')}>
					{confirmMessage}
				</ConfirmModal>
			)}

			<div className='m-10'>
				<h1 className='text-3xl'>Edit Service</h1>
				<LPLink type='link' to='/admin/manage-services' className='my-3 inline-block'>
					Manage Services
				</LPLink>

				<hr />
				<div className='mt-5 max-w-3xl rounded-2xl bg-gray-200 p-6 shadow-2xl'>
					<h2 className='font-bold'>Lister Details</h2>
					<div className='my-4'>
						<span className='font-bold'>Name: </span>
						{lister.name}
					</div>
					<img
						src={`${API_DOMAIN}/?a=loadFile&params={"file":"${lister.image}","type":"profile"}`}
						alt='Lister Image'
						className='w-72 rounded-3xl border-2 shadow-2xl'
					/>
				</div>

				<hr className='my-5' />
				<Form>
					<Select
						id='name'
						label='Service Type'
						value={service.name}
						onChange={e => setService({ ...service, name: e.target.value })}>
						{expertCategories.map(category => (
							<option key={category.id} value={category.name}>
								{category.name}
							</option>
						))}
					</Select>
					<TextInput
						id='keywords'
						label='Service Keywords'
						value={service.keywords}
						onChange={e => setService({ ...service, keywords: e.target.value })}
					/>
					<TextArea
						label='Service Description'
						id='desc'
						value={service.desc}
						onChange={e => setService({ ...service, desc: e.target.value })}
						placeholder='In a few sentences, please describe the details of the service you&#39;re adding'
					/>
					<div className='flex justify-evenly'>
						<Button onClick={confirmUpdate}>Update Service</Button>
						{service.status === 'pending' && (
							<>
								<Button onClick={() => confirmApprove(serviceId)}>Approve Service</Button>
                                <Button onClick={() => confirmDeny(serviceId)} style='critical'>
                                               Deny Service
                                       </Button>
							</>
						)}
						{service.status === 'approved' && (
							<Button onClick={confirmRemove} style='critical'>
								Delete Service
							</Button>
						)}
					</div>
				</Form>

				<hr className='my-5' />
				<Form>
					<h2 className='mt-5 text-center text-xl'>Follow Up:</h2>
					<TextArea
						label='Message'
						placeholder='Enter an email body'
						id='message'
						value={followUpMessage}
						onChange={e => setFollowUpMessage(e.target.value)}
					/>
					<Button className='mx-auto block' onClick={confirmFollowUp}>
						Send Follow Up Email
					</Button>
				</Form>

				{content.length > 0 && (
					<>
						<hr className='my-5' />
						<section className='max-w-3xl rounded-2xl bg-gray-200 p-6 shadow-2xl'>
							<h2 className='mt-5 text-center text-xl'>User Content:</h2>
							{content.map(contentItem => {
								// TODO: unify returns
								if (contentItem.type === 'video') {
									return (
										<div className='mx-auto mb-5 flex w-4/5 rounded border border-gray-300 p-3'>
											<iframe
												src={contentItem.link}
												title={contentItem.title}
												loading='lazy'
												allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
												allowFullScreen
												// width='560'
												// height='315'
												className='border-none'
											/>
											<div className='px-5'>
												<h2 className='font-bold'>{contentItem.title}</h2>
												<div className='my-2'>{contentItem.desc}</div>
											</div>
											<LinkButton
												type='link'
												to={`/admin/edit-content/${contentItem.id}`}
												className='mx-2bg-lp-light-blue px-1 py-14'>
												Edit
											</LinkButton>
										</div>
									);
								}
								if (contentItem.type === 'podcast') {
									return (
										<div className='mx-auto mb-5 flex w-4/5 rounded border border-gray-300 p-3'>
											<iframe
												src={contentItem.link}
												title={contentItem.title}
												loading='lazy'
												// width='100%'
												// height='200'
												className='overflow-hidden border-none'
											/>
											<div className='px-5'>
												<h2 className='font-bold'>{contentItem.title}</h2>
												<div className='my-2'>{contentItem.desc}</div>
											</div>
											<LinkButton
												type='link'
												to={`/admin/edit-content/${contentItem.id}`}
												className='mx-2bg-lp-light-blue px-1 py-14'>
												Edit
											</LinkButton>
										</div>
									);
								}
							})}
						</section>
					</>
				)}

				{lister.id && (
					<>
						<hr className='my-5' />
						<LinkButton type='link' to={`/admin/add-content/${lister.id}`} className='mx-auto mb-3 block w-fit'>
							Add User Content
						</LinkButton>
					</>
				)}
			</div>
		</>
	);
}
