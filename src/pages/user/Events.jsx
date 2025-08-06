// Packages
import { useEffect, useState } from 'react';
// Config
import { API_DOMAIN } from '../../config';
// Components
import Button from '../../components/Button';
import MessageModal from '../../components/MessageModal';

export default function Events() {
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [events, setEvents] = useState([]);

	function getEvents() {
		fetch(`${API_DOMAIN}/user/events.php`, { credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setEvents(response.events);
				} else {
					setError(response.error);
				}
			})
			.catch(error => console.error(error));
	}

	function registerUnregister(registered, eventId) {
		const data = new FormData();
		data.append('eventId', eventId);
		data.append('action', registered ? 'unregister' : 'register');
		fetch(`${API_DOMAIN}/user/events.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					if (response.action === 'register') {
						setSuccess(`Successfully registered for event`);
					} else if (response.action === 'unregister') {
						setSuccess(`Successfully unregistered from event`);
					}
					getEvents();
				} else {
					setError(response.error);
				}
			})
			.catch(error => console.error(error));
	}

	useEffect(() => {
		getEvents();
		document.title = 'Events';
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
					{success}
				</MessageModal>
			)}

			<div className='mx-5 mb-48 mt-5'>
				<h1 className='text-center text-3xl'>Events</h1>
				{events.length === 0 && <h2 className='mt-6 text-center text-3xl'>No Events Found</h2>}
				{events.length > 0 && (
					<div>
						{events.map(event => (
							<div className='mx-auto my-8 flex max-w-6xl rounded border border-gray-300 p-3'>
								<div className='w-full'>
									<div className='flex flex-wrap justify-between'>
										<h2 className='inline-block w-72 font-bold'>{event.name}</h2>
										<span className='mx-10 w-40'>Date: {event.date}</span>
										<Button
											onClick={() => registerUnregister(event.registered, event.id)}
											style={event.registered ? 'critical' : 'default'}
											className='mr-24 mt-4 md:mr-0'>
											{event.registered ? 'Unregister from Event' : 'Register for Event'}
										</Button>
									</div>
									<div className='my-3'>{event.desc}</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
}
