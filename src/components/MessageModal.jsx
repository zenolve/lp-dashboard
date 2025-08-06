// Packages
import { twMerge } from 'tailwind-merge';
// Components
import Button from './Button';

/**
 * Displays a message in a modal, with an okay button to dismiss it.
 * Has 3 styles: 'default' (white), 'success' (green), 'error' (red).
 *
 * Mandatory props: onClose, children
 */
export default function MessageModal({ onClose, children, type = 'default' }) {
	let style = '';
	if (type === 'default') {
		style = 'bg-white';
	} else if (type === 'success') {
		style = 'bg-green-100 text-green-600';
	} else if (type === 'error') {
		style = 'bg-red-100 text-red-600';
	}

	return (
		<>
			<div className='fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm'>
				<div className={twMerge('max-w-[95%] rounded-2xl p-10 shadow-2xl', style)}>
					<p className='my-5 text-center text-2xl'>{children}</p>
					<Button className='mx-auto block' onClick={onClose}>
						Okay
					</Button>
				</div>
			</div>
		</>
	);
}
