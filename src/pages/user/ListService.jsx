// Packages
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_DOMAIN } from '../../config';
import useWebsiteDomain from '../../hooks/useWebsiteDomain';
// Data
import expertCategories from '../../data/expertCategories.json';
// Components
import Button from '../../components/Button';
import ConfirmModal from '../../components/ConfirmModal';
import { Link as LPLink } from '../../components/Link';
import MessageModal from '../../components/MessageModal';
import CheckBox from '../../components/form/CheckBox';
import Select from '../../components/form/Select';
import TextArea from '../../components/form/TextArea';
import TextInput from '../../components/form/TextInput';

export default function ListService() {
	const navigate = useNavigate();
	const domain = useWebsiteDomain();

	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [confirmMessage, setConfirmMessage] = useState('');
	const [confirmAction, setConfirmAction] = useState(() => () => {});
	const [inputs, setInputs] = useState({
		name: expertCategories[0].name,
		desc: '',
		keywords: '',
		termsChecked: false
		// newsletter: false,
	});

	useEffect(() => {
		document.title = 'List a Service';
	}, []);

	function validate() {
		const descValid = inputs.desc ? true : false;
		const keywordsValid = inputs.keywords ? true : false;
		return descValid && keywordsValid;
	}

	function confirmList() {
		if (!validate()) {
			setError('You must fill out all fields.');
			return;
		}
		if (!inputs.termsChecked) {
			setError('You must agree to the terms and conditions to proceed.');
			return;
		}

		setConfirmAction(() => () => {
			list();
			setConfirmMessage('');
		});
		setConfirmMessage('Are you sure you want to list this service?');
	}

	function list() {
		const data = new FormData();
		data.append('action', 'list');
		data.append('name', inputs.name);
		data.append('desc', inputs.desc);
		data.append('keywords', inputs.keywords);
		data.append('termsChecked', inputs.termsChecked);
		data.append('domain', domain);
		// data.append('newsOptIn', inputs.newsletter);

		fetch(`${API_DOMAIN}/user/services.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess("You've successfully listed a service");
				} else {
					setError(`Error listing service: ${response.error}`);
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
				<MessageModal type='success' onClose={() => navigate('/services')}>
					{success}
				</MessageModal>
			)}
			{confirmMessage && (
				<ConfirmModal onConfirm={confirmAction} onCancel={() => setConfirmMessage('')}>
					{confirmMessage}
				</ConfirmModal>
			)}

			<form
				className='mx-4 my-10 rounded-3xl bg-lp-cream-white p-4 shadow-2xl 
					sm:mx-auto sm:w-[40rem] sm:p-8'>
				<h1 className='my-6 text-center font-lp-title-regular text-4xl text-lp-navy'>List a Service</h1>

				{/* Mandatory Section */}
				{/* <input type="file" accept=".png,.jpg,.jpeg" ref={imgInputRef} className='hidden'
                        onChange={({ target: { files } }) => {
                            files && setInputs({ ...inputs, image: files[0], imgURL: URL.createObjectURL(files[0]) });
                        }} />
                    <div className="w-52 h-52 mx-auto flex items-center mb-5"
                        onClick={() => imgInputRef.current.click()}>
                        {inputs.imgURL
                            ? <img className="max-w-full max-h-full mx-auto border-2 border-solid rounded-xl hover:cursor-pointer"
                                src={inputs.imgURL} alt='Profile Image' />
                            : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                className="w-full h-full fill-gray-500 hover:cursor-pointer">
                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                            </svg>}
                    </div> */}
				{/* <TextInput id='firstName' label='First Name' value={inputs.firstName}
                        onChange={e => setInputs({ ...inputs, firstName: e.target.value })} />
                    <TextInput id='lastName' label='Last Name' value={inputs.lastName}
                        onChange={e => setInputs({ ...inputs, lastName: e.target.value })} />
                    <TextInput type="tel" id='phoneNumber' label='Phone Number' value={inputs.phoneNum}
                        onChange={e => setInputs({ ...inputs, phoneNum: e.target.value })} /> */}

				<Select
					id='service'
					label='Service Type'
					value={inputs.name}
					onChange={e => setInputs({ ...inputs, name: e.target.value })}>
					{expertCategories.map(category => (
						<option key={category.id} value={category.name}>
							{category.name}
						</option>
					))}
				</Select>
				<TextInput
					id='keywords'
					label='Keywords'
					value={inputs.keywords}
					onChange={e => setInputs({ ...inputs, keywords: e.target.value })}
				/>
				<TextArea
					placeholder='A description of the service you are listing'
					id='desc'
					label='Description'
					value={inputs.desc}
					onChange={e => setInputs({ ...inputs, desc: e.target.value })}
				/>

				{/* Optional Section */}
				{/* <h2 className="font-lp-title-regular text-lp-navy text-2xl text-center my-4">Optional Information</h2>
                    <TextInput id='experience' label='Years of Experience' value={inputs.experience}
                        onChange={e => setInputs({ ...inputs, experience: e.target.value })} />
                    <TextInput id='languages' label='Spoken languages' value={inputs.languages}
                        onChange={e => setInputs({ ...inputs, languages: e.target.value })} />
                    <TextArea placeholder="A longer description of you"
                        id="longBlurb" label='Long Blurb' value={inputs.longBlurb}
                        onChange={e => setInputs({ ...inputs, longBlurb: e.target.value })} />
                    <TextInput id='supportingMaterial' label='Supporting Material (Websites and other online resources)' value={inputs.supportingMaterial}
                        onChange={e => setInputs({ ...inputs, supportingMaterial: e.target.value })} /> */}

				{/* <CheckBox onChange={e => setInputs({ ...inputs, newsletter: e.target.checked })}
                    id='newsletter' checked={inputs.newsletter}>Subscribe to our Newsletter</CheckBox> */}

				<br />
				<CheckBox
					id='terms'
					checked={inputs.termsChecked}
					onChange={e => setInputs({ ...inputs, termsChecked: e.target.checked })}>
					By checking this option, you agree to our&nbsp;
					<LPLink type='link' to='/terms-and-conditions'>
						Terms and Conditions
					</LPLink>
					&nbsp;and to our&nbsp;
					<LPLink type='link' to='/expert-agreement'>
						Expert Agreement:
					</LPLink>
				</CheckBox>
				<p className='my-5 text-lp-navy'>
					Experts who work with London Property will pay a commission to London Property in a sum equal to 10% of all
					and any revenue received by the Expert from customers who have been referred to the Expert by London
					Property during the first year of their working with the Expert. The first year period shall be calculated
					from the date the Expert first provides services for the customer. The commission payments due to London
					Property will be made by the Expert within 14 days of their receipt of the requisite payment by the
					customer.
				</p>
				<Button onClick={confirmList} className='mt-5 w-full py-3'>
					List Service
				</Button>
			</form>
		</>
	);
}
