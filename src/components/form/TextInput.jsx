// Packages
import { twMerge } from 'tailwind-merge';

/**
 * LP-themed text input and corresponding label component.
 *
 * Mandatory props: id, value, onChange
 */
export default function TextInput({ label, id, value, onChange, placeholder, type = 'text', className = '' }) {
	return (
		<>
			{label && <label htmlFor={id}>{label}</label>}
			<input
				className={twMerge('my-4 w-full rounded-xl border border-gray-300 p-3', className)}
				id={id}
				name={id}
				type={type}
				placeholder={placeholder ? placeholder : label}
				value={value}
				onChange={onChange}
			/>
		</>
	);
}
