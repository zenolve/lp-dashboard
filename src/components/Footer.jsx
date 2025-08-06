// Packages
import { Link } from 'react-router-dom';

/**
 * Footer containing a copyright notice, a link to the terms and conditions,
 * a link to the privacy policy, a mailto link to ask@londonproperty.co.uk
 * and a link to the about us page
 */
export default function Footer() {
	return (
		<footer className='absolute bottom-0 w-full bg-gray-200 p-4'>
			<div
				className='mx-auto grid w-fit grid-cols-1 
					sm:w-full sm:grid-cols-2 sm:justify-items-center lg:max-w-5xl'>
				<div className='mb-5 flex h-32 flex-col justify-between'>
					<Link to='/terms-and-conditions'>Terms and Conditions</Link>
					<Link to='/privacy-policy'>Privacy Policy</Link>
					<Link to='/service-provider-agreement'>Service Provider Agreement</Link>
					<Link to='/diversity-statement'>Diversity Statement</Link>
				</div>
				<div className='mb-5 flex h-32 flex-col justify-between'>
					<a href='mailto:info@londonproperty.co.uk'>Email Us</a>
					<a href='https://londonproperty.co.uk/en/about-us' target='_blank'>
						About Us
					</a>
					<a href='https://londonproperty.co.uk/en/our-newsletter' target='_blank'>
						Our Newsletter
					</a>
				</div>
			</div>
			<span className='mx-auto block w-fit'>&#169; 2024 London Property</span>
		</footer>
	);
}
