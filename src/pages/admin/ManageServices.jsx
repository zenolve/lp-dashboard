// Packages
import { useEffect, useState } from 'react';
// Config
import { API_DOMAIN } from '../../config';
// Components
import Button from '../../components/Button';
import LinkButton from '../../components/LinkButton';
import MessageModal from '../../components/MessageModal';

export default function ManageServices() {
	const [error, setError] = useState('');
	const [currentList, setcurrentList] = useState('');
	const [services, setServices] = useState([]);

	useEffect(() => {
		document.title = 'Manage Services';
	}, []);

	useEffect(() => {
		getServices();
	}, [currentList]);

	function getServices() {
		let action;
		switch (currentList) {
			case 'pending':
				action = 'getPending';
				break;
			case 'approved':
				action = 'getApproved';
				break;
			default:
				return;
		}

		const data = new FormData();
		data.append('action', action);
		fetch(`${API_DOMAIN}/admin/services.php`, { method: 'POST', body: data, credentials: 'include' })
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

			{/* Buttons that load the lists */}
			<section className='my-6 flex justify-evenly'>
				<Button onClick={() => setcurrentList('pending')}>Pending Services</Button>
				<Button onClick={() => setcurrentList('approved')}>Approved Services</Button>
			</section>

			<section className='mx-auto mb-8 max-w-4xl rounded-3xl bg-lp-light-blue p-6'>
				<h1 className='mb-10 mt-5 text-center font-lp-title-bold text-3xl text-lp-navy'>
					{`Currently Viewing: ${currentList || 'none'}`}
				</h1>

				{services.map((service, i) => (
					<div key={i} className='mb-6 rounded-xl border border-lp-navy p-4'>
						<div className='mb-4 flex justify-evenly'>
							<span>
								<span className='font-bold'>Lister:</span> {service.listerEmail}
							</span>
							<span>
								<span className='font-bold'>Type:</span> {service.name}
							</span>
						</div>
						<LinkButton to={`/admin/edit-service/${service.id}`} type='link'>
							Edit
						</LinkButton>
					</div>
				))}
			</section>
		</>
	);
}
