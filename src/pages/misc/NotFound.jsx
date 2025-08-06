// Packages
import { useEffect } from 'react';
// Components
import { Link as LPLink } from '../../components/Link';

/**
 * Not found page intended to be displayed for invalid routes.
 */
export default function NotFound() {
	useEffect(() => {
		document.title = 'Page Not Found';
	}, []);

	return (
		<>
			<h1 className='mt-16 text-center text-6xl'>Page Not Found!</h1>
			<LPLink className='mt-5 block text-center text-2xl' type='link' to='/'>
				Back to home page
			</LPLink>
		</>
	);
}
