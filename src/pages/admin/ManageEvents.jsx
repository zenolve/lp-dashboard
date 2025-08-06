// Packages
import { useEffect, useState } from 'react';
import { API_DOMAIN } from '../../config';
// Components
import LinkButton from '../../components/LinkButton';

export default function ManageEvents() {
	const [error, setError] = useState('');
	const [events, setEvents] = useState([]);

	function getEvents() {
		const data = new FormData();
		data.append('action', 'getAll');
		fetch(`${API_DOMAIN}/admin/events.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setEvents(response.events);
				} else {
					setError(`Error retrieving events: ${response.error}`);
				}
			})
			.catch(error => console.error(error));
	}

	useEffect(() => {
		getEvents();
		document.title = 'Manage Events';
	}, []);

	return (
		<>
			{error && (
				<MessageModal type='error' onClose={() => setError('')}>
					{error}
				</MessageModal>
			)}

			<div className='m-5'>
				<h1 className='text-3xl'>All Events</h1>
				<LinkButton type='link' to='/admin/add-event' className='mx-auto mb-3 block w-fit'>
					Add Event
				</LinkButton>

				{events.length === 0 && <h2 className='mt-6 text-center text-3xl'>No Events Found</h2>}
				{events.length > 0 && (
					<div>
						{events.map(event => (
							<div className='flex items-center'>
								<LinkButton
									to={`/admin/edit-event/${event.id}`}
									type='link'
									className='mx-2 bg-lp-light-blue px-1 py-14'>
									Edit
								</LinkButton>
								<div className='my-8 rounded border border-gray-300 p-3'>
									<h2 className='inline-block font-bold'>{event.name}</h2>
									<span className='ml-10'>Date: {event.date}</span>
									<span className='ml-10'>Registrants: {event.registrantsNum}</span>
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
