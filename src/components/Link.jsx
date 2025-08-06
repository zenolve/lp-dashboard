// Packages
import { Link as RouterLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

/**
 * LP-themed Link component.
 *
 * Mandatory props: type, to, children
 *
 * Type can be: "a" or "link"
 */
export function Link({ type, to, children, target = '_self', className = '' }) {
	if (type === 'link') {
		return (
			<RouterLink
				to={to}
				target={target}
				className={twMerge('text-lp-navy transition hover:text-lp-copper hover:underline', className)}>
				{children}
			</RouterLink>
		);
	}

	if (type === 'a') {
		return (
			<a
				href={to}
				target={target}
				className={twMerge('text-lp-navy transition hover:text-lp-copper hover:underline', className)}>
				{children}
			</a>
		);
	}
}
