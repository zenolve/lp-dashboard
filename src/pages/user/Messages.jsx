// Packages
import { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { API_DOMAIN } from '../../config';
// Components
import MessageModal from '../../components/MessageModal';

export default function Messages() {
	const [error, setError] = useState('');
	const [messages, setMessages] = useState([]);
	const [currentMsg, setCurrentMsg] = useState(null);
	const [largeScreen, setLargeScreen] = useState(false);

	function getMessages() {
		fetch(`${API_DOMAIN}/user/messages.php`, { credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setMessages(response.messages);
				} else {
					setError(response.error);
				}
			})
			.catch(error => console.error(error));
	}

	useEffect(() => {
		getMessages();
		document.title = 'Messages';
		function handleResize() {
			const isLgScreen = window.innerWidth >= 640; // 640px -> tailwind sm breakpoint
			setLargeScreen(isLgScreen);
		}
		// Add event listener for window resize
		window.addEventListener('resize', handleResize);
		// Initial check on component mount
		handleResize();
		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<>
			{error && (
				<MessageModal type='error' onClose={() => setError('')}>
					{error}
				</MessageModal>
			)}

			<div className='mx-3 mb-80 mt-3 flex h-full'>
				{messages.length === 0 ? (
					<h2 className='mt-6 text-center text-3xl'>No Messages</h2>
				) : (
					<>
						{(!currentMsg || largeScreen) && (
							// Messages list
							<div className='h-auto w-full sm:w-64'>
								{messages.map(message => (
									<div
										onClick={() => setCurrentMsg(message)}
										className='mb-2 max-h-screen overflow-y-auto rounded-lg border border-gray-300 p-3 
											transition hover:scale-105 hover:cursor-pointer hover:bg-lp-cream-white'>
										<div className='flex justify-between'>
											<span className='font-bold'>{message.title}</span>
											<span className='italic'>{message.date}</span>
										</div>
										<div>
											{message.body.length > 20 ? message.body.substring(0, 20) + '...' : message.body}
										</div>
									</div>
								))}
							</div>
						)}

						{currentMsg && (
							<>
								{/* Vertical Line */}
								<span className='mx-3 h-full border-r border-gray-300' />

								{/* Opened Message */}
								<div className='flex-1'>
									<div className='mb-4 w-full sm:hidden sm:w-fit'>
										<BiArrowBack onClick={() => setCurrentMsg(null)} className='h-8 w-8' />
									</div>
									<h2 className='text-2xl'>
										<span className='font-bold'>Title:</span> {currentMsg.title}
									</h2>
									<div className='my-3'>{currentMsg.body}</div>
								</div>
							</>
						)}
					</>
				)}
			</div>
		</>
	);
}
