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
import DateInput from '../../components/form/DateInput';
import TextArea from '../../components/form/TextArea';
import TextInput from '../../components/form/TextInput';

export default function EditEvent() {
	const { eventId } = useParams();
	const navigate = useNavigate();

	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [confirmMessage, setConfirmMessage] = useState('');
	const [confirmAction, setConfirmAction] = useState(() => () => {});
	const [registrantsNum, setRegistrantsNum] = useState(0);
	const [event, setEvent] = useState({
		name: '',
		date: '',
		desc: ''
	});

	useEffect(() => {
		getEvent();
		document.title = 'Edit Event';
	}, []);

	function getEvent() {
		const data = new FormData();
		data.append('action', 'getSingle');
		data.append('eventId', eventId);
		fetch(`${API_DOMAIN}/admin/events.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setEvent(response.event);
					setRegistrantsNum(response.registrants);
				} else {
					setError(`Error retrieving event: ${response.error}`);
				}
			})
			.catch(error => console.error(error));
	}

	function confirmUpdate() {
		if (Object.values(event).some(value => value === '')) {
			setError('You must fill out all fields');
			return;
		}

		setConfirmAction(() => () => {
			update();
			setConfirmMessage('');
		});
		setConfirmMessage('Are you sure you want to update the details of this event?');
	}

	function update() {
		const data = new FormData();
		data.append('action', 'edit');
		data.append('eventId', eventId);
		data.append('name', event.name);
		data.append('date', event.date);
		data.append('desc', event.desc);
		fetch(`${API_DOMAIN}/admin/events.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('Successfully updated event');
				} else {
					setError(`Error updating event: ${response.error}`);
				}
			})
			.catch(error => console.error(error));
	}

	function confirmRemove() {
		setConfirmAction(() => () => {
			remove();
			setConfirmMessage('');
		});
		setConfirmMessage('Are you sure you want to delete this event?');
	}

	function remove() {
		const data = new FormData();
		data.append('action', 'delete');
		data.append('eventId', eventId);
		fetch(`${API_DOMAIN}/admin/events.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('Successfully deleted event');
				} else {
					setError(`Error deleting event: ${response.error}`);
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
				<h1 className='text-3xl'>Edit Event</h1>
				<LPLink type='link' to='/admin/manage-events' className='my-3 inline-block'>
					Manage Events
				</LPLink>
				<hr />
				<h2 className='mt-4 text-xl'>Number of Registrants: {registrantsNum}</h2>
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
					<div className='flex justify-evenly'>
						<Button onClick={confirmUpdate}>Update Event</Button>
						<Button onClick={confirmRemove} style='critical'>
							Delete Event
						</Button>
					</div>
				</form>
			</div>
		</>
	);
}
