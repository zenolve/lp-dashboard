// // Packages
// import { useEffect, useState } from 'react';
// import { API_DOMAIN } from '../../config';
// // Components
// import Button from '../../components/Button';
// import ConfirmModal from '../../components/ConfirmModal';
// import { Link as LPLink } from '../../components/Link';
// import MessageModal from '../../components/MessageModal';
// import DateInput from '../../components/form/DateInput';
// import TextArea from '../../components/form/TextArea';
// import TextInput from '../../components/form/TextInput';

// export default function ManageRequirements() {
// 	const [error, setError] = useState('');
// 	const [success, setSuccess] = useState('');
// 	const [reloadSuccess, setReloadSuccess] = useState('');

// 	const [confirmMessage, setConfirmMessage] = useState('');
// 	const [confirmAction, setConfirmAction] = useState(() => () => {});

// 	const [currentList, setcurrentList] = useState('');
// 	const [requirements, setRequirements] = useState([]);

// 	const [editOpen, setEditOpen] = useState(null);
// 	const [editFields, setEditFields] = useState({
// 		id: '',
// 		poster_id: '',
// 		price: '',
// 		complete_by: '',
// 		description: '',
// 		attachments: ''
// 	});

// 	function getRequirements() {
// 		let action = 'get';
// 		const data = new FormData();
// 		data.append('action', action);
// 		fetch(`${API_DOMAIN}/admin/requirements.php`, { method: 'POST', body: data })
// 			.then(response => response.json())
// 			.then(response => {
// 				if (response.isAdmin) {
// 					response.status === 1 ? setRequirements(response.requirements) : setError(response.message);
// 				} else {
// 					setError('Unauthorized, log in as admin');
// 				}
// 			})
// 			.catch(error => console.error(error));
// 	}

// 	function confirmApprove(id) {
// 		setConfirmAction(() => () => {
// 			approve(id);
// 			setConfirmMessage('');
// 		});
// 		setConfirmMessage('Are you sure you want to approve the posting of this requirement?');
// 	}

// 	function approve(id) {
// 		const data = new FormData();
// 		data.append('action', 'approve');
// 		data.append('id', id);
// 		fetch(`${API_DOMAIN}/admin/requirements.php`, { method: 'POST', body: data })
// 			.then(response => response.json())
// 			.then(response => {
// 				if (response.admin) {
// 					response.status === 1 ? setReloadSuccess('Requirement Approved') : setError(response.message);
// 				} else {
// 					setError('Unauthorized, log in as admin');
// 				}
// 			})
// 			.catch(error => console.error(error));
// 	}

// 	function confirmDeny(id) {
// 		setConfirmAction(() => () => {
// 			deny(id);
// 			setConfirmMessage('');
// 		});
// 		setConfirmMessage('Are you sure you want to deny the posting of this requirement?');
// 	}

// 	function deny(id) {
// 		const data = new FormData();
// 		data.append('action', 'deny');
// 		data.append('id', id);
// 		fetch(`${API_DOMAIN}/admin/requirements.php`, { method: 'POST', body: data })
// 			.then(response => response.json())
// 			.then(response => {
// 				if (response.admin) {
// 					response.status === 1 ? setReloadSuccess('Requirement Denied') : setError(response.message);
// 				} else {
// 					setError('Unauthorized, log in as admin');
// 				}
// 			})
// 			.catch(error => console.error(error));
// 	}

// 	function edit(i, id, status) {
// 		if (editOpen === i) {
// 			setEditOpen(null);
// 			return;
// 		}

// 		const data = new FormData();
// 		data.append('id', id);

// 		fetch(`${API_DOMAIN}/admin/requirements.php`, { method: 'POST', body: data })
// 			.then(response => response.json())
// 			.then(response => {
// 				if (response.admin) {
// 					if (response.status === 1) {
// 						const data = response.data;
// 						setEditFields({
// 							id: data.id || '',
// 							poster_id: data.poster - id || '',
// 							price: data.price || '',
// 							complete_by: data.complete_by || '',
// 							description: data.description || '',
// 							// FIX ATTACHMENT LOGIC
// 							attachments: data.attachments || ''
// 						});
// 						setEditOpen(i);
// 					} else setError(response.message);
// 				} else {
// 					setError('Unauthorized, log in as admin');
// 				}
// 			})
// 			.catch(error => console.error(error));
// 	}

// 	function updateRequirement(id, status) {
// 		const data = new FormData();
// 		data.append('id', id);
// 		data.append('editFields', JSON.stringify(editFields));

// 		fetch(`${API_DOMAIN}/admin/requirments.php`, { method: 'POST', body: data })
// 			.then(response => response.json())
// 			.then(response => {
// 				if (response.admin) {
// 					response.status === 1 ? setReloadSuccess('Requirement details updated') : setError(response.message);
// 				} else {
// 					setError('Unauthorized, log in as admin');
// 				}
// 			})
// 			.catch(error => console.error(error));
// 	}

// 	useEffect(() => {
// 		document.title = 'Manage Requirements';
// 	}, []);

// 	useEffect(() => {
// 		getRequirements();
// 	}, []);

