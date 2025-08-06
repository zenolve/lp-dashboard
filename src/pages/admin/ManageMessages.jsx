// Packages
import { useEffect, useState } from 'react';
// Config
import { API_DOMAIN } from '../../config';
// Components
import LinkButton from '../../components/LinkButton';
import MessageModal from '../../components/MessageModal';

export default function ManageMessages() {
	const [error, setError] = useState('');
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		getMessages();
		document.title = 'Manage Messages';
	}, []);

	function getMessages() {
		const data = new FormData();
		data.append('action', 'getAll');
		fetch(`${API_DOMAIN}/admin/messages.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setMessages(response.messages);
				} else {
					setError(`Error retrieving messages: ${response.error}`);
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

			<div className='m-5'>
				<h1 className='text-3xl'>Manage Messages</h1>
				<LinkButton type='link' to='/admin/add-message' className='mx-auto mb-3 block w-fit'>
					Add New Message
				</LinkButton>

				{messages.length === 0 && <h2 className='mt-6 text-center text-3xl'>No Messages Found</h2>}
				{messages.length > 0 && (
					<div>
						{messages.map(message => (
							<div className='flex items-center'>
								<LinkButton
									type='link'
									to={`/admin/edit-message/${message.id}`}
									className='mx-2 bg-lp-light-blue px-1 py-14'>
									Edit
								</LinkButton>
								<div className='my-8 rounded border border-gray-300 p-3'>
									<h2 className='mr-10 inline-block font-bold'>{message.title}</h2>
									<span>Date: {message.updated}</span>
									<div className='my-3'>{message.body}</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
}
