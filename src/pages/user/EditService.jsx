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
import MessageModal from '../../components/MessageModal';
import Select from '../../components/form/Select';
import TextArea from '../../components/form/TextArea';
import TextInput from '../../components/form/TextInput';

export function EditService() {
	const { serviceId } = useParams();
	const navigate = useNavigate();
	const domain = useWebsiteDomain();

	const [confirmMessage, setConfirmMessage] = useState('');
	const [confirmAction, setConfirmAction] = useState(() => () => {});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [service, setService] = useState({
		name: '',
		keywords: '',
		desc: ''
	});

	useEffect(() => {
		getService();
		document.title = 'Edit Service';
	}, []);

	function getService() {
		const data = new FormData();
		data.append('action', 'getSingle');
		data.append('serviceId', serviceId);
		fetch(`${API_DOMAIN}/user/services.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setService(response.service);
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
		setConfirmMessage(
			`Are you sure you want to update the details of this service? 
			If this service has already been approved by London Property, 
			updating its details will reset its status to pending again`
		);
	}

	function update() {
		const data = new FormData();
		data.append('action', 'update');
		data.append('serviceId', serviceId);
		data.append('name', service.name);
		data.append('keywords', service.keywords);
		data.append('desc', service.desc);
		data.append('domain', domain);
		fetch(`${API_DOMAIN}/user/services.php`, { method: 'POST', body: data, credentials: 'include' })
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
		data.append('serviceId', serviceId);
		data.append('domain', domain);
		fetch(`${API_DOMAIN}/user/services.php`, { method: 'POST', body: data, credentials: 'include' })
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

	return (
		<>
			{error && (
				<MessageModal type='error' onClose={() => setError('')}>
					{error}
				</MessageModal>
			)}
			{success && (
				<MessageModal type='success' onClose={() => navigate('/services')}>
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
				<LPLink type='link' to='/services' className='my-3 inline-block'>
					Manage Services
				</LPLink>
				<hr />
				<form className='mt-5 max-w-3xl rounded-2xl bg-gray-200 p-6 shadow-2xl'>
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
						<Button onClick={confirmRemove} style='critical'>
							Delete Service
						</Button>
					</div>
				</form>
			</div>
		</>
	);
}
