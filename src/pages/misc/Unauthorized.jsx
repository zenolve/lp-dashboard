// Packages
import { useEffect } from 'react';
// Components
import { Link as LPLink } from '../../components/Link';

/**
 * Unauthorized page intended to be displayed if the user is trying to access an admin page.
 */
export default function Unauthorized() {
	useEffect(() => {
		document.title = 'Unauthorised';
	}, []);

	return (
		<>
			<h1 className='mt-16 text-center font-lp-title-bold text-6xl'>Unauthorised</h1>
			<p className='mt-6 text-center text-xl'>
				<LPLink type='link' to='/login'>
					Log in
				</LPLink>{' '}
				as an administrator
			</p>
		</>
	);
}
