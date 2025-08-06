// Packages
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

/**
 * Mandatory props: type, to, children
 *
 * Type can be: "a" or "link"
 */
export default function LinkButton({ type, to, children, target = '_self', className = '' }) {
	if (type === 'link') {
		return (
			<Link
				to={to}
				target={target}
				className={twMerge(
					`rounded-pill bg-lp-navy px-4 py-1 text-xl text-white
					transition hover:scale-105 hover:bg-lp-copper`,
					className
				)}>
				{children}
			</Link>
		);
	}

	if (type === 'a') {
		return (
			<a
				href={to}
				target={target}
				className={twMerge(
					`rounded-pill bg-lp-navy px-4 py-1 text-xl text-white
					transition hover:scale-105 hover:bg-lp-copper`,
					className
				)}>
				{children}
			</a>
		);
	}
}
