// Packages
import { useState } from 'react';
// Components
import Button from './components/Button';
import MessageModal from './components/MessageModal';

export default function ReferralScheme() {
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [link, setLink] = useState('');
	const placeholder = 'Your link will appear here';

	const data = new FormData();
	data.append('gen_ref_link', 1);
	function generateLink() {
		fetch('https://test.londonproperty.co.uk/old-dashboard/api/v0.01/referrals.php', {
			method: 'POST',
			body: data,
			credentials: 'include'
		})
			.then(response => response.json())
			.then(response => {
				if (response.status === 1 && response.generated_link_param) {
					setLink(response.generated_link_param);
				} else {
					setError(response.message);
				}
			})
			.catch(error => console.error(error));
	}

	function copyLink() {
		navigator.clipboard.writeText(link);
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
					{success}
				</MessageModal>
			)}

			<section className='mx-auto w-1/2'>
				<h1 className='my-6 text-center font-lp-title-regular text-5xl text-lp-navy'>
					London Property Referrals Scheme
				</h1>
				<p className='text-center text-xl'>
					Make the most of your contacts and earn referral commission when you connect other experts like yourself
					with us. If you refer an expert to us and they complete a transaction with us, you will receive 10% of the
					London Property fee amount. The process is simple - generate your unique link by clicking on the button
					below and send this link to your contacts, inviting them to register with us. We will be able to track their
					application and will notify you if a transaction is successfully completed.
				</p>
				<p className='my-5 rounded-xl bg-lp-light-blue p-3 text-center'>{link ? link : placeholder}</p>
				<Button className='mx-auto my-7 block' onClick={link ? copyLink : generateLink}>
					{link ? 'Copy Link' : 'Generate Link'}
				</Button>
			</section>
		</>
	);
}
