// Packages
import { twMerge } from 'tailwind-merge';

/**
 * LP themed form element
 */
export default function Form({ children, className = '' }) {
	return <form className={twMerge('max-w-3xl rounded-2xl bg-gray-200 p-6 shadow-2xl', className)}>{children}</form>;
}
