// Packages
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
// Config
import { API_DOMAIN, BASE } from './config';
// Components
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
// Global Pages
import LoginRegister from './pages/LoginRegister';
import RequestPasswordReset from './pages/RequestPasswordReset';
import ResendVerification from './pages/ResendVerification';
import ResetPassword from './pages/ResetPassword';
import VerifyAccount from './pages/VerifyAccount';
// Admin Pages
import AddContent from './pages/admin/AddContent';
import AddEvent from './pages/admin/AddEvent';
import AddMessage from './pages/admin/AddMessage';
import EditContent from './pages/admin/EditContent';
import EditEvent from './pages/admin/EditEvent';
import EditMessage from './pages/admin/EditMessage';
import { EditRequirement as AdminEditRequirement } from './pages/admin/EditRequirement';
import { EditService as AdminEditService } from './pages/admin/EditService';
import { Home as AdminHome } from './pages/admin/Home';
import InviteMembers from './pages/admin/InviteMembers';
import ManageContent from './pages/admin/ManageContent';
import ManageEvents from './pages/admin/ManageEvents';
import ManageLeads from './pages/admin/ManageLeads';
import ManageMessages from './pages/admin/ManageMessages';
import ManageRequirements from './pages/admin/ManageRequirements';
import ManageServices from './pages/admin/ManageServices';
// Main User Pages
import ContentLibrary from './pages/user/ContentLibrary';
import EditRequirement from './pages/user/EditRequirement';
import { EditService as UserEditService } from './pages/user/EditService';
import Events from './pages/user/Events';
import { Home as UserHome } from './pages/user/Home';
import ListService from './pages/user/ListService';
import Messages from './pages/user/Messages';
import PostRequirement from './pages/user/PostRequirement';
import Requirements from './pages/user/Requirements';
import Services from './pages/user/Services';
// Minor User Pages
import DiversityStatement from './pages/legal/DiversityStatement';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import ServiceProviderAgreement from './pages/legal/ServiceProviderAgreement';
import TermsAndConditions from './pages/legal/TermsAndConditions';
import Profile from './pages/user/Profile';
import ServiceDirectory from './pages/user/ServiceDirectory';
import ServiceProviderProfile from './pages/user/ServiceProviderProfile';
// Misc Pages
import NotFound from './pages/misc/NotFound';
import Unauthorized from './pages/misc/Unauthorized';

/**
 * Holds all the routes of the dashboard.
 * Includes protected routes pages that can only be accessed if the user is
 * logged in / not logged in / logged in as admin.
 * Invalid URLs will be redirected to a not found page.
 */
export default function DashboardRoutes() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		if (loggedIn) {
			checkAdmin();
		}
	}, [loggedIn]);

	function checkLogin() {
		fetch(`${API_DOMAIN}/check-login.php`, { credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				setLoggedIn(response.loggedIn);
			})
			.catch(error => console.error(error));
	}

	function checkAdmin() {
		fetch(`${API_DOMAIN}/check-admin.php`, { credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				setIsAdmin(response.isAdmin);
			})
			.catch(error => console.error(error));
	}

	/**
	 * Routes that can only be accessed if the user is logged in
	 */
	function LoginRoutes() {
		useEffect(() => {
			checkLogin();
		}, []);
		return loggedIn ? <Outlet /> : <Navigate to='/login' />;
	}

	/**
	 * Routes that can only be accessed if the user is not logged in
	 */
	function LogoutRoutes() {
		useEffect(() => {
			checkLogin();
		}, []);
		return loggedIn ? <Navigate to='/' /> : <Outlet />;
	}

	/**
	 * Routes that can only be accessed by the admin account
	 */
	function AdminRoutes() {
		useEffect(() => {
			checkAdmin();
		}, []);
		return isAdmin ? <Outlet /> : <Unauthorized />;
	}

	return (
		<BrowserRouter basename={BASE}>
			<NavBar isAdmin={isAdmin} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
			<div className='sm:flex'>
				{loggedIn && <Sidebar isAdmin={isAdmin} />}
				<main className='sm:flex-1'>
					<Routes>
						<Route element={<LogoutRoutes />}>
							<Route path='/login' element={<LoginRegister setLoggedIn={setLoggedIn} />} />
							<Route path='/request-password-reset' element={<RequestPasswordReset />} />
							<Route path='/reset-password' element={<ResetPassword />} />
							<Route path='/verify-account' element={<VerifyAccount />} />
							<Route path='/resend-verification' element={<ResendVerification />} />
						</Route>
						<Route element={<LoginRoutes />}>
							<Route path='/' element={<UserHome />} />
							<Route path='/profile' element={<Profile />} />
							<Route path='/messages' element={<Messages />} />
							<Route path='/events' element={<Events />} />
							<Route path='/content-library' element={<ContentLibrary />} />
							<Route path='/requirements' element={<Requirements />} />
							<Route path='/post-requirement' element={<PostRequirement />} />
							<Route path='/edit-requirement/:requirementId' element={<EditRequirement />} />
							<Route path='/services' element={<Services />} />
							<Route path='/list-service' element={<ListService />} />
							<Route path='/edit-service/:serviceId' element={<UserEditService />} />
						</Route>
						<Route path='/admin' element={<AdminRoutes />}>
							{/* <Route path='' element={<AdminHome />} /> */}
							<Route path='' element={<UserHome />} />
							<Route path='invite-members' element={<InviteMembers />} />
							<Route path='manage-services' element={<ManageServices />} />
							<Route path='edit-service/:serviceId' element={<AdminEditService />} />
							<Route path='edit-requirement/:requirementId' element={<AdminEditRequirement />} />
							<Route path='manage-requirements' element={<ManageRequirements />} />
							<Route path='manage-content' element={<ManageContent />} />
							<Route path='add-content/:userId?' element={<AddContent />} />
							<Route path='edit-content/:contentId' element={<EditContent />} />
							<Route path='manage-events' element={<ManageEvents />} />
							<Route path='add-event' element={<AddEvent />} />
							<Route path='edit-event/:eventId' element={<EditEvent />} />
							<Route path='manage-messages' element={<ManageMessages />} />
							<Route path='add-message' element={<AddMessage />} />
							<Route path='edit-message/:messageId' element={<EditMessage />} />
							<Route path='manage-leads' element={<ManageLeads />} />
						</Route>
						<Route path='/diversity-statement' element={<DiversityStatement />} />
						<Route path='/service-provider-profile/:providerId' element={<ServiceProviderProfile />} />
						<Route path='/service-directory' element={<ServiceDirectory />} />
						<Route path='/privacy-policy' element={<PrivacyPolicy />} />
						<Route path='/terms-and-conditions' element={<TermsAndConditions />} />
						<Route path='/service-provider-agreement' element={<ServiceProviderAgreement />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</main>
			</div>
			<Footer />
		</BrowserRouter>
	);
}
