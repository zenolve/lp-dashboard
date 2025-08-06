// Packages
import { twMerge } from 'tailwind-merge';

/**
 * LP-themed radio button and corresponding label component.
 *
 * Mandatory props: name, label, id, value, checked, onChange
 *
 * 'name' prop has to be the same in radio group.
 */
export default function RadioBtn({ name, label, id, value, checked, onChange, className = '' }) {
	return (
		<span>
			<input type='radio' name={name} id={id} value={value} checked={checked} onChange={onChange} />
			<label htmlFor={id} className={twMerge('ml-2', className)}>
				{label}
			</label>
		</span>
	);
}
