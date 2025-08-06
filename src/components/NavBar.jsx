// Packages
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
// Config
import { API_DOMAIN, BASE } from '../config';
// Icons
import { CgProfile } from 'react-icons/cg';
import { SlOptions } from 'react-icons/sl';
// Components
import MessageModal from './MessageModal';

/**
 * Navbar containing links to the home page, service directory and newsletter page.
 * Has a menu with links to the manage profile page and a logout button.
 */
export default function NavBar({ isAdmin, loggedIn, setLoggedIn }) {
	const [error, setError] = useState('');
	const [name, setName] = useState('');
	const [image, setImage] = useState('');
	const [profileComplete, setProfileComplete] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef(null);
	const menuBtnRef = useRef(null);
	const navigate = useNavigate();

	const menuBtnStyle = 'bg-gray-300 p-2 rounded-pill hover:text-lp-copper hover:scale-105 transition';

	useEffect(() => {
		if (loggedIn) {
			getProfile();
			console.log('logged in');
		} else {
			console.log('logged out');
		}

		// Function to handle clicks outside the menu
		const handleClickOutside = event => {
			if (menuBtnRef.current && menuBtnRef.current.contains(event.target)) {
				return;
			} else if (menuRef.current && !menuRef.current.contains(event.target)) {
				setMenuOpen(false);
			}
		};
		// Add event listener when the component mounts
		document.addEventListener('mousedown', handleClickOutside);
		// Clean up the event listener when the component unmounts
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	function logout() {
		const data = new FormData();
		data.append('a', 'logout');
		fetch(`${API_DOMAIN}/index.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				setMenuOpen(false); // TODO check if this is needed
				if (response.success) {
					setLoggedIn(false);
					navigate('/login');
				} else {
					setError(response.message);
				}
			})
			.catch(error => console.error(error));
	}

	function getProfile() {
		fetch(`${API_DOMAIN}/user/profile.php`, { credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				const data = response.profile;
				setName(`${data.first_name} ${data.last_name}`);
				setImage(data.image ? `${API_DOMAIN}/?a=loadFile&params={"file":"${data.image}","type":"profile"}` : null);
				setProfileComplete(response.complete);
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

			<nav className='flex w-full items-center justify-between bg-gray-100'>
				<a href='https://www.londonproperty.co.uk' className='transition hover:scale-105'>
					<img src={`${BASE}images/lp-banner.png`} className='inline-block w-80 p-4 hover:cursor-pointer' />
				</a>
				<div ref={menuBtnRef}>
					{loggedIn && (
						<SlOptions
							onClick={() => setMenuOpen(!menuOpen)}
							className='m-3 h-10 w-10 transition hover:scale-110 hover:cursor-pointer'
						/>
					)}
				</div>
			</nav>

			{loggedIn && menuOpen && (
				<div
					ref={menuRef}
					className='absolute right-0 top-12 z-10 flex w-72 flex-wrap items-center justify-center rounded-3xl bg-gray-200 p-4 sm:right-20'>
					{!isAdmin && (
						<Link to='/profile' onClick={() => setMenuOpen(false)} className='mb-5 flex w-full flex-wrap'>
							<div className='flex w-full items-center justify-evenly'>
								<span className='transition hover:scale-110 hover:text-lp-copper'>{name}</span>
								<div className='max-h-full max-w-full transition hover:scale-110'>
									{image ? (
										<img src={image} alt='Profile Image' className='ml-5 inline h-20 w-20 rounded-full' />
									) : (
										<CgProfile className='h-20 w-20' />
									)}
								</div>
							</div>
							<span className={twMerge('mt-3 block w-full text-center', menuBtnStyle)}>
								{profileComplete ? 'Manage Profile' : 'Complete Profile'}
							</span>
						</Link>
					)}

					<button onClick={logout} className={twMerge('w-full text-center', menuBtnStyle)}>
						Log Out
					</button>
				</div>
			)}
		</>
	);
}
