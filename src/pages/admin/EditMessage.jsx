// Packages
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Config
import { API_DOMAIN } from '../../config';
// Components
import Button from '../../components/Button';
import ConfirmModal from '../../components/ConfirmModal';
import { Link as LPLink } from '../../components/Link';
import MessageModal from '../../components/MessageModal';
import TextArea from '../../components/form/TextArea';
import TextInput from '../../components/form/TextInput';

export default function EditMessage() {
	const { messageId } = useParams();
	const navigate = useNavigate();

	const [confirmMessage, setConfirmMessage] = useState('');
	const [confirmAction, setConfirmAction] = useState(() => () => {});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [message, setMessage] = useState({
		title: '',
		body: ''
	});

	useEffect(() => {
		getMessage();
		document.title = 'Edit Message';
	}, []);

	function getMessage() {
		const data = new FormData();
		data.append('action', 'getSingle');
		data.append('messageId', messageId);
		fetch(`${API_DOMAIN}/admin/messages.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setMessage(response.message);
				} else {
					setError(`Error retrieving message: ${response.error}`);
				}
			})
			.catch(error => console.error(error));
	}

	function confirmUpdate() {
		if (Object.values(message).some(value => value === '')) {
			setError('You must fill out all fields');
			return;
		}

		setConfirmAction(() => () => {
			update();
			setConfirmMessage('');
		});
		setConfirmMessage('Are you sure you want to update the details of this message?');
	}

	function update() {
		const data = new FormData();
		data.append('action', 'update');
		data.append('messageId', messageId);
		data.append('title', message.title);
		data.append('body', message.body);
		fetch(`${API_DOMAIN}/admin/messages.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('Successfully updated message');
				} else {
					setError(`Error updating message: ${response.error}`);
				}
			})
			.catch(error => console.error(error));
	}

	function confirmRemove() {
		setConfirmAction(() => () => {
			remove();
			setConfirmMessage('');
		});
		setConfirmMessage('Are you sure you want to delete this message?');
	}

	function remove() {
		const data = new FormData();
		data.append('action', 'delete');
		data.append('messageId', messageId);
		fetch(`${API_DOMAIN}/admin/messages.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('Successfully deleted message');
				} else {
					setError(`Error deleting message: ${response.error}`);
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
				<h1 className='text-3xl'>Edit Message</h1>
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
					<div className='flex justify-evenly'>
						<Button onClick={confirmUpdate}>Update Message</Button>
						<Button onClick={confirmRemove} style='critical'>
							Delete Message
						</Button>
					</div>
				</form>
			</div>
		</>
	);
}
