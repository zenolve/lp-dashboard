// Packages
import { twMerge } from 'tailwind-merge';

/**
 * LP-themed textarea and corresponding label component.
 *
 * Mandatory props: id, value, onChange
 */
export default function TextArea({ label, id, value, onChange, placeholder, className = '' }) {
	return (
		<>
			{label && <label htmlFor={id}>{label}</label>}
			<textarea
				className={twMerge('my-4 h-40 w-full rounded-xl border border-gray-300 p-3', className)}
				id={id}
				name={id}
				placeholder={placeholder ? placeholder : label}
				value={value}
				onChange={onChange}
			/>
		</>
	);
}
