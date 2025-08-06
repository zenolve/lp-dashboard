// Packages
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Icons
import { AiOutlineHome, AiOutlineMenuUnfold } from 'react-icons/ai';
import { GoCalendar } from 'react-icons/go';
import { HiOutlineClipboardDocumentList, HiOutlineInboxStack, HiOutlineUsers } from 'react-icons/hi2';
import { MdOutlinePermMedia } from 'react-icons/md';
import { SlBriefcase } from 'react-icons/sl';
// Components
import { Link as LPLink } from './Link';

export default function Sidebar({ isAdmin }) {
	const [isNavVisible, setIsNavVisible] = useState(false);

	function SidebarLink({ to, Icon, children }) {
		return (
			<Link
				to={to}
				onClick={() => setIsNavVisible(false)}
				className={`mx-auto my-2 flex w-3/5 rounded-xl border border-gray-400 p-3 
					transition hover:scale-105 hover:cursor-pointer hover:bg-lp-light-blue
					sm:mx-2 sm:w-[92%]`}>
				<Icon className='h-8 w-8' />
				<span className='my-auto ml-3 h-fit'>{children}</span>
			</Link>
		);
	}

	useEffect(() => {
		function handleResize() {
			const isLgScreen = window.innerWidth >= 1024; // 1024px -> tailwind lg breakpoint
			setIsNavVisible(isLgScreen);
		}
		// Add event listener for window resize
		window.addEventListener('resize', handleResize);
		// Initial check on component mount
		handleResize();
		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<>
			<div className='w-full bg-gray-100 sm:w-fit lg:hidden'>
				<AiOutlineMenuUnfold onClick={() => setIsNavVisible(!isNavVisible)} className='h-8 w-8' />
			</div>
			<nav className={`h-fit w-full flex-col bg-gray-100 sm:w-56 ${isNavVisible ? 'flex' : 'hidden'} lg:flex`}>
				{isAdmin ? (
					// Admin options
					<>
						<SidebarLink to='/admin' Icon={AiOutlineHome}>
							Admin Home
						</SidebarLink>
						<SidebarLink to='/admin/invite-members' Icon={HiOutlineUsers}>
							Invite Members
						</SidebarLink>
						<SidebarLink to='/admin/manage-content' Icon={MdOutlinePermMedia}>
							Content
						</SidebarLink>
						<SidebarLink to='/admin/manage-events' Icon={GoCalendar}>
							Events
						</SidebarLink>
						<SidebarLink to='/admin/manage-requirements' Icon={HiOutlineClipboardDocumentList}>
							Requirements
						</SidebarLink>
						<SidebarLink to='/admin/manage-services' Icon={SlBriefcase}>
							Services
						</SidebarLink>
						<SidebarLink to='/admin/manage-messages' Icon={HiOutlineInboxStack}>
							Messages
						</SidebarLink>
					</>
				) : (
					// User options
					<>
						<SidebarLink to='/' Icon={AiOutlineHome}>
							Home
						</SidebarLink>
						<SidebarLink to='/messages' Icon={HiOutlineInboxStack}>
							Messages
						</SidebarLink>
						<SidebarLink to='/events' Icon={GoCalendar}>
							Events
						</SidebarLink>
						<SidebarLink to='/content-library' Icon={MdOutlinePermMedia}>
							Content Library
						</SidebarLink>
						<SidebarLink to='/requirements' Icon={HiOutlineClipboardDocumentList}>
							Requirements
						</SidebarLink>
						<SidebarLink to='/services' Icon={SlBriefcase}>
							Services
						</SidebarLink>
						<hr className='my-3' />
						<LPLink type='link' to='service-directory' className='mx-auto mb-4'>
							Browse All Services
						</LPLink>
					</>
				)}
			</nav>
		</>
	);
}
