// Packages
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_DOMAIN } from '../../config';
import useWebsiteDomain from '../../hooks/useWebsiteDomain';
// Data
import expertCategories from '../../data/expertCategories';
// Components
import Button from '../../components/Button';
import ConfirmModal from '../../components/ConfirmModal';
import { Link as LPLink } from '../../components/Link';
import MessageModal from '../../components/MessageModal';
import DateInput from '../../components/form/DateInput';
import FileInput from '../../components/form/FileInput';
import Select from '../../components/form/Select';
import TextArea from '../../components/form/TextArea';
import TextInput from '../../components/form/TextInput';

export default function PostRequirement() {
	const navigate = useNavigate();
	const domain = useWebsiteDomain();

	const [confirmText, setConfirmText] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const [formData, setFormData] = useState({
		title: '',
		services: '',
		desc: '',
		price: '',
		completeBy: '',
		attachments: null
	});

	function post() {
		const data = new FormData();
		data.append('action', 'insert');
		data.append('title', formData.title);
		data.append('services', formData.services);
		data.append('desc', formData.desc);
		data.append('price', formData.price);
		data.append('completeBy', formData.completeBy);
		data.append('domain', domain);

		// Assuming "attachments" is a FileList object
		const attachments = document.getElementById('attachments').files;
		for (let i = 0; i < attachments.length; i++) {
			data.append('attachments[]', attachments[i]);
		}
		fetch(`${API_DOMAIN}/user/requirements.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('Successfully posted requirement');
				} else {
					setError(response.error);
				}
			})
			.catch(error => console.error(error));
	}

	useEffect(() => {
		document.title = 'Post a Requirement';
	}, []);

	return (
		<>
			{confirmText && (
				<ConfirmModal onConfirm={post} onCancel={() => setConfirmText('')}>
					{confirmText}
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

			<div className='mx-auto mt-6 max-w-full py-6 text-center'>
				<h1 className='text-3xl'>Post Requirement</h1>
				<p className='mt-5 text-gray-500'>
					Please fill out the below form to the best of your ability so we can find the right resources and get back
					to your as soon as possible.
				</p>
				<LPLink type='link' to='/service-directory' className='my-3 inline-block'>
					View All Our Experts
				</LPLink>
				<hr />
				<form className='mx-auto mb-5 mt-5 max-w-3xl rounded-2xl bg-gray-200 p-6 shadow-2xl'>
					<TextInput
						label='Request Title'
						id='title'
						value={formData.title}
						onChange={e => setFormData({ ...formData, title: e.target.value })}
					/>
					<Select
						label='Desired Expertise'
						id='expertise'
						value={formData.services}
						onChange={e => setFormData({ ...formData, services: e.target.value })}>
						<option value='All'>Any / No Expertise</option>
						{expertCategories.map(category => (
							<option key={category.id} value={category.name}>
								{category.name}
							</option>
						))}
					</Select>
					<TextArea
						placeholder='In a few sentences, please describe the details of your requirement'
						label='Description'
						id='desc'
						value={formData.desc}
						onChange={e => setFormData({ ...formData, desc: e.target.value })}
					/>
					<TextInput
						label='Suggested Price'
						type='number'
						id='price'
						value={formData.price}
						onChange={e => setFormData({ ...formData, price: e.target.value })}
					/>
					<DateInput
						label='Complete By'
						id='completeBy'
						value={formData.completeBy}
						onChange={e => setFormData({ ...formData, completeBy: e.target.value })}
					/>
					<FileInput
						label='Attachments'
						id='attachments'
						name='attachments'
						multiple
						onChange={({ target: { files } }) => {
							files && setFormData({ ...formData, attachments: files });
						}}
					/>
					<Button
						onClick={() => setConfirmText('Are you sure you want to post this requirement?')}
						className='mx-auto block'>
						Post Requirement
					</Button>
				</form>
			</div>
		</>
	);
}
