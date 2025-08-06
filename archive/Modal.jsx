/**
 * Modal component with a close button that can contain anything.
 * If no onClose function is passed, it will be set non-closable.
 */
export default function Modal({
	children, // visible
	onClose
}) {
	return (
		<>
			{children && (
				<div
					className='fixed inset-0 z-10 flex items-center justify-center
                        bg-black bg-opacity-20 backdrop-blur-sm'
					onClick={
						onClose
							? e => {
									if (e.target === e.currentTarget) onClose();
								}
							: null
					}>
					<div className='relative max-w-[50%] rounded-2xl bg-white p-5 shadow-2xl'>
						{children}
						{onClose && (
							// TODO replace with react-icons
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='currentColor'
								className='absolute -right-10 -top-10 fill-gray-500
                                    transition hover:scale-125 hover:cursor-pointer hover:fill-gray-800'
								onClick={onClose}>
								<path
									fillRule='evenodd'
									d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
									clipRule='evenodd'
								/>
							</svg>
						)}
					</div>
				</div>
			)}
		</>
	);
}