// 	return (
// 		<>
// 			{error && (
// 				<MessageModal type='error' onClose={() => setError('')}>
// 					{error}
// 				</MessageModal>
// 			)}
// 			{success && (
// 				<MessageModal type='success' onClose={() => setSuccess('')}>
// 					{success}
// 				</MessageModal>
// 			)}
// 			{reloadSuccess && (
// 				<MessageModal
// 					type='success'
// 					onClose={() => {
// 						getRequirements();
// 						setReloadSuccess('');
// 					}}>
// 					{reloadSuccess}
// 				</MessageModal>
// 			)}
// 			{confirmMessage && (
// 				<ConfirmModal onConfirm={confirmAction} onCancel={() => setConfirmMessage('')}>
// 					{confirmMessage}
// 				</ConfirmModal>
// 			)}

// 			{/* Requirement List */}
// 			<section className='mx-auto w-4/5 rounded-3xl bg-lp-light-blue p-6'>
// 				<h1 className='mb-10 mt-5 text-center font-lp-title-bold text-3xl text-lp-navy'>{`Manage Requirements`}</h1>
// 				{requirements.map((req, i) => (
// 					<div key={i} className='mb-6 rounded-xl border border-lp-navy p-4'>
// 						<div className='mb-4 flex justify-between'>
// 							<span>
// 								<div className='font-bold'>Name:</div>
// 								<div>{req.name}</div>
// 							</span>
// 							<span>
// 								<div className='font-bold'>Title:</div>
// 								<div>{req.title}</div>
// 							</span>
// 							<span>
// 								<div className='font-bold'>Date:</div>
// 								<div>{req.created}</div>
// 							</span>
// 							<span>
// 								<div className='font-bold'>Description:</div>
// 								<div>{req.description}</div>
// 							</span>
// 						</div>
// 						<div className='flex justify-evenly'>
// 							<Button onClick={() => confirmApprove(req.id)}>Approve</Button>
// 							<Button onClick={() => confirmDeny(req.id)}>Deny</Button>
// 							<Button onClick={() => edit(i, req.status)}>Edit</Button>
// 						</div>

// 						{editOpen === i && (
// 							<form>
// 								<h2 className='mt-5 text-center text-xl'>Edit Requirement Details:</h2>
// 								<TextInput
// 									label='Title'
// 									id='title'
// 									value={editFields.title}
// 									onChange={e => setEditFields({ ...editFields, title: e.target.value })}
// 								/>
// 								<TextInput
// 									label='Price'
// 									id='price'
// 									value={editFields.price}
// 									onChange={e => setEditFields({ ...editFields, price: e.target.value })}
// 								/>
// 								<TextArea
// 									label='Description'
// 									id='description'
// 									value={editFields.description}
// 									onChange={e => setEditFields({ ...editFields, description: e.target.value })}
// 								/>
// 								<DateInput
// 									label='Complete By'
// 									id='complete_by'
// 									value={editFields.complete_by}
// 									onChange={e => setEditFields({ ...editFields, complete_by: e.target.value })}
// 								/>
// 								<Button className='mx-auto block' onClick={() => updateRequirement(req.id, req.status)}>
// 									Update Requirement
// 								</Button>
// 							</form>
// 						)}
// 					</div>
// 				))}
// 			</section>
// 		</>
// 	);
// }

// Packages
import { useEffect, useState } from 'react';
// Config
import { API_DOMAIN } from '../../config';
// Components
import Button from '../../components/Button';
import LinkButton from '../../components/LinkButton';
import MessageModal from '../../components/MessageModal';

export default function ManageRequirements() {
	const [error, setError] = useState('');
	const [currentList, setcurrentList] = useState('');
	const [requirements, setRequirements] = useState([]);

	useEffect(() => {
		document.title = 'Manage Requirements';
	}, []);

	useEffect(() => {
		getRequirements();
	}, [currentList]);

	function getRequirements() {
		let action;
		switch (currentList) {
			case 'pending':
				action = 'getPending';
				break;
			case 'approved':
				action = 'getApproved';
				break;
			default:
				return;
		}

		const data = new FormData();
		data.append('action', action);
		fetch(`${API_DOMAIN}/admin/requirements.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setRequirements(response.requirements);
				} else {
					setError(`Error, requirments can't be fetched: ${response.error}`);
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

			{/* Buttons that load the lists */}
			<section className='my-6 flex justify-evenly'>
				<Button onClick={() => setcurrentList('pending')}>Pending Requirements</Button>
				<Button onClick={() => setcurrentList('approved')}>Approved Requirements</Button>
			</section>

			<section className='mx-auto mb-8 max-w-4xl rounded-3xl bg-lp-light-blue p-6'>
				<h1 className='mb-10 mt-5 text-center font-lp-title-bold text-3xl text-lp-navy'>
					{`Currently Viewing: ${currentList || 'none'}`}
				</h1>

				{requirements.map((requirement, i) => (
					<div key={i} className='mb-6 rounded-xl border border-lp-navy p-4'>
						<div className='mb-4 flex justify-evenly'>
							<span>
								<span className='font-bold'>Poster:</span> {requirement.posterEmail}
							</span>
							<span>
								<span className='font-bold'>Title:</span> {requirement.title}
							</span>
						</div>
						<LinkButton to={`/admin/edit-requirement/${requirement.id}`} type='link'>
							Edit
						</LinkButton>
					</div>
				))}
			</section>
		</>
	);
}
