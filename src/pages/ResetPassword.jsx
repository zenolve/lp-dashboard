// Packages
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_DOMAIN } from '../config';
// Components
import Button from '../components/Button';
import { Link as LPLink } from '../components/Link';
import MessageModal from '../components/MessageModal';
import TextInput from '../components/form/TextInput';

export default function ResetPassword() {
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const email = params.get('e');
	const key = params.get('k');

	const navigate = useNavigate();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');

	function resetPassword() {
		if (!newPassword || !confirmNewPassword) {
			setError('You must fill out both fields');
			return;
		}
		if (newPassword !== confirmNewPassword) {
			setError("Passwords don't match");
			return;
		}

		const data = new FormData();
		data.append('a', 'resetPassword');
		data.append('params', JSON.stringify({ password: newPassword, e: email, k: key }));
		fetch(`${API_DOMAIN}/index.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('You have successfully reset your password.');
				} else {
					setError(response.message);
				}
			})
			.catch(error => console.error(error));
	}

	useEffect(() => {
		document.title = 'Reset Password';
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

			<form className='mx-auto mb-96 mt-14 w-11/12 max-w-xl rounded-xl bg-gray-200 px-3 py-7 shadow-2xl sm:p-7'>
				<h1 className='mb-8 text-center font-lp-title-bold text-3xl text-lp-navy'>Reset Password</h1>
				<TextInput
					label='New Password'
					id='newPassword'
					type='password'
					value={newPassword}
					onChange={e => setNewPassword(e.target.value)}
				/>
				<TextInput
					label='Confirm New Password'
					id='confirmNewPassword'
					type='password'
					value={confirmNewPassword}
					onChange={e => setConfirmNewPassword(e.target.value)}
				/>
				<Button onClick={resetPassword} className='mx-auto my-3 block'>
					Reset Password
				</Button>
				<LPLink type='link' to='/login'>
					Back to Login / Register
				</LPLink>
			</form>
		</>
	);
}
