// Packages
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Config
import { API_DOMAIN, BASE } from '../../config';
// Components
import Button from '../../components/Button';
import { Link as LPLink } from '../../components/Link';
import LinkButton from '../../components/LinkButton';
import MessageModal from '../../components/MessageModal';
import TextArea from '../../components/form/TextArea';
import TextInput from '../../components/form/TextInput';

export default function ServiceProviderProfile({ loggedIn }) {
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [provider, setProvider] = useState({});
	const [content, setContent] = useState([]);
	const navigate = useNavigate();
	const { providerId } = useParams();
	const farnaz = providerId == 1;

	useEffect(() => {
		getProvider();
		getContent();
	}, []);

	function getProvider() {
		const data = new FormData();
		data.append('action', 'getProvider');
		data.append('id', providerId);

		fetch(`${API_DOMAIN}/user/service-provider-profile.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					const tempExp = {
						image: response.file_name,
						firstName: response.first_name,
						type: response.type,
						keywords: response.keywords,
						description: response.description
					};
					setProvider(tempExp);
					document.title = `${tempExp.firstName}'s Profile`;
				} else {
					setError(`Error retrieving provider information: ${response.error}`);
				}
			})
			.catch(error => console.error(error));
	}

	function getContent() {
		const data = new FormData();
		data.append('action', 'getContent');
		data.append('id', providerId);

		fetch(`${API_DOMAIN}/user/service-provider-profile.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setContent(response.content);
				} else {
					setError(`Error retrieving provider content: ${response.error}`);
				}
			})
			.catch(error => console.error(error));
	}

	return (
		<>
			{error && (
				<MessageModal type='error' onClose={() => navigate('/service-directory')}>
					{error}
				</MessageModal>
			)}
			{success && (
				<MessageModal type='success' onClose={() => setSuccess('')}>
					{success}
				</MessageModal>
			)}

			<LPLink type='link' to='/service-directory' className='mx-auto my-4 block w-fit text-2xl'>
				Back to Directory
			</LPLink>

			<div className='mb-64 mt-10'>
				<div className='mx-auto px-4 lg:flex lg:justify-center'>
					{/* Image */}
					<section className='relative mx-auto w-full max-w-md lg:h-fit lg:w-fit'>
						<img
							src={`${API_DOMAIN}/?a=loadFile&params={"file":"${provider.image}","type":"profile"}`}
							alt={`${provider.firstName}'s image`}
							className='rounded-3xl border-2 shadow-2xl'
						/>
						<a
							href='https://www.national-lis-awards.co.uk/winners'
							target='_blank'
							className='absolute -bottom-20 -right-8 block h-36 w-36'>
							<img src={`${BASE}images/expert-badge-navy.png`} alt='Service Provider Badge' />
						</a>
					</section>

					{/* Information Section */}
					<section className='mx-auto mt-28 w-full max-w-xl rounded-2xl bg-gray-200 p-4 shadow-2xl lg:m-8'>
						<h1 className='font-lp-title-bold text-4xl text-lp-navy'>{provider.firstName}</h1>
						<h2 className='mt-4 font-bold'>Type:</h2>
						<p>{provider.type}</p>
						<h2 className='mt-4 font-bold'>About:</h2>
						<p>{provider.description}</p>
						<h2 className='mt-4 font-bold'>Keywords:</h2>
						<p>{provider.keywords}</p>
					</section>
				</div>

				{/* Farnaz's Podcast Section */}
				{farnaz && (
					<section className='mx-auto mt-24 w-3/4'>
						<h2 className='mb-5 text-center text-3xl font-bold text-lp-navy'>Host of all podcasts</h2>
						<iframe
							src='https://www.buzzsprout.com/1476448?client_source=large_player&iframe=true&referrer=https%3A%2F%2Fwww.buzzsprout.com%2F1476448%2Fpodcast%2Fembed'
							loading='lazy'
							width='100%'
							height='375'
							title='London Property - Home of Super Prime'></iframe>
					</section>
				)}

				{/* User content */}
				{!farnaz && content.length > 0 && (
					<section className='mt-32'>
						<h2 className='mb-4 text-center text-2xl'>Media Content:</h2>
						{content.map(contentItem => {
							// TODO: unify returns
							if (contentItem.type === 'video') {
								return (
									<div className='mx-auto mb-5 flex max-w-[34rem] flex-col items-center rounded border border-gray-300 p-3'>
										<iframe
											src={contentItem.link}
											title={contentItem.title}
											loading='lazy'
											allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
											allowFullScreen
											className='h-72 w-full max-w-[32rem] border-none'
										/>
										{/* <div className='px-5'> */}
										<h2 className='my-4 font-bold'>{contentItem.title}</h2>
										{/* <div className='my-2'>{contentItem.desc}</div> */}
										{/* </div> */}
									</div>
								);
							}
							if (contentItem.type === 'podcast') {
								return (
									<div className='mx-auto mb-5 flex max-w-6xl flex-col items-center rounded border border-gray-300 p-3'>
										<iframe
											src={contentItem.link}
											title={contentItem.title}
											loading='lazy'
											className='h-52 w-full overflow-hidden border-none'
										/>
										{/* <div className='px-5'> */}
										<h2 className='my-4 font-bold'>{contentItem.title}</h2>
										{/* <div className='my-2'>{contentItem.desc}</div> */}
										{/* </div> */}
									</div>
								);
							}
						})}
					</section>
				)}
			</div>
		</>
	);
}
