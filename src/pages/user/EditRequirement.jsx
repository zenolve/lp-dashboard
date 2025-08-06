import { useEffect, useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useParams } from 'react-router-dom';
import { API_DOMAIN } from '../../config';
import useWebsiteDomain from '../../hooks/useWebsiteDomain';

import expertCategories from '../../data/expertCategories';

import Button from '../../components/Button';
import MessageModal from '../../components/MessageModal';
import DateInput from '../../components/form/DateInput';
import FileInput from '../../components/form/FileInput';
import Select from '../../components/form/Select';
import TextArea from '../../components/form/TextArea';
import TextInput from '../../components/form/TextInput';

export default function EditRequirement() {
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const domain = useWebsiteDomain();

	const { requirementId } = useParams();
	const [attachmentsReturned, setAttachmentsReturned] = useState(null);
	const [editFields, setEditFields] = useState({
		title: '',
		price: '',
		complete_by: '',
		services: '',
		description: '',
		attachments: null
	});

	function getRequirements(id) {
		const data = new FormData();
		data.append('requirement-id', id);
		data.append('action', 'getSingle');
		fetch(`${API_DOMAIN}/user/requirements.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					const info = response.requirements;
					const completeByDate = new Date(info.complete_by);
					const formattedCompleteByDate = `${completeByDate.getFullYear()}-${(completeByDate.getMonth() + 1)
						.toString()
						.padStart(2, '0')}-${completeByDate.getDate().toString().padStart(2, '0')}`;

					setEditFields({
						title: info.title || '',
						price: info.price || '',
						complete_by: formattedCompleteByDate || '',
						description: info.description || '',
						services: info.services || ''
					});
					setAttachmentsReturned(info.attachments);
				} else {
					setError(response.message);
				}
			})
			.catch(error => console.error(error));
	}

	function updateRequirement(id) {
		const data = new FormData();
		data.append('requirement-id', id);
		data.append('action', 'update');
		data.append('title', editFields.title);
		data.append('desc', editFields.description);
		data.append('price', editFields.price);
		data.append('services', editFields.services);
		data.append('completeBy', editFields.complete_by);
		data.append('domain', domain);

		// Assuming "attachments" is a FileList object
		const attachments = document.getElementById('attachments').files;
		for (let i = 0; i < attachments.length; i++) {
			data.append('attachments[]', attachments[i]);
		}
		console.log(data);

		fetch(`${API_DOMAIN}/user/requirements.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('Requirement details updated');
				} else {
					setError('Unauthorized, log in as admin');
				}
			})
			.catch(error => console.error(error));
	}

	function deleteFile(fileID) {
		const data = new FormData();
		data.append('fileID', fileID);
		data.append('action', 'deleteFile');

		fetch(`${API_DOMAIN}/user/requirements.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('File deleted');
				} else {
					setError('Cannot delete file');
				}
			})
			.catch(error => console.error(error));
	}

	useEffect(() => {
		getRequirements(requirementId);
		document.title = 'Edit Requirements';
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
			<h1 className='mb-10 mt-5 text-center font-lp-title-bold text-3xl text-lp-navy'>{`Edit Requirement`}</h1>
			<form className='mb-8 ml-5 w-1/2'>
				<h2 className='mt-5 text-center text-xl'>Edit Requirement Details:</h2>
				<TextInput
					label='Title'
					id='title'
					value={editFields.title}
					onChange={e => setEditFields({ ...editFields, title: e.target.value })}
				/>
				<Select
					label='Desired Expertise'
					id='expertise'
					value={editFields.services}
					onChange={e => setEditFields({ ...editFields, services: e.target.value })}>
					<option value='All'>Any / No Expertise</option>
					{expertCategories.map(category => (
						<option key={category.id} value={category.name}>
							{category.name}
						</option>
					))}
				</Select>
				<TextInput
					label='Price'
					id='price'
					value={editFields.price}
					onChange={e => setEditFields({ ...editFields, price: e.target.value })}
				/>
				<TextArea
					label='Description'
					id='description'
					value={editFields.description}
					onChange={e => setEditFields({ ...editFields, description: e.target.value })}
				/>
				<DateInput
					label='Complete By'
					id='complete_by'
					value={editFields.complete_by}
					onChange={e => setEditFields({ ...editFields, complete_by: e.target.value })}
				/>

				<FileInput
					label='Attachments'
					id='attachments'
					name='attachments'
					multiple
					onChange={({ target: { files } }) => {
						files && setEditFields({ ...editFields, attachments: files });
					}}
				/>
				{attachmentsReturned && attachmentsReturned.length > 0 ? (
					<div>
						<h3 className='mb-1 '>Files</h3>
						<ul>
							{attachmentsReturned.map((attachment, index) => {
								const parts = attachment.split('/');
								const key = parts[parts.length - 1]; // Get the last part of the URL
								const url = 'https://' + attachment;
								return (
									// <li key={key} style={{ display: 'flex', alignItems: 'center' }}>
									<li key={key} className='flex items-center'>
										<a
											href={url}
											target='_blank'
											rel='noopener noreferrer'
											className='ml-5 mr-1 text-lp-navy'>
											{key}
										</a>
										<RxCross2
											onClick={() => deleteFile(key.toString())}
											className='cursor-pointer text-lp-navy'
										/>
									</li>
								);
							})}
						</ul>
					</div>
				) : (
					<h3 className='mb-5'>No files exist for this requirement</h3>
				)}
				<Button className='mx-auto block' onClick={() => updateRequirement(requirementId)}>
					Update Requirement
				</Button>
			</form>
		</>
	);
}
