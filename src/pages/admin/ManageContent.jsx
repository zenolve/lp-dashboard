// Packages
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_DOMAIN } from '../../config';
import expertCategories from '../../data/expertCategories.json';
// Components
import LinkButton from '../../components/LinkButton';
import MessageModal from '../../components/MessageModal';
import Select from '../../components/form/Select';

export default function ManageContent() {
	const [content, setContent] = useState([]);
	const [category, setCategory] = useState(expertCategories[0].name);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Manage Content';
	}, []);

	useEffect(() => {
		getContent(category);
	}, [category]);

	function getContent() {
		const data = new FormData();
		data.append('action', 'getAll');
		data.append('category', category);
		fetch(`${API_DOMAIN}/admin/content.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setContent(response.content);
				} else {
					setError(`Error: ${response.error}`);
				}
			})
			.catch(error => console.error(error));
	}

	return (
		<>
			{error && (
				<MessageModal type='error' onClose={() => navigate('/')}>
					{error}
				</MessageModal>
			)}

			<div className='m-3'>
				<h1 className='mb-4 text-center text-3xl'>Content Library</h1>
				<LinkButton type='link' to='/admin/add-content' className='mx-auto mb-3 block w-fit'>
					Add Content
				</LinkButton>

				<div className='mx-auto w-fit'>
					<Select id='category' value={category} onChange={e => setCategory(e.target.value)}>
						{expertCategories.map(category => (
							<option key={category.id} value={category.name}>
								{category.name}
							</option>
						))}
					</Select>
				</div>

				{content.length === 0 && <h3 className='mt-6 text-center text-3xl'>No content</h3>}
				{content.map(contentItem => {
					// TODO: unify returns
					if (contentItem.type === 'video') {
						return (
							<div className='mx-auto mb-5 flex w-4/5 rounded border border-gray-300 p-3'>
								<iframe
									src={contentItem.link}
									title={contentItem.title}
									loading='lazy'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									allowFullScreen
									// width='560'
									// height='315'
									className='border-none'
								/>
								<div className='px-5'>
									<h2 className='font-bold'>{contentItem.title}</h2>
									<p>
										{contentItem.description.length > 250
											? contentItem.description.slice(0, 250) + '...'
											: contentItem.description}
									</p>
									<div className='my-2'>{contentItem.desc}</div>
								</div>
								<LinkButton
									type='link'
									to={`/admin/edit-content/${contentItem.id}`}
									className='mx-2bg-lp-light-blue px-1 py-14'>
									Edit
								</LinkButton>
							</div>
						);
					}
					if (contentItem.type === 'podcast') {
						return (
							<div className='mx-auto mb-5 flex w-4/5 rounded border border-gray-300 p-3'>
								<iframe
									src={contentItem.link}
									title={contentItem.title}
									loading='lazy'
									// width='100%'
									// height='200'
									className='overflow-hidden border-none'
								/>
								<div className='px-5'>
									<h2 className='font-bold'>{contentItem.title}</h2>
									<p>
										{contentItem.description.length > 250
											? contentItem.description.slice(0, 250) + '...'
											: contentItem.description}
									</p>
									<div className='my-2'>{contentItem.desc}</div>
								</div>
								<LinkButton
									type='link'
									to={`/admin/edit-content/${contentItem.id}`}
									className='mx-2bg-lp-light-blue px-1 py-14'>
									Edit
								</LinkButton>
							</div>
						);
					}
				})}
			</div>
		</>
	);
}
