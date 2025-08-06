// Packages
import { twMerge } from 'tailwind-merge';

/**
 * LP-themed date input and corresponding label component.
 *
 * Mandatory props: id, value, onChange
 */
export default function DateInput({ label, id, value, onChange, className = '' }) {
	return (
		<>
			{label && <label htmlFor={id}>{label}</label>}
			<input
				className={twMerge('my-4 w-full rounded-xl border border-gray-300 p-3', className)}
				type='date'
				id={id}
				name={id}
				value={value}
				onChange={onChange}
			/>
		</>
	);
}
