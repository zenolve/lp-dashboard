// Packages
import { useEffect, useState } from 'react';
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineMail, AiOutlineYoutube } from 'react-icons/ai';
import { FaXTwitter } from 'react-icons/fa6';
// Components
import MessageModal from '../../components/MessageModal';

export function Home() {
	const [error, setError] = useState('');

	useEffect(() => {
		document.title = 'Welcome';
	}, []);

	return (
		<>
			{error && (
				<MessageModal type='error' onClose={() => setError('')}>
					{error}
				</MessageModal>
			)}

			<div className='mb-32 mt-4'>
				<h1 className='text-center font-lp-title-regular text-4xl'>Welcome to your Dashboard</h1>
				<div className='mx-auto mt-8 flex h-96 max-w-2xl flex-col items-center justify-center'>
					<h2 className='mb-2 text-2xl'>About us:</h2>
					<iframe
						src='https://www.youtube.com/embed/NTZxid4tpAM'
						title='Dashboard Guide'
						frameborder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						allowfullscreen
						className='h-full w-full max-w-[38rem]'
					/>
				</div>

				<hr className='mx-auto my-10 w-11/12' />

				<h2 className='mb-6 text-center text-2xl'>Contact us:</h2>
				<div className='mx-auto grid max-w-6xl grid-cols-3 gap-4 md:gap-8'>
					<a href='https://www.instagram.com/londonproperty.co.uk_' target='_blank' className='md:ml-20'>
						<AiOutlineInstagram className='mr-1 inline h-10 w-10' />
						Instagram
					</a>
					<a href='https://twitter.com/londonp42594791' target='_blank' className='md:ml-20'>
						<FaXTwitter className='mr-1 inline h-10 w-10' />
						Twitter / X
					</a>
					<a href='https://www.facebook.com/lonndonproperty.co.uk' target='_blank' className='md:ml-20'>
						<AiOutlineFacebook className='mr-1 inline h-10 w-10' />
						Facebook
					</a>
					<a href='https://www.youtube.com/@London_Property?sub_confirmation=1' target='_blank' className='md:ml-20'>
						<AiOutlineYoutube className='mr-1 inline h-10 w-10' />
						Youtube
					</a>
					<a
						href='https://www.linkedin.com/company/london-property-home-of-super-prime'
						target='_blank'
						className='md:ml-20'>
						<AiOutlineLinkedin className='mr-1 inline h-10 w-10' />
						LinkedIn
					</a>
					<a href='mailto:info@londonproperty.co.uk' target='_blank' className='md:ml-20'>
						<AiOutlineMail className='mr-1 inline h-10 w-10' />
						Email
					</a>
				</div>
			</div>
		</>
	);
}
