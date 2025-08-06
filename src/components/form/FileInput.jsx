/**
 * LP-themed file input and corresponding label component.
 *
 * Mandatory props: id, value, onChange
 */
export default function FileInput({ label, id, value, onChange, multiple = false }) {
	return (
		<>
			{label && <label htmlFor={id}>{label}</label>}
			<input
				type='file'
				name={id}
				id={id}
				value={value}
				onChange={onChange}
				multiple={multiple}
				className='my-5 ml-5 block'
			/>
		</>
	);
}
