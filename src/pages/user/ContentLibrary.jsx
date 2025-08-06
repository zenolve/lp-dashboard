// Packages
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_DOMAIN } from '../../config';
import expertCategories from '../../data/expertCategories.json';
// Components
import MessageModal from '../../components/MessageModal';
import Select from '../../components/form/Select';

export default function ContentLibrary() {
	const [content, setContent] = useState([]);
	const [category, setCategory] = useState(expertCategories[0].name);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Content Library';
	}, []);

	useEffect(() => {
		getContent(category);
	}, [category]);

	function getContent(category) {
		const data = new FormData();
		data.append('category', category);
		fetch(`${API_DOMAIN}/user/content.php`, { method: 'POST', body: data, credentials: 'include' })
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
				<div className='mx-auto w-fit'>
					<Select id='category' value={category} onChange={e => setCategory(e.target.value)}>
						{expertCategories.map(category => (
							<option key={category.id} value={category.name}>
								{category.name}
							</option>
						))}
					</Select>
				</div>
				{content.length === 0 && <h2 className='mt-6 text-center text-3xl'>No content to be displayed</h2>}
				{content.map(contentItem => {
					// TODO: unify returns
					if (contentItem.type === 'video') {
						return (
							<div className='mx-auto mb-5 flex w-4/5 flex-col rounded border border-gray-300 p-3 md:flex-row'>
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
									<h2 className='my-4 font-bold'>{contentItem.title}</h2>
									<p>
										{contentItem.description.length > 250
											? contentItem.description.slice(0, 250) + '...'
											: contentItem.description}
									</p>
									<div className='my-2'>{contentItem.desc}</div>
								</div>
							</div>
						);
					}
					if (contentItem.type === 'podcast') {
						return (
							<div className='mx-auto mb-5 flex w-4/5 flex-col rounded border border-gray-300 p-3 md:flex-row'>
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
							</div>
						);
					}
				})}
			</div>
		</>
	);
}
