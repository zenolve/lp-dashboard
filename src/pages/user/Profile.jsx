// Packages
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebsiteDomain from '../../hooks/useWebsiteDomain';
// Config
import { API_DOMAIN } from '../../config';
// Icons
import { BiImageAdd } from 'react-icons/bi';
// Components
import Button from '../../components/Button';
import ConfirmModal from '../../components/ConfirmModal';
import ConfirmPasswordModal from '../../components/ConfirmPasswordModal';
import MessageModal from '../../components/MessageModal';
import TextInput from '../../components/form/TextInput';
// import TextArea from "../../components/form/TextArea";

export default function Profile() {
	const navigate = useNavigate();
	const domain = useWebsiteDomain();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [confirmMessage, setConfirmMessage] = useState('');
	const [confirmAction, setConfirmAction] = useState(() => () => {});

	// const [isMember, setIsMember] = useState(false);
	// const [isExpert, setIsExpert] = useState(false);
	const [password, setPassword] = useState('');
	const [imgURL, setImgURL] = useState('');
	const [isComplete, setIsComplete] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalText, setModalText] = useState('Enter your password');
	const imgInputRef = useRef(null);
	const [formData, setFormData] = useState({
		image: null,
		firstName: '',
		lastName: '',
		postcode: '',
		street: '',
		// phoneNumber: '',
		houseNum: ''
		// referee: '',
		// aboutYou: '',
		// iRent: false,
		// iOwn: false,
		// iInvest: false,
		// keywords: '',
		// areas: '',
		// shortBlurb: '',
		// longBlurb: '',
		// experience: '',
		// languages: '',
		// supportingMaterials: ''
	});

	useEffect(() => {
		getUser();
		document.title = 'Manage Profile';
	}, []);

	function getUser() {
		fetch(`${API_DOMAIN}/user/profile.php`, { credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					const data = response.profile;
					setIsComplete(response.complete);
					setImgURL(data.image ? `${API_DOMAIN}/?a=loadFile&params={"file":"${data.image}","type":"profile"}` : null);
					setFormData({
						firstName: data.first_name || '',
						lastName: data.last_name || '',
						postcode: data.postcode || '',
						image: data.image || '',
						houseNum: data.house_number || '',
						street: data.street_name || ''
						// abtyou: data.aboutYou || '',
						// chk: [data.iRent, data.iOwn, data.iInvest],
						// expertiseType: data.expertiseType || '',
						// keywords: data.keywords || '',
						// areas: data.areas || '',
						// shortBlurb: data.shortBlurb || '',
						// longBlurb: data.longBlurb || '',
						// experience: data.experience || '',
						// languages: data.languages || '',
						// supportingMaterials: data.supportingMaterials || ''
					});
				} else {
					setError(response.message);
				}
			})
			.catch(error => console.error(error));
	}

	function confirmUpdate() {
		if (Object.values(formData).some(value => value === ('' || null))) {
			setError('You must fill out all fields');
			return;
		}

		setConfirmAction(() => () => {
			update();
			setConfirmMessage('');
		});
		setConfirmMessage(
			`Are you sure you want to update your profile details? 
			If you have any services listed, their statuses will be reset to 'pending', 
			and London Property will have to approve them again.`
		);
	}

	function update() {
		const data = new FormData();
		data.append('action', 'update');
		data.append('domain', domain);
		data.append('image', formData.image);
		data.append('first_name', formData.firstName);
		data.append('last_name', formData.lastName);
		data.append('postcode', formData.postcode);
		data.append('house_number', formData.houseNum);
		data.append('street_name', formData.street);
		// data.append('referee', formData.referee);
		// data.append('abtyou', formData.aboutYou);
		// data.append('chk[]', [formData.iRent, formData.iOwn, formData.iInvest]);
		// data.append('expertiseType', formData.expertiseType);
		// data.append('keywords', formData.keywords);
		// data.append('areas', formData.areas);
		// data.append('shortBlurb', formData.shortBlurb);
		// data.append('longBlurb', formData.longBlurb);
		// data.append('experience', formData.experience);
		// data.append('languages', formData.languages);
		// data.append('supportingMaterials', formData.supportingMaterials);

		fetch(`${API_DOMAIN}/user/profile.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('Successfully updated profile');
				} else {
					setError(response.message);
				}
			})
			.catch(error => console.error(error));
	}

	function deleteAccount(password) {
		const data = new FormData();
		data.append('action', 'deleteAccount');
		data.append('password', password);

		fetch(`${API_DOMAIN}/user/profile.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.success) {
					setSuccess('Successfully deleted account');
					setModalText('Successfully deleted');
					//refresh the page to log the user out
					setTimeout(() => {
						window.location.reload();
					}, 5000);
				} else {
					setError(response.message);
					setModalText('Authentication failed: Enter password again');
				}
			})
			.catch(error => console.error(error));
	}

	function handleConfirm() {
		if (deleteAccount(password)) {
			setModalText('Successfully deleted');
		} else {
			setModalText('Authentication failed: Enter password again');
		}
		setIsModalOpen(false); // Close the modal after confirming or failing
	}

	return (
		<>
			{error && (
				<MessageModal type='error' onClose={() => setError('')}>
					{error}
				</MessageModal>
			)}
			{success && (
				<MessageModal type='success' onClose={() => navigate('/')}>
					{success}
				</MessageModal>
			)}
			{confirmMessage && (
				<ConfirmModal onConfirm={confirmAction} onCancel={() => setConfirmMessage('')}>
					{confirmMessage}
				</ConfirmModal>
			)}
			{isModalOpen && (
				<ConfirmPasswordModal
					onCancel={() => setIsModalOpen(false)} // Add a prop to close the modal from the child component
					onConfirm={handleConfirm}
					setPassword={setPassword}>
					{modalText}
				</ConfirmPasswordModal>
			)}

			<form className='mx-auto my-10 w-[40rem] rounded-3xl bg-lp-cream-white p-8 shadow-2xl'>
				<h1 className='my-6 text-center font-lp-title-regular text-4xl text-lp-navy'>
					{isComplete ? 'Manage Profile' : 'Complete Profile'}
				</h1>

				<div>
					<input
						type='file'
						accept='.png,.jpg,.jpeg'
						ref={imgInputRef}
						className='hidden'
						onChange={({ target: { files } }) => {
							files && setFormData({ ...formData, image: files[0] });
							setImgURL(URL.createObjectURL(files[0]));
						}}
					/>
					<div className='mx-auto mb-5 flex h-52 w-52 items-center' onClick={() => imgInputRef.current.click()}>
						{imgURL ? (
							// ? <img src={`${API_DOMAIN}/?a=loadFile&params={"file":"${formData.image}","type":"profile"}`}
							//     alt={formData.image}
							//     className="max-w-full max-h-full mx-auto border-2 border-solid rounded-xl hover:cursor-pointer" />
							<img
								src={imgURL}
								alt='Profile Image'
								className='mx-auto max-h-full max-w-full rounded-xl border-2 border-solid hover:cursor-pointer'
							/>
						) : (
							<BiImageAdd className='h-full w-full fill-gray-500 hover:cursor-pointer' />
						)}
					</div>

					<TextInput
						label='First Name'
						id='firstName'
						value={formData.firstName}
						onChange={e => setFormData({ ...formData, firstName: e.target.value })}
					/>
					<TextInput
						label='Last Name'
						id='lastName'
						value={formData.lastName}
						onChange={e => setFormData({ ...formData, lastName: e.target.value })}
					/>
					<TextInput
						label='House Number'
						id='houseNum'
						value={formData.houseNum}
						onChange={e => setFormData({ ...formData, houseNum: e.target.value })}
					/>
					<TextInput
						label='Street Name'
						id='street'
						value={formData.street}
						onChange={e => setFormData({ ...formData, street: e.target.value })}
					/>
					<TextInput
						label='Postcode'
						id='postcode'
						value={formData.postcode}
						onChange={e => setFormData({ ...formData, postcode: e.target.value })}
					/>

					{/* <TextInput id='phoneNumber'
                    value={formData.phoneNumber} onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })} /> */}
				</div>

				{/* {isMember &&
                    <div id="member-info">
                        <h3 className="text-2xl text-lp-navy font-lp-title-regular my-6">Member Info</h3>
                        <TextInput id='postcode'
                            value={formData.postcode} onChange={e => setFormData({ ...formData, postcode: e.target.value })} />
                        <TextInput id='houseNum'
                            value={formData.houseNum} onChange={e => setFormData({ ...formData, houseNum: e.target.value })} />
                        <TextInput id='street'
                            value={formData.street} onChange={e => setFormData({ ...formData, street: e.target.value })} />
                        <TextInput id='referee'
                            value={formData.referee} onChange={e => setFormData({ ...formData, referee: e.target.value })} />
                        <TextArea id='about_you'
                            value={formData.about_you} onChange={e => setFormData({ ...formData, about_you: e.target.value })} />
                    </div>} */}

				{/* {isExpert &&
                    <div id="expert-info">
                        <h3 className="text-2xl text-lp-navy font-lp-title-regular my-6">Expert Info</h3>
                        <label htmlFor="expertiseType">Expertise Type</label>
                        <select className="block mx-auto my-4 p-3 border border-gray-300 rounded-xl w-full text-center bg-white" id="expertiseType"
                            onChange={() => setFormData({ ...formData, expertiseType: e.target.value })}>
                            <option value="Architecture">Architecture</option>
                            <option value="Design & Interiors">Design & Interiors</option>
                            <option value="Education">Education</option>
                            <option value="Family Office">Family Office</option>
                            <option value="Garden & Landscaping">Garden & Landscaping</option>
                            <option value="Insurance">Insurance</option>
                            <option value="Legal">Legal</option>
                            <option value="Tax">Tax</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Agents">Agents</option>
                            <option value="Arts & Media">Arts & Media</option>
                            <option value="Finance & Investment">Finance & Investment</option>
                            <option value="Security">Security</option>
                            <option value="Surveyors & Valuers">Surveyors & Valuers</option>
                            <option value="Property Maintainance">Property Maintainance</option>
                        </select>
                        <TextArea id='keywords'
                            value={formData.keywords} onChange={e => setFormData({ ...formData, keywords: e.target.value })} />
                        <TextInput id='areas'
                            value={formData.areas} onChange={e => setFormData({ ...formData, areas: e.target.value })} />
                        <TextArea id='shortBlurb'
                            value={formData.shortBlurb} onChange={e => setFormData({ ...formData, shortBlurb: e.target.value })} />
                        <TextInput id='referee'
                            value={formData.referee} onChange={e => setFormData({ ...formData, referee: e.target.value })} />
                        <TextInput id='experience'
                            value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} />
                        <TextInput id='languages'
                            value={formData.languages} onChange={e => setFormData({ ...formData, languages: e.target.value })} />
                        <TextArea id='longBlurb'
                            value={formData.longBlurb} onChange={e => setFormData({ ...formData, longBlurb: e.target.value })} />
                        <TextArea id='supportingMaterial'
                            value={formData.supportingMaterial} onChange={e => setFormData({ ...formData, supportingMaterial: e.target.value })} />
                    </div>} */}

				<Button onClick={confirmUpdate} className='mt-5 w-full py-3'>
					Update Profile
				</Button>
				<Button onClick={() => setIsModalOpen(true)} className='mt-5 w-full py-3'>
					Delete Account
				</Button>
			</form>
		</>
	);
}
