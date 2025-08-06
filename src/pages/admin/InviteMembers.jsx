// Packages
import { useEffect, useState } from 'react';
import { API_DOMAIN } from '../../config';
// Components
import Button from '../../components/Button';
import ConfirmModal from '../../components/ConfirmModal';
import { Link as LPLink } from '../../components/Link';
import MessageModal from '../../components/MessageModal';
import CheckBox from '../../components/form/CheckBox';
import TextArea from '../../components/form/TextArea';
import TextInput from '../../components/form/TextInput';

export default function ManageMembers() {
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [reloadSuccess, setReloadSuccess] = useState('');
	const [confirmMessage, setConfirmMessage] = useState('');
	const [confirmAction, setConfirmAction] = useState(() => () => {});
	const [invitations, setInvitations] = useState('');

	function sendInvite(invitations) {
		const data = new FormData();

		data.append('action', 'sendInvites');
		data.append('emails', invitations);

		fetch(`${API_DOMAIN}/admin/members.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					response.success ? setReloadSuccess('Member invites sent') : setError(response.message);
				} else {
					setError('Unauthorized, log in as admin');
				}
			})
			.catch(error => console.error(error));
	}

	useEffect(() => {
		document.title = 'Send Invites';
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
			{reloadSuccess && (
				<MessageModal
					type='success'
					onClose={() => {
						getMembers();
						setReloadSuccess('');
					}}>
					{reloadSuccess}
				</MessageModal>
			)}
			{confirmMessage && (
				<ConfirmModal onConfirm={confirmAction} onCancel={() => setConfirmMessage('')}>
					{confirmMessage}
				</ConfirmModal>
			)}

			{/* Member List */}
			<section className='mx-auto w-4/5 rounded-3xl bg-lp-light-blue p-6'>
				<h1 className='mb-10 mt-5 text-center font-lp-title-bold text-3xl text-lp-navy'>{`Invite Members`}</h1>
				<form>
					<h2 className='mt-5 text-center text-xl'>Add email addresses</h2>
					<TextArea
						label='Invitations'
						id='invitations'
						value={invitations}
						onChange={e => setInvitations(e.target.value)}
						placeholder='Add email address separated by commas'
					/>
					<Button className='mx-auto block' onClick={() => sendInvite(invitations)}>
						Invite Members
					</Button>
				</form>
			</section>
		</>
	);
}
