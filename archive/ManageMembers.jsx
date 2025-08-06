// Packages
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { API_DOMAIN } from '../src/config';
// Components
import Button from '../src/components/Button';
import ConfirmModal from '../src/components/ConfirmModal';
import { Link as LPLink } from '../src/components/Link';
import MessageModal from '../src/components/MessageModal';
import CheckBox from '../src/components/form/CheckBox';
import TextArea from '../src/components/form/TextArea';
import TextInput from '../src/components/form/TextInput';

export default function ManageMembers() {
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [reloadSuccess, setReloadSuccess] = useState('');
	const [confirmMessage, setConfirmMessage] = useState('');
	const [confirmAction, setConfirmAction] = useState(() => () => {});

	const [currentList, setcurrentList] = useState('');
	const [members, setMembers] = useState([]);

	const [followUpOpen, setFollowUpOpen] = useState(null);
	const [followUpMessage, setFollowUpMessage] = useState('');
	const [editOpen, setEditOpen] = useState(null);
	const [editFields, setEditFields] = useState({
		email: '',
		firstName: '',
		lastName: '',
		mobileNum: '',
		postcode: '',
		houseFlatNum: '',
		streetName: '',
		referee: '',
		aboutYou: '',
		iRent: false,
		iOwn: false,
		iInvest: false,
		image: ''
	});
	const [newImg, setNewImg] = useState(null);

	function getMembers() {
		setFollowUpOpen(null);
		setEditOpen(null);
		setMembers([]);

		let action;
		switch (currentList) {
			case 'pending':
				action = 'getPending';
				break;
			case 'approved':
				action = 'getApproved';
				break;
			case 'existing':
				action = 'getExisting';
				break;
		}

		const data = new FormData();
		data.append('action', action);
		fetch('https://test.londonproperty.co.uk/old-dashboard/api/v0.01/manage-members.php', { method: 'POST', body: data })
			.then(response => response.json())
			.then(response => {
				if (response.admin) {
					response.status === 1 ? setMembers(response.members) : setError(response.message);
				} else {
					setError('Unauthorized, log in as admin');
				}
			})
			.catch(error => console.error(error));
	}

	function confirmApprove(email) {
		setConfirmAction(() => () => {
			approve(email);
			setConfirmMessage('');
		});
		setConfirmMessage('Are you sure you want to approve the application of this member?');
	}

	function approve(email) {
		const data = new FormData();
		data.append('action', 'approve');
		data.append('email', email);
		fetch('https://test.londonproperty.co.uk/old-dashboard/api/v0.01/manage-members.php', { method: 'POST', body: data })
			.then(response => response.json())
			.then(response => {
				if (response.admin) {
					response.status === 1 ? setReloadSuccess('Member Approved') : setError(response.message);
				} else {
					setError('Unauthorized, log in as admin');
				}
			})
			.catch(error => console.error(error));
	}

	function confirmDeny(email) {
		setConfirmAction(() => () => {
			deny(email);
			setConfirmMessage('');
		});
		setConfirmMessage('Are you sure you want to deny the application of this member?');
	}

	function deny(email) {
		const data = new FormData();
		data.append('action', 'deny');
		data.append('email', email);
		fetch('https://test.londonproperty.co.uk/old-dashboard/api/v0.01/manage-members.php', { method: 'POST', body: data })
			.then(response => response.json())
			.then(response => {
				if (response.admin) {
					response.status === 1 ? setReloadSuccess('Member Denied') : setError(response.message);
				} else {
					setError('Unauthorized, log in as admin');
				}
			})
			.catch(error => console.error(error));
	}

	function followUp(i) {
		if (followUpOpen === i) {
			setFollowUpOpen(null);
			return;
		}
		if (editOpen === i) {
			setEditOpen(null);
		}
		setFollowUpMessage('');
		setFollowUpOpen(i);
	}

	function sendFollowUp(email) {
		if (followUpMessage.length === 0) {
			setError('Please enter an email body');
			return;
		}

		const data = new FormData();
		data.append('action', 'followUp');
		data.append('email', email);
		data.append('message', followUpMessage);
		fetch('https://test.londonproperty.co.uk/old-dashboard/api/v0.01/manage-members.php', { method: 'POST', body: data })
			.then(response => response.json())
			.then(response => {
				if (response.admin) {
					if (response.status === 1) {
						setSuccess('Follow up email sent');
						setFollowUpOpen(null);
					} else setError(response.message);
				} else {
					setError('Unauthorized, log in as admin');
				}
			})
			.catch(error => console.error(error));
	}

	function edit(i, email, status) {
		if (editOpen === i) {
			setEditOpen(null);
			return;
		}
		if (followUpOpen === i) {
			setFollowUpOpen(null);
		}

		const data = new FormData();
		switch (status) {
			case 'pending':
				data.append('action', 'editPending');
				break;
			case 'approved':
				data.append('action', 'editApproved');
				break;
			case 'existing':
				data.append('action', 'editExisting');
				break;
		}
		data.append('email', email);

		fetch('https://test.londonproperty.co.uk/old-dashboard/api/v0.01/manage-members.php', { method: 'POST', body: data })
			.then(response => response.json())
			.then(response => {
				if (response.admin) {
					if (response.success) {
						const data = response.data;
						setEditFields({
							email: data.email || '',
							firstName: data.firstName || '',
							lastName: data.lastName || '',
							mobileNum: data.mobileNum || '',
							postcode: data.postcode || '',
							houseFlatNum: data.houseFlatNum || '',
							streetName: data.streetName || '',
							referee: data.referee || '',
							aboutYou: data.aboutYou || '',
							iRent: data.iRent || false,
							iOwn: data.iOwn || false,
							iInvest: data.iInvest || false,
							image: data.image || ''
						});
						setEditOpen(i);
					} else setError(response.message);
				} else {
					setError('Unauthorized, log in as admin');
				}
			})
			.catch(error => console.error(error));
	}

	function updateMember(email, status) {
		const data = new FormData();
		switch (status) {
			case 'pending':
				data.append('action', 'updatePending');
				break;
			case 'approved':
				data.append('action', 'updateApproved');
				break;
			case 'existing':
				data.append('action', 'updateExisting');
				break;
		}
		data.append('email', email);
		data.append('newImg', newImg);
		data.append('editFields', JSON.stringify(editFields));

		fetch('https://test.londonproperty.co.uk/old-dashboard/api/v0.01/manage-members.php', { method: 'POST', body: data })
			.then(response => response.json())
			.then(response => {
				if (response.admin) {
					response.status === 1 ? setReloadSuccess('Member details updated') : setError(response.message);
				} else {
					setError('Unauthorized, log in as admin');
				}
			})
			.catch(error => console.error(error));
	}

	useEffect(() => {
		document.title = 'Manage Members';
	}, []);

	useEffect(() => {
		getMembers();
	}, [currentList]);

	return (
		<>
			{error && (
				<MessageModal type='error' onClose={() => setError('')}>
					{error}
				</MessageModal>
			)}
			{success && (
				<MessageModal type='success' onClose={() => setSuccess('')}>
					{success}
				</MessageModal>
			)}
			{reloadSuccess && (
				<MessageModal
					type='success'
					onClose={() => {
						getMembers();
						setReloadSuccess('');
					}}>
					{reloadSuccess}
				</MessageModal>
			)}
			{confirmMessage && (
				<ConfirmModal onConfirm={confirmAction} onCancel={() => setConfirmMessage('')}>
					{confirmMessage}
				</ConfirmModal>
			)}

			{/* Buttons that load the lists */}
			<section className='my-6 flex justify-evenly'>
				<Button onClick={() => navigate('../invite-members')}>Invite Members</Button>
				<Button onClick={() => setcurrentList('pending')}>Pending Members</Button>
				<Button onClick={() => setcurrentList('approved')}>Approved Members</Button>
				<Button onClick={() => setcurrentList('existing')}>Existing Members</Button>
			</section>

			{/* Member List */}
			<section className='mx-auto w-4/5 rounded-3xl bg-lp-light-blue p-6'>
				<h1 className='mb-10 mt-5 text-center font-lp-title-bold text-3xl text-lp-navy'>
					{`Currently Viewing: ${currentList || 'none'}`}
				</h1>
				{members.map((mem, i) => (
					<div key={i} className='mb-6 rounded-xl border border-lp-navy p-4'>
						<div className='mb-4 flex justify-between'>
							<span>
								<div className='font-bold'>Name:</div>
								<div>
									{mem.firstName}&nbsp;{mem.lastName}
								</div>
							</span>
							<span>
								<div className='font-bold'>Email:</div>
								<div>{mem.email}</div>
							</span>
							<span>
								<div className='font-bold'>Last Modified:</div>
								<div>{mem.timestamp}</div>
							</span>
						</div>
						<div className='flex justify-evenly'>
							{currentList === 'pending' && (
								<>
									<Button onClick={() => confirmApprove(mem.email)}>Approve</Button>
									<Button onClick={() => confirmDeny(mem.email)} style='critical'>
										Deny
									</Button>
									<Button onClick={() => followUp(i)}>Follow Up</Button>
								</>
							)}
							<Button onClick={() => edit(i, mem.email, mem.status)}>Edit</Button>
						</div>

						{followUpOpen === i && (
							<form>
								<h2 className='mt-5 text-center text-xl'>Follow Up:</h2>
								<TextArea
									label='Message'
									id='message'
									value={followUpMessage}
									onChange={e => setFollowUpMessage(e.target.value)}
								/>
								<Button className='mx-auto block' onClick={() => sendFollowUp(mem.email)}>
									Send Follow Up Email
								</Button>
							</form>
						)}

						{editOpen === i && (
							<form>
								<h2 className='mt-5 text-center text-xl'>Edit Member Details:</h2>
								<div className='my-5 flex justify-evenly'>
									<LPLink
										type='a'
										target='_blank'
										to={`https://test.londonproperty.co.uk/old-dashboard/files/uploads/${editFields.image}`}>
										Current Image
									</LPLink>
								</div>
								<input
									type='file'
									accept='image/*'
									className='mx-auto block pl-40'
									onChange={({ target: { files } }) => {
										files && setNewImg(files[0]);
									}}
								/>
								<TextInput
									label='Email'
									id='email'
									value={editFields.email}
									onChange={e => setEditFields({ ...editFields, email: e.target.value })}
								/>
								<TextInput
									label='First Name'
									id='firstName'
									value={editFields.firstName}
									onChange={e => setEditFields({ ...editFields, firstName: e.target.value })}
								/>
								<TextInput
									label='Last Name'
									id='lastName'
									value={editFields.lastName}
									onChange={e => setEditFields({ ...editFields, lastName: e.target.value })}
								/>
								<TextInput
									label='Mobile Number'
									id='mobileNum'
									value={editFields.mobileNum}
									onChange={e => setEditFields({ ...editFields, mobileNum: e.target.value })}
								/>
								<TextInput
									label='Postcode'
									id='postcode'
									value={editFields.postcode}
									onChange={e => setEditFields({ ...editFields, postcode: e.target.value })}
								/>
								<TextInput
									label='House Flat Number'
									id='houseFlatNum'
									value={editFields.houseFlatNum}
									onChange={e => setEditFields({ ...editFields, houseFlatNum: e.target.value })}
								/>
								<TextInput
									label='Street Name'
									id='streetName'
									value={editFields.streetName}
									onChange={e => setEditFields({ ...editFields, streetName: e.target.value })}
								/>
								<TextInput
									label='Referee'
									id='referee'
									value={editFields.referee}
									onChange={e => setEditFields({ ...editFields, referee: e.target.value })}
								/>
								<TextArea
									label='About You'
									id='aboutYou'
									value={editFields.aboutYou}
									onChange={e => setEditFields({ ...editFields, aboutYou: e.target.value })}
								/>
								<p>Member Type:</p>
								<div className='my-2 ml-5'>
									<CheckBox
										onChange={e => setEditFields({ ...editFields, iRent: e.target.checked })}
										id='iRent'
										checked={editFields.iRent}
										className='mr-4'>
										I Rent
									</CheckBox>
									<CheckBox
										onChange={e => setEditFields({ ...editFields, iOwn: e.target.checked })}
										id='iOwn'
										checked={editFields.iOwn}
										className='mr-4'>
										I Own
									</CheckBox>
									<CheckBox
										onChange={e => setEditFields({ ...editFields, iInvest: e.target.checked })}
										id='iInvest'
										checked={editFields.iInvest}
										className='mr-4'>
										I Invest
									</CheckBox>
								</div>
								<Button className='mx-auto block' onClick={() => updateMember(mem.email, mem.status)}>
									Update Member
								</Button>
							</form>
						)}
					</div>
				))}
			</section>
		</>
	);
}
