// Packages
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_DOMAIN } from '../../config';
// Components
import Button from '../../components/Button';
import ConfirmModal from '../../components/ConfirmModal';
import { Link as LPLink } from '../../components/Link';
import MessageModal from '../../components/MessageModal';
import DateInput from '../../components/form/DateInput';
import TextArea from '../../components/form/TextArea';
import TextInput from '../../components/form/TextInput';

export default function AddEvent() {
	const navigate = useNavigate();

	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [confirmMessage, setConfirmMessage] = useState('');
	const [confirmAction, setConfirmAction] = useState(() => () => {});
	const [event, setEvent] = useState({
		name: '',
		date: '',
		desc: ''
	});

	useEffect(() => {
		document.title = 'Add Events';
	}, []);

	function confirmAdd() {
		if (Object.values(event).some(value => value === '')) {
			setError('You must fill out all fields');
			return;
		}

		setConfirmAction(() => () => {
			add();
			setConfirmMessage('');
		});
		setConfirmMessage('Are you sure you want to add this event?');
	}

	function add() {
		const data = new FormData();
		data.append('action', 'add');
		data.append('name', event.name);
		data.append('date', event.date);
		data.append('desc', event.desc);

		fetch(`${API_DOMAIN}/admin/events.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('Event added successfully.');
				} else {
					setError(`Error adding event: ${response.error}`);
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
				<MessageModal type='success' onClose={() => navigate('/admin/manage-events')}>
					{success}
				</MessageModal>
			)}
			{confirmMessage && (
				<ConfirmModal onConfirm={confirmAction} onCancel={() => setConfirmMessage('')}>
					{confirmMessage}
				</ConfirmModal>
			)}

			<div className='m-10'>
				<h1 className='text-3xl'>Add Event</h1>
				<LPLink type='link' to='/admin/manage-events' className='my-3 inline-block'>
					Manage Events
				</LPLink>
				<hr />
				<form className='mt-5 max-w-3xl rounded-2xl bg-gray-200 p-6 shadow-2xl'>
					<TextInput
						label='Event Title'
						id='title'
						value={event.name}
						onChange={e => setEvent({ ...event, name: e.target.value })}
					/>
					<DateInput
						label='Event Date'
						id='date'
						value={event.date}
						onChange={e => setEvent({ ...event, date: e.target.value })}
					/>
					<TextArea
						label='Event Description'
						id='desc'
						value={event.desc}
						onChange={e => setEvent({ ...event, desc: e.target.value })}
						placeholder='In a few sentences, please describe the details of the event you&#39;re adding'
					/>
					<Button onClick={confirmAdd} className='mx-auto block'>
						Add Event
					</Button>
				</form>
			</div>
		</>
	);
}
