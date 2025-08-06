// Packages
import { twMerge } from 'tailwind-merge';

/**
 * LP-themed button component.
 *
 * Mandatory props: onClick, children
 */
export default function Button({ onClick, children, type = 'button', style = 'default', className = '' }) {
	if (style === 'default') {
		return (
			<button
				className={twMerge(
					`rounded-pill bg-lp-navy px-4 py-1 text-xl text-white
					transition hover:scale-105 hover:bg-lp-copper`,
					className
				)}
				type={type}
				onClick={onClick}>
				{children}
			</button>
		);
	}

	if (style === 'critical') {
		return (
			<button
				className={twMerge(
					`rounded-pill bg-red-500 px-4 py-1 text-xl text-white 
					transition hover:scale-105 hover:bg-red-200 hover:text-red-700`,
					className
				)}
				type={type}
				onClick={onClick}>
				{children}
			</button>
		);
	}
}
