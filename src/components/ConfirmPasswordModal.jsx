// Components
import { useState } from 'react';
import Button from './Button';

/**
 * Confirmation Modal with confirm and cancel buttons.
 *
 * Mandatory props: onCancel, onConfirm, children
 */
export default function ConfirmPasswordModal({ onCancel, onConfirm, children, setPassword }) {
	const [inputPassword, setInputPassword] = useState('');
	return (
		<>
			{children && (
				<div
					className='fixed inset-0 z-10 flex items-center justify-center
                  bg-black bg-opacity-20 backdrop-blur-sm'>
					<div className='relative max-w-[50%] rounded-2xl bg-white p-5 shadow-2xl'>
						<p className='mb-2 text-center text-xl'>{children}</p>
						<input
							className='m relative m-4 max-w-[100%] items-center rounded-2xl bg-white p-5 shadow-2xl'
							type='password'
							placeholder='Type Password'
							id='modalPassword'
							value={inputPassword}
							onChange={e => {
								setInputPassword(e.target.value);
								setPassword(e.target.value); // Update the parent's password state
							}}
						/>
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
