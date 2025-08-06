// Packages
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_DOMAIN } from '../../config';
import expertCategories from '../../data/expertCategories.json';
import useWebsiteDomain from '../../hooks/useWebsiteDomain';
// Components
import Button from '../../components/Button';
import ConfirmModal from '../../components/ConfirmModal';
import { Link as LPLink } from '../../components/Link';
import MessageModal from '../../components/MessageModal';
import RadioBtn from '../../components/form/RadioBtn';
import Select from '../../components/form/Select';
import TextArea from '../../components/form/TextArea';
import TextInput from '../../components/form/TextInput';

export default function AddContent() {
	const { userId } = useParams();
	const userContent = !!userId; // TODO fetch user name + image if this is true
	const domain = useWebsiteDomain();
	const navigate = useNavigate();

	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [confirmMessage, setConfirmMessage] = useState('');
	const [confirmAction, setConfirmAction] = useState(() => () => {});
	const [formFields, setFormFields] = useState({
		type: '',
		title: '',
		desc: '',
		link: '',
		category: expertCategories[0].name
	});

	useEffect(() => {
		document.title = 'Add Content';
	}, []);

	function confirmAdd() {
		if (Object.values(formFields).some(value => value === '')) {
			setError('You must fill out all fields');
			return;
		}

		setConfirmAction(() => () => {
			add();
			setConfirmMessage('');
		});
		if (userContent) {
			setConfirmMessage('Are you sure you want to add this content for this service provider?');
		} else {
			setConfirmMessage('Are you sure you want to add this content?');
		}
	}

	function add() {
		const data = new FormData();
		data.append('action', 'insert');
		data.append('type', formFields.type);
		data.append('title', formFields.title);
		data.append('desc', formFields.desc);
		data.append('link', formFields.link);
		data.append('category', formFields.category);
		data.append('userContent', userContent);
		if (userContent) {
			data.append('userId', userId);
			data.append('domain', domain);
		}

		fetch(`${API_DOMAIN}/admin/content.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					if (userContent) {
						setSuccess('Successfully added content, email sent to service provider');
					} else {
						setSuccess('Successfully added content');
					}
				} else {
					setError(`Error: ${response.error}`);
				}
			})
			.catch(error => console.error(error));
	}

	return (
		<>
			{confirmMessage && (
				<ConfirmModal onConfirm={confirmAction} onCancel={() => setConfirmMessage('')}>
					{confirmMessage}
				</ConfirmModal>
			)}
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

			<div className='m-10'>
				<h1 className='text-3xl'>Add Content</h1>
				<LPLink type='link' to='/admin/manage-content' className='my-3 inline-block'>
					View Content
				</LPLink>

				<hr />
				<form className='mt-5 max-w-3xl rounded-2xl bg-gray-200 p-6 shadow-2xl'>
					<span className='block text-center font-bold'>Content Type</span>
					<div className='my-5 flex justify-evenly'>
						<RadioBtn
							name='contentType'
							label='Video'
							id='video'
							value='video'
							checked={formFields.type === 'video'}
							onChange={e => setFormFields({ ...formFields, type: e.target.value })}
						/>
						<RadioBtn
							name='contentType'
							label='Podcast'
							id='podcast'
							value='podcast'
							checked={formFields.type === 'podcast'}
							onChange={e => setFormFields({ ...formFields, type: e.target.value })}
						/>
						<RadioBtn
							name='contentType'
							label='Article'
							id='article'
							value='article'
							checked={formFields.type === 'article'}
							onChange={e => setFormFields({ ...formFields, type: e.target.value })}
						/>
					</div>
					<Select
						id='category'
						label='Category'
						value={formFields.category}
						onChange={e => setFormFields({ ...formFields, category: e.target.value })}>
						{expertCategories.map(category => (
							<option key={category.id} value={category.name}>
								{category.name}
							</option>
						))}
					</Select>
					<TextInput
						label='Content Link'
						id='link'
						value={formFields.link}
						onChange={e => setFormFields({ ...formFields, link: e.target.value })}
					/>
					<TextInput
						label='Content Title'
						id='title'
						value={formFields.title}
						onChange={e => setFormFields({ ...formFields, title: e.target.value })}
					/>
					<TextArea
						label='Content Description'
						id='desc'
						value={formFields.desc}
						onChange={e => setFormFields({ ...formFields, desc: e.target.value })}
						placeholder='In a few sentences, please describe the details of the content you&#39;re adding'
					/>
					<Button onClick={confirmAdd} className='mx-auto block'>
						Add Content
					</Button>
				</form>
			</div>
		</>
	);
}
