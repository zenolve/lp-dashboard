// Packages
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_DOMAIN } from '../config';
// Components
import MessageModal from '../components/MessageModal';

export default function VerifyAccount() {
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const navigate = useNavigate();

	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const email = params.get('e');
	const secKey = params.get('k');

	useEffect(() => {
		document.title = 'Verify Account';

		if (!email || !secKey) {
			setError('No email or secret key provided in URL');
			return;
		}

		const data = new FormData();
		data.append('a', 'verifyUser');
		data.append('params[e]', email);
		data.append('params[k]', secKey);

		fetch(`${API_DOMAIN}/index.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('Successfully verified your account!');
				} else {
					setError(response.message);
				}
			})
			.catch(error => console.error(error));
	}, []);

	return (
		<>
			{error && (
				<MessageModal type='error' onClose={() => setError('')}>
					{error}
				</MessageModal>
			)}
			{success && (
				<MessageModal type='success' onClose={() => navigate('/')}>
					{success}
				</MessageModal>
			)}

			<h1 className='mt-16 text-center font-lp-title-bold text-6xl'>Verifying Account...</h1>
		</>
	);
}
