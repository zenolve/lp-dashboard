// Packages
import { twMerge } from 'tailwind-merge';

/**
 * LP-themed select and corresponding label component.
 * The children should be option tags with value attributes.
 *
 * Mandatory props: id, value, onChange, children
 */
export default function Select({ label, id, value, onChange, children, className = '' }) {
	return (
		<>
			{label && <label htmlFor={id}>{label}</label>}
			<select
				className={twMerge('my-5 block w-full rounded-xl border border-gray-300 bg-white p-3', className)}
				name={id}
				id={id}
				value={value}
				onChange={onChange}>
				{children}
			</select>
		</>
	);
}
