// Packages
import { useLocation } from 'react-router-dom';

/**
 * @returns the root domain of the website without the without current route
 */
export default function useWebsiteDomain() {
	const location = useLocation();
	const currentRoute = location.pathname;
	const currentUrl = window.location.href;
	const domain = currentUrl.replace(currentRoute, '');

	return domain;
}
