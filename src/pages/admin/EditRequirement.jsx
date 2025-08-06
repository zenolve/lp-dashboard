// Packages
import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
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
import DateInput from '../../components/form/DateInput';
import FileInput from '../../components/form/FileInput';
import Form from '../../components/form/Form';
import Select from '../../components/form/Select';
import TextArea from '../../components/form/TextArea';
import TextInput from '../../components/form/TextInput';

export function EditRequirement() {
	const { requirementId } = useParams();
	const navigate = useNavigate();
	const domain = useWebsiteDomain();

	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [confirmMessage, setConfirmMessage] = useState('');
	const [confirmAction, setConfirmAction] = useState(() => () => {});
	const [attachmentsReturned, setAttachmentsReturned] = useState(null);
	const [requirement, setRequirement] = useState({
		title: '',
		status: '',
		price: '',
		complete_by: '',
		services: '',
		description: '',
		attachments: null
	});
	const [poster, setPoster] = useState({
		name: '',
		image: null
	});

	useEffect(() => {
		getRequirement();
		document.title = 'Edit Requirement';
	}, []);

	function getRequirement() {
		const data = new FormData();
		data.append('requirement-id', requirementId);
		data.append('action', 'getSingle');
		fetch(`${API_DOMAIN}/admin/requirements.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					const info = response.requirements;
					const completeByDate = new Date(info.complete_by);
					const formattedCompleteByDate = `${completeByDate.getFullYear()}-${(completeByDate.getMonth() + 1)
						.toString()
						.padStart(2, '0')}-${completeByDate.getDate().toString().padStart(2, '0')}`;

					setRequirement({
						title: info.title || '',
						price: info.price || '',
						complete_by: formattedCompleteByDate || '',
						description: info.description || '',
						services: info.services || '',
						status: info.status || ''
					});
					setAttachmentsReturned(info.attachments);
					setPoster(response.poster);
				} else {
					setError(response.message);
				}
			})
			.catch(error => console.error(error));
	}

	function confirmUpdate() {
		// if (Object.values(requirement).some(value => value === '')) {
		//     setError('You must fill out all fields');
		//     return;
		// }

		setConfirmAction(() => () => {
			update();
			setConfirmMessage('');
		});
		setConfirmMessage('Are you sure you want to update the details of this Requirement?');
	}

	function update() {
		const data = new FormData();
		data.append('requirement-id', requirementId);
		data.append('action', 'update');
		data.append('title', requirement.title);
		data.append('desc', requirement.description);
		data.append('price', requirement.price);
		data.append('services', requirement.services);
		data.append('completeBy', requirement.complete_by);
		data.append('domain', domain);
		const attachments = document.getElementById('attachments').files;
		for (let i = 0; i < attachments.length; i++) {
			data.append('attachments[]', attachments[i]);
		}
		fetch(`${API_DOMAIN}/admin/requirements.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('Successfully updated requirement');
				} else {
					setError(`Error updating requirement: ${response.error}`);
				}
			})
			.catch(error => console.error(error));
	}

	function confirmRemove() {
		setConfirmAction(() => () => {
			remove();
			setConfirmMessage('');
		});
		setConfirmMessage('Are you sure you want to delete this requirement?');
	}

	function remove() {
		const data = new FormData();
		data.append('action', 'remove');
		data.append('id', requirementId);
		data.append('domain', domain);
		fetch(`${API_DOMAIN}/admin/requirements.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('Successfully deleted requirement');
				} else {
					setError(`Error deleting requirement: ${response.error}`);
				}
			})
			.catch(error => console.error(error));
	}

	function deleteFile(fileID) {
		const data = new FormData();
		data.append('fileID', fileID);
		data.append('action', 'deleteFile');

		fetch(`${API_DOMAIN}/admin/requirements.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('File deleted');
				} else {
					setError('Cannot delete file');
				}
			})
			.catch(error => console.error(error));
	}

	function confirmApprove() {
		setConfirmAction(() => () => {
			approve();
			setConfirmMessage('');
		});
		setConfirmMessage('Are you sure you want to approve this requirement?');
	}

	function approve(id) {
		const data = new FormData();
		data.append('action', 'approve');
		data.append('requirement-id', requirementId);
		data.append('domain', domain);
		fetch(`${API_DOMAIN}/admin/requirements.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('requirement approved + Email sent');
				} else {
					setError(`Error, requirement can't be approved: ${response.error}`);
				}
			})
			.catch(error => console.error(error));
	}

	function confirmDeny() {
		setConfirmAction(() => () => {
			deny();
			setConfirmMessage('');
		});
		setConfirmMessage('Are you sure you want to deny this requirement?');
	}

	function deny(id) {
		const data = new FormData();
		data.append('action', 'deny');
		data.append('requirement-id', requirementId);
		data.append('domain', domain);
		fetch(`${API_DOMAIN}/admin/requirements.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('requirement denied + Email sent');
				} else {
					setError(`Error, requirement can't be denied: ${response.error}`);
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
				<MessageModal type='success' onClose={() => navigate('/admin/manage-requirements')}>
					{success}
				</MessageModal>
			)}
			{confirmMessage && (
				<ConfirmModal onConfirm={confirmAction} onCancel={() => setConfirmMessage('')}>
					{confirmMessage}
				</ConfirmModal>
			)}

			<div className='m-10'>
				<h1 className='text-3xl'>Edit Requirement</h1>
				<LPLink type='link' to='/admin/manage-requirements' className='my-3 inline-block'>
					Manage Requirements
				</LPLink>

				<hr />
				<div className='mt-5 max-w-3xl rounded-2xl bg-gray-200 p-6 shadow-2xl'>
					<h2 className='font-bold'>Lister Details</h2>
					<div className='my-4'>
						<span className='font-bold'>Name: </span>
						{poster.name}
					</div>
					<img
						src={`${API_DOMAIN}/?a=loadFile&params={"file":"${poster.image}","type":"profile"}`}
						alt='Lister Image'
						className='w-72 rounded-3xl border-2 shadow-2xl'
					/>
				</div>

				<hr className='my-5' />
				<Form>
					<TextInput
						label='Title'
						id='title'
						value={requirement.title}
						onChange={e => setRequirement({ ...requirement, title: e.target.value })}
					/>
					<Select
						label='Desired Expertise'
						id='expertise'
						value={requirement.services}
						onChange={e => setRequirement({ ...requirement, services: e.target.value })}>
						<option value='All'>Any / No Expertise</option>
						{expertCategories.map(category => (
							<option key={category.id} value={category.name}>
								{category.name}
							</option>
						))}
					</Select>
					<TextInput
						label='Price'
						id='price'
						value={requirement.price}
						onChange={e => setRequirement({ ...requirement, price: e.target.value })}
					/>
					<TextArea
						label='Description'
						id='description'
						value={requirement.description}
						onChange={e => setRequirement({ ...requirement, description: e.target.value })}
					/>
					<DateInput
						label='Complete By'
						id='complete_by'
						value={requirement.complete_by}
						onChange={e => setRequirement({ ...requirement, complete_by: e.target.value })}
					/>

					<FileInput
						label='Attachments'
						id='attachments'
						name='attachments'
						multiple
						onChange={({ target: { files } }) => {
							files && setRequirement({ ...requirement, attachments: files });
						}}
					/>
					{attachmentsReturned && attachmentsReturned.length > 0 ? (
						<div>
							<h3 className='mb-1 '>Files</h3>
							<ul>
								{attachmentsReturned.map((attachment, index) => {
									const parts = attachment.split('/');
									const key = parts[parts.length - 1]; // Get the last part of the URL
									const url = 'https://' + attachment;
									return (
										// <li key={key} style={{ display: 'flex', alignItems: 'center' }}>
										<li key={key} className='flex items-center'>
											<a
												href={url}
												target='_blank'
												rel='noopener noreferrer'
												className='ml-5 mr-1 text-lp-navy'>
												{key}
											</a>
											<RxCross2
												onClick={() => deleteFile(key.toString())}
												className='cursor-pointer text-lp-navy'
											/>
										</li>
									);
								})}
							</ul>
						</div>
					) : (
						<h3 className='mb-5'>No files exist for this requirement</h3>
					)}
					<div className='flex justify-evenly'>
						<Button onClick={confirmUpdate}>Update Requirement</Button>
						{requirement.status === 'pending' && (
							<>
								<Button onClick={confirmApprove}>Approve Requirement</Button>
								<Button style='critical' onClick={confirmDeny}>
									Deny Requirement
								</Button>
							</>
						)}
						{requirement.status === 'approved' && (
							<Button onClick={confirmDeny} style='critical'>
								Delete requirement
							</Button>
						)}
					</div>
				</Form>
			</div>
		</>
	);
}
