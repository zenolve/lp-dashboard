// Packages
import { useEffect, useState } from 'react';
import useWebsiteDomain from '../hooks/useWebsiteDomain';
// Config
import { API_DOMAIN } from '../config';
// Components
import Button from '../components/Button';
import { Link as LPLink } from '../components/Link';
import MessageModal from '../components/MessageModal';
import TextInput from '../components/form/TextInput';

/**
 * Request password reset page.
 */
export default function RequestPasswordReset() {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const domain = useWebsiteDomain();

	function requestReset() {
		if (!email) {
			setError('Enter your email address');
			return;
		}

		const data = new FormData();
		data.append('a', 'requestResetPassword');
		data.append('params', JSON.stringify({ e: email }));
		data.append('domain', domain);
		fetch(`${API_DOMAIN}/index.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess(
						'Password reset link has been emailed. Please click the link in the email to reset your password. You may close this page.'
					);
				} else {
					setError(response.message);
				}
			})
			.catch(error => console.error(error));
	}

	useEffect(() => {
		document.title = 'Request Password Reset';
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

			<form className='mx-auto mb-96 mt-14 w-11/12 max-w-xl rounded-xl bg-gray-200 px-3 py-7 shadow-2xl sm:p-7'>
				<h1 className='mb-8 text-center font-lp-title-bold text-3xl text-lp-navy'>Request Password Reset</h1>
				<TextInput label='Email Address' id='email' value={email} onChange={e => setEmail(e.target.value)} />
				<Button onClick={requestReset} className='mx-auto my-3 block'>
					Request Password Reset
				</Button>
				<LPLink type='link' to='/login'>
					Back to Login / Register
				</LPLink>
			</form>
		</>
	);
}
