// Packages
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_DOMAIN } from '../../config';
// Components
import Button from '../../components/Button';
import ConfirmModal from '../../components/ConfirmModal';
import { Link as LPLink } from '../../components/Link';
import MessageModal from '../../components/MessageModal';
import TextArea from '../../components/form/TextArea';
import TextInput from '../../components/form/TextInput';

export default function AddMessage() {
	const navigate = useNavigate();

	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [confirmMessage, setConfirmMessage] = useState('');
	const [confirmAction, setConfirmAction] = useState(() => () => {});
	const [message, setMessage] = useState({
		title: '',
		body: ''
	});

	useEffect(() => {
		document.title = 'Add Message';
	}, []);

	function confirmInsert() {
		if (Object.values(message).some(value => value === '')) {
			setError('You must fill out all fields');
			return;
		}

		setConfirmAction(() => () => {
			insert();
			setConfirmMessage('');
		});
		setConfirmMessage('Are you sure you want to add this message?');
	}

	function insert() {
		const data = new FormData();
		data.append('action', 'insert');
		data.append('title', message.title);
		data.append('body', message.body);

		fetch(`${API_DOMAIN}/admin/messages.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('Message added successfully.');
				} else {
					setError(`Error adding message: ${response.error}`);
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
				<MessageModal type='success' onClose={() => navigate('/admin/manage-messages')}>
					{success}
				</MessageModal>
			)}
			{confirmMessage && (
				<ConfirmModal onConfirm={confirmAction} onCancel={() => setConfirmMessage('')}>
					{confirmMessage}
				</ConfirmModal>
			)}

			<div className='m-10'>
				<h1 className='text-3xl'>Add Message</h1>
				<LPLink type='link' to='/admin/manage-messages' className='my-3 inline-block'>
					Manage Messages
				</LPLink>
				<hr />
				<form className='mt-5 max-w-3xl rounded-2xl bg-gray-200 p-6 shadow-2xl'>
					<TextInput
						label='Message Title'
						id='title'
						value={message.title}
						onChange={e => setMessage({ ...message, title: e.target.value })}
					/>
					<TextArea
						label='Message Body'
						id='body'
						value={message.body}
						onChange={e => setMessage({ ...message, body: e.target.value })}
					/>
					<Button onClick={confirmInsert} className='mx-auto block'>
						Add Message
					</Button>
				</form>
			</div>
		</>
	);
}
