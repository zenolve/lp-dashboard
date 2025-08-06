// Packages
import { useEffect, useState } from 'react';
import useWebsiteDomain from '../hooks/useWebsiteDomain';
// Config
import { API_DOMAIN } from '../config';
// Components
import Button from '../components/Button';
import { Link as LPLink } from '../components/Link';
import MessageModal from '../components/MessageModal';
import TextInput from '../components/form/TextInput';

function Form({ children }) {
	return (
		<form className='mx-auto mb-10 block h-[32rem] max-w-md rounded-xl bg-gray-200 px-3 shadow-2xl sm:px-7'>
			{children}
		</form>
	);
}

function FormHeading({ children }) {
	return <h1 className='py-5 text-center font-lp-title-bold text-3xl text-lp-navy'>{children}</h1>;
}

/**
 * Login and Register forms on a single page.
 */
export default function LoginRegister({ setLoggedIn }) {
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loginValues, setLoginValues] = useState({ email: '', password: '' });
	const [registerValues, setRegisterValues] = useState({ email: '', password: '', confirmPassword: '' });

	const domain = useWebsiteDomain();

	useEffect(() => {
		document.title = 'Log In / Register';
	}, []);

	function login() {
		if (!loginValues.email || !loginValues.password) {
			setError('You must fill out all login fields');
			return;
		}

		const data = new FormData();
		data.append('a', 'login');
		data.append('params[e]', loginValues.email);
		data.append('params[p]', loginValues.password);
		data.append('domain', domain);

		fetch(`${API_DOMAIN}/index.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setLoggedIn(true);
				} else {
					setError(response.message);
				}
			})
			.catch(error => console.error(error));
	}

	function register() {
		if (!registerValues.email || !registerValues.password || !registerValues.confirmPassword) {
			setError('You must fill out all registration fields');
			return;
		}
		if (registerValues.password !== registerValues.confirmPassword) {
			setError("Passwords don't match");
			return;
		}

		const data = new FormData();
		data.append('a', 'register');
		data.append('params[e]', registerValues.email);
		data.append('params[p]', registerValues.password);
		data.append('domain', domain);

		fetch(`${API_DOMAIN}/index.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess(response.message);
					setRegisterValues({
						email: '',
						password: '',
						confirmPassword: ''
					});
				} else {
					setError(response.message);
				}
			})
			.catch(error => console.error(error));
	}

	return (
		<>
			{error && (
				<MessageModal type='error' onClose={() => setError('')}>
					{error}
				</MessageModal>
			)}
			{success && (
				<MessageModal type='success' onClose={() => setSuccess('')}>
					{success}
				</MessageModal>
			)}

			<section className='mx-auto w-11/12 max-w-7xl'>
				<div className='mt-12 block lg:flex'>
					{/* Login section */}
					<Form>
						<FormHeading>Log In</FormHeading>
						<TextInput
							label='Your email address'
							id='loginEmail'
							value={loginValues.email}
							onChange={e => setLoginValues({ ...loginValues, email: e.target.value })}
						/>
						<TextInput
							label='Your password'
							id='loginPassword'
							type='password'
							value={loginValues.password}
							onChange={e => setLoginValues({ ...loginValues, password: e.target.value })}
						/>
						<LPLink type='link' to='/request-password-reset'>
							Forgot Password?
						</LPLink>
						<Button className='mx-auto mt-4 block' onClick={login}>
							Log In
						</Button>
					</Form>

					{/* Register section */}
					<Form>
						<FormHeading>Register</FormHeading>
						<TextInput
							label='Your email address'
							id='registerEmail'
							value={registerValues.email}
							onChange={e => setRegisterValues({ ...registerValues, email: e.target.value })}
						/>
						<TextInput
							label='Your password'
							id='registerPassword'
							type='password'
							value={registerValues.password}
							onChange={e => setRegisterValues({ ...registerValues, password: e.target.value })}
						/>
						<TextInput
							label='Confirm your password'
							id='registerConfirmPassword'
							type='password'
							value={registerValues.confirmPassword}
							onChange={e => setRegisterValues({ ...registerValues, confirmPassword: e.target.value })}
						/>
						<LPLink type='link' to='/resend-verification'>
							Resend Verification Email
						</LPLink>
						<Button onClick={register} className='mx-auto mt-4 block'>
							Register
						</Button>
					</Form>
				</div>
			</section>

			{/* Information section */}
			<section className='mx-auto my-16 max-w-[500px] px-8 text-gray-500'>
				<h2 className='my-5 text-center font-lp-title-bold text-2xl'>Registration Process</h2>
				<ol className='list-decimal'>
					<li>Provide your email address and a password into the appropriate fields.</li>
					<li>You will be sent an email to the provided address with a confirmation link.</li>
					<li>Click on the link in the email to activate your account.</li>
					<li>
						Once your account is activated, navigate to the&nbsp;
						<LPLink type='link' to='/login'>
							login page
						</LPLink>
						&nbsp;to log in with your account details.
					</li>
					<li>If you did not receive an email with a confirmation link, please check your spam or other folders.</li>
					{/* <div className="text-center font-bold text-xl my-3">Once Logged In</div>
                    <li>If you have been invited as a member, nagivate to the&nbsp;
                        <LPLink type='link' to='/register-member'>member registration page</LPLink>
                        &nbsp;and fill out the form. The form can also be found on the&nbsp;
                        <LPLink type='link' to='/'>home page</LPLink></li>
                    <li>If you have been invited as an expert, nagivate to the&nbsp;
                        <LPLink type='link' to='/list-service'>expert registration page</LPLink>
                        &nbsp;and fill out the form. The form can also be found on the&nbsp;
                        <LPLink type='link' to='/'>home page</LPLink></li> */}
				</ol>
			</section>
		</>
	);
}
