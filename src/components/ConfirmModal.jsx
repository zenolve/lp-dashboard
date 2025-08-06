// Components
import Button from './Button';

/**
 * Confirmation Modal with confirm and cancel buttons.
 *
 * Mandatory props: onCancel, onConfirm, children
 */
export default function ConfirmModal({ onCancel, onConfirm, children }) {
	return (
		<>
			{children && (
				<div
					className='fixed inset-0 z-10 flex items-center justify-center
                        bg-black bg-opacity-20 backdrop-blur-sm'>
					<div className='relative max-w-[50%] rounded-2xl bg-white p-8 shadow-2xl'>
						<p className='mb-5 text-center text-xl'>{children}</p>
						<div className='flex justify-evenly'>
							<Button onClick={onConfirm}>Confirm</Button>
							<Button onClick={onCancel}>Cancel</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
