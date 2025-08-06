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
import Form from '../../components/form/Form';
import RadioBtn from '../../components/form/RadioBtn';
import Select from '../../components/form/Select';
import TextArea from '../../components/form/TextArea';
import TextInput from '../../components/form/TextInput';

export default function EditContent() {
	const { contentId } = useParams();
	const navigate = useNavigate();
	const domain = useWebsiteDomain();

	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [confirmMessage, setConfirmMessage] = useState('');
	const [confirmAction, setConfirmAction] = useState(() => () => {});
	const [userContent, setUserContent] = useState(null);
	const [contentFields, setContentFields] = useState({
		type: '',
		title: '',
		desc: '',
		link: '',
		category: expertCategories[0].name
	});

	useEffect(() => {
		getContent();
		document.title = 'Edit Content';
	}, []);

	function getContent() {
		const data = new FormData();
		data.append('action', 'getSingle');
		data.append('contentId', contentId);
		fetch(`${API_DOMAIN}/admin/content.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setUserContent(response.userContent);
					setContentFields(response.content);
				} else {
					setError(`Error, content can't be fetched: ${response.error}`);
				}
			})
			.catch(error => console.error(error));
	}

	function confirmUpdate() {
		if (Object.values(contentFields).some(value => value === '')) {
			setError('You must fill out all fields');
			return;
		}

		setConfirmAction(() => () => {
			update();
			setConfirmMessage('');
		});
		if (userContent) {
			setConfirmMessage(
				"Are you sure you want to update the details of this content? Please note that this is user content on a service provider's profile."
			);
		} else {
			setConfirmMessage('Are you sure you want to update the details of this content?');
		}
	}

	function update() {
		const data = new FormData();
		data.append('action', 'update');
		data.append('userContent', userContent);
		data.append('contentId', contentId);
		data.append('domain', domain);
		data.append('type', contentFields.type);
		data.append('title', contentFields.title);
		data.append('desc', contentFields.desc);
		data.append('link', contentFields.link);
		data.append('category', contentFields.category);
		fetch(`${API_DOMAIN}/admin/content.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					if (userContent) {
						setSuccess('Successfully updated content, email send to service provider');
					} else {
						setSuccess('Successfully updated content');
					}
				} else {
					setError(`Error updating content: ${response.error}`);
				}
			})
			.catch(error => console.error(error));
	}

	function confirmRemove() {
		setConfirmAction(() => () => {
			remove();
			setConfirmMessage('');
		});
		if (userContent) {
			setConfirmMessage(
				"Are you sure you want to delete this content? Please note that this is user content on a service provider's profile."
			);
		} else {
			setConfirmMessage('Are you sure you want to delete this content?');
		}
	}

	function remove() {
		const data = new FormData();
		data.append('action', 'remove');
		data.append('userContent', userContent);
		data.append('contentId', contentId);
		data.append('domain', domain);
		fetch(`${API_DOMAIN}/admin/content.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					if (userContent) {
						setSuccess('Successfully deleted content, email send to service provider');
					} else {
						setSuccess('Successfully deleted content');
					}
				} else {
					setError(`Error deleting content: ${response.error}`);
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
				<MessageModal
					type='success'
					onClose={() => navigate(userContent ? '/admin/manage-services' : '/admin/manage-content')}>
					{success}
				</MessageModal>
			)}
			{confirmMessage && (
				<ConfirmModal onConfirm={confirmAction} onCancel={() => setConfirmMessage('')}>
					{confirmMessage}
				</ConfirmModal>
			)}

			<div className='m-10'>
				<h1 className='text-3xl'>Edit Content</h1>
				<LPLink type='link' to='/admin/manage-services' className='my-3 inline-block'>
					Manage Content
				</LPLink>

				<hr className='my-5' />
				<Form>
					<span className='block text-center font-bold'>Content Type</span>
					<div className='my-5 flex justify-evenly'>
						<RadioBtn
							name='contentType'
							label='Video'
							id='video'
							value='video'
							checked={contentFields.type === 'video'}
							onChange={e => setContentFields({ ...contentFields, type: e.target.value })}
						/>
						<RadioBtn
							name='contentType'
							label='Podcast'
							id='podcast'
							value='podcast'
							checked={contentFields.type === 'podcast'}
							onChange={e => setContentFields({ ...contentFields, type: e.target.value })}
						/>
						<RadioBtn
							name='contentType'
							label='Article'
							id='article'
							value='article'
							checked={contentFields.type === 'article'}
							onChange={e => setContentFields({ ...contentFields, type: e.target.value })}
						/>
					</div>
					<Select
						id='category'
						label='Category'
						value={contentFields.category}
						onChange={e => setContentFields({ ...contentFields, category: e.target.value })}>
						{expertCategories.map(category => (
							<option key={category.id} value={category.name}>
								{category.name}
							</option>
						))}
					</Select>
					<TextInput
						label='Content Link'
						id='link'
						value={contentFields.link}
						onChange={e => setContentFields({ ...contentFields, link: e.target.value })}
					/>
					<TextInput
						label='Content Title'
						id='title'
						value={contentFields.title}
						onChange={e => setContentFields({ ...contentFields, title: e.target.value })}
					/>
					<TextArea
						label='Content Description'
						id='desc'
						value={contentFields.desc}
						onChange={e => setContentFields({ ...contentFields, desc: e.target.value })}
						placeholder='In a few sentences, please describe the details of the content you&#39;re adding'
					/>
					<div className='flex justify-evenly'>
						<Button onClick={confirmUpdate}>Update Content</Button>
						<Button onClick={confirmRemove} style='critical'>
							Delete Content
						</Button>
					</div>
				</Form>
			</div>
		</>
	);
}
