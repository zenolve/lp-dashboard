// Packages
import { twMerge } from 'tailwind-merge';

/**
 * Mandatory props: label, id, onChange, children
 */
export default function CheckBox({ id, onChange, children, checked = false, className = '' }) {
	return (
		<>
			<input type='checkbox' name={id} id={id} checked={checked} onChange={onChange} />
			<label htmlFor={id} className={twMerge('ml-3', className)}>
				{children}
			</label>
		</>
	);
}
