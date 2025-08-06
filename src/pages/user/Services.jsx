// Packages
import { useEffect, useState } from 'react';
// Config
import { API_DOMAIN } from '../../config';
// Components
import LinkButton from '../../components/LinkButton';
import MessageModal from '../../components/MessageModal';
// Icons
import { AiOutlineFileAdd } from 'react-icons/ai';

export default function Services() {
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [services, setServices] = useState([]);

	useEffect(() => {
		getServices();
		document.title = 'Manage Services';
	}, []);

	function getServices() {
		const data = new FormData();
		data.append('action', 'getAll');
		fetch(`${API_DOMAIN}/user/services.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setServices(response.services);
				} else {
					setError(`Error, services can't be fetched: ${response.error}`);
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
				<MessageModal type='success' onClose={() => setSuccess('')}>
					{error}
				</MessageModal>
			)}

			<LinkButton type='link' to='/list-service' className='mx-auto my-3 block w-fit'>
				<AiOutlineFileAdd className='my-1 mr-2 inline-block h-7 w-7' />
				List New Service
			</LinkButton>

			<div className='mx-5 mb-48 mt-5'>
				<h1 className='text-center text-3xl'>My Services</h1>
				{services.length === 0 && <h2 className='mt-6 text-center text-3xl'>No Services Listed</h2>}
				{services.length > 0 && (
					<>
						{services.map(service => (
							<div className='my-6 flex justify-center'>
								<div
									className='flex w-3/4 max-w-6xl flex-wrap rounded-2xl border border-gray-300 bg-lp-light-blue p-3 
										sm:flex-nowrap'>
									<div className='w-full'>
										<div className='flex justify-between'>
											<h2 className='inline-block'>
												<span className='font-bold'>Type:</span> {service.name}
											</h2>
											<span className='font-bold'>Status:</span> {service.status}
										</div>
										<div className='my-3'>
											<span className='font-bold'>Keywords:</span>{' '}
											{service.keywords.length > 80
												? service.keywords.slice(0, 80) + '...'
												: service.keywords}
										</div>
										{/* <h3>Description:</h3>
										<div className='my-3'>
											{service.desc.length > 80 ? service.desc.slice(0, 80) + '...' : service.desc}
										</div> */}
									</div>
								</div>
								<LinkButton
									to={`/edit-service/${service.id}`}
									type='link'
									className='mx-2 bg-lp-navy px-1 py-14'>
									Edit
								</LinkButton>
							</div>
						))}
					</>
				)}
			</div>
		</>
	);
}
