// Packages
import { useEffect, useRef, useState } from 'react';
// Data
import expertCategories from '../../data/expertCategories';
// Components
import Button from './components/Button';
import Select from './components/form/Select';
import TextArea from './components/form/TextArea';
import TextInput from './components/form/TextInput';

export default function BulkEmail() {
	const [currentList, setCurrentList] = useState('');

	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');
	const [expertise, setExpertise] = useState('');

	const [expTypeOpen, setExpTypeOpen] = useState(false);
	const [messageOpen, setMessageOpen] = useState(false);

	const formRef = useRef(null);

	function sendMessage() {
		const data = new FormData();
		data.append('subject', subject);
		data.append('message', message);
		data.append('recipients', currentList);
		currentList === 'experts' && data.append('expertType', expertise);

		fetch('https://www.londonproperty.co.uk/dashboard/api/v0.01/send-mass-emails.php', { method: 'POST', body: data })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					alert('Successfully sent emails!');
					window.location.reload();
				} else {
					alert(response.message);
				}
			})
			.catch(error => console.error(error));
	}

	useEffect(() => {
		document.title = 'Bulk Email';
	}, []);

	useEffect(() => {
		if (currentList === 'experts') {
			//TODO
			messageOpen(false);
			expTypeOpen(true);
			formRef.current.scrollIntoView({ behavior: 'smooth' });
		} else if (currentList === 'members' || currentList === 'users') {
			//TODO
		}
	}, [currentList]);

	return (
		<div className='mx-auto max-w-3xl'>
			<h1 className='my-10 text-center text-3xl'>Who would you like to email?</h1>
			<section className='my-6 flex justify-evenly'>
				<Button onClick={() => setCurrentList('users')}>Users</Button>
				<Button onClick={() => setCurrentList('members')}>Members</Button>
				<Button onClick={() => setCurrentList('experts')}>Experts</Button>
			</section>

			<section>
				{expTypeOpen && (
					<form>
						<Select
							label='Select Expertise Type'
							id='expType'
							value={expertise}
							onChange={e => setExpertise(e.target.value)}>
							<option value='All'>All</option>
							{expertCategories.map(category => (
								<option key={category.id} value={category.name}>
									{category.name}
								</option>
							))}
						</Select>
					</form>
				)}

				{messageOpen && (
					<form ref={formRef}>
						<h2>{`Sending message to: '${currentList}' Experts`}</h2>
						<TextInput label='Subject' id='subject' value={subject} onChange={e => setSubject(e.target.value)} />
						<TextArea
							label='Message'
							id='message'
							placeholder='Enter your message here'
							value={message}
							onChange={e => setMessage(e.target.value)}
						/>
						<Button onClick={sendMessage}>Send Message</Button>
					</form>
				)}
			</section>
		</div>
	);
}
