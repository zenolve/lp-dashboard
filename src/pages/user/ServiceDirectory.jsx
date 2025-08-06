// Packages
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Config
import { API_DOMAIN } from '../../config';
// Data
import expertCategories from '../../data/expertCategories';
// Components
import Button from '../../components/Button';
import LinkButton from '../../components/LinkButton';
import MessageModal from '../../components/MessageModal';
import CheckBox from '../../components/form/CheckBox';

export default function ServiceDirectory({ loggedIn }) {
	const [experts, setExperts] = useState([]);
	const [filteredExperts, setFilteredExperts] = useState([]);
	const [categories, setCategories] = useState({});
	const [searchVal, setSearchVal] = useState('');
	const [error, setError] = useState('');
	// const [blurbOpen, setBlurbOpen] = useState(false);

	// const location = useLocation();

	function getExperts(categories) {
		const data = new FormData();
		data.append('categories', JSON.stringify(categories));

		fetch(`${API_DOMAIN}/user/service-directory.php`, { method: 'POST', body: data, credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if (response.status === 1) {
					const tempArr = [];
					for (let i = 0; i < response.id.length; i++) {
						const currentExp = {
							id: response.id[i],
							keywords: response.keywords[i],
							service: response.service[i],
							description: response.desc[i],
							firstName: response.firstName[i],
							lastName: response.lastName[i],
							image: response.files[i]
							// type: response.type[i]
						};
						tempArr.push(currentExp);
					}
					setExperts(tempArr);
					setFilteredExperts(tempArr);
				} else {
					setError('Error retrieving experts');
				}
			})
			.catch(error => console.error(error));
	}

	function search(event) {
		if (
			(event.keyCode >= 65 && event.keyCode <= 90) ||
			(event.keyCode >= 97 && event.keyCode <= 122) ||
			event.keyCode === 8
		) {
			const query = event.target.value.replace(/^\s|\s $/, '').toLowerCase();

			const tempArr = [];
			for (let i = 0; i < experts.length; i++) {
				if (
					experts[i].firstName.toLowerCase().includes(query) ||
					experts[i].lastName.toLowerCase().includes(query) ||
					experts[i].service.toLowerCase().includes(query) ||
					experts[i].keywords.toLowerCase().includes(query)
				) {
					const currentExp = {
						id: experts[i].id,
						firstName: experts[i].firstName,
						lastName: experts[i].lastName,
						image: experts[i].image,
						description: experts[i].description,
						type: experts[i].type,
						keywords: experts[i].keywords,
						service: experts[i].service
					};
					tempArr.push(currentExp);
				}
			}
			setFilteredExperts(tempArr);
		}
	}

	function clear() {
		const tempObj = {};
		for (let i = 0; i < expertCategories.length; i++) {
			tempObj[expertCategories[i].name] = false;
		}
		setCategories(tempObj);
	}

	useEffect(() => {
		// // if there is a 'categories' parameter, returns an array of categories, otherwise sets it to an empty array
		// const urlCategories = (new URLSearchParams(location.search)).get('categories')?.split(' ') || [];
		// if (urlCategories.length > 0) {
		//     const tempObj = {};
		//     for (let i = 0; i < expertCategories.length; i++) {
		//         if (urlCategories.includes(expertCategories[i].id)) {
		//             tempObj[expertCategories[i].name] = true;
		//         } else {
		//             tempObj[expertCategories[i].name] = false;
		//         }
		//     }
		//     setCategories(tempObj);
		// } else {
		clear();
		// }
		document.title = 'Service Directory';
	}, []);

	// useEffect(() => {
	//     // if there is a 'categories' parameter, returns an array of categories, otherwise sets it to an empty array
	//     const urlCategories = (new URLSearchParams(location.search)).get('categories')?.split(' ') || [];
	//     if (urlCategories.length > 0) {
	//         const tempObj = {};
	//         for (let i = 0; i < expertCategories.length; i++) {
	//             if (urlCategories.includes(expertCategories[i].id)) {
	//                 tempObj[expertCategories[i].name] = true;
	//             } else {
	//                 tempObj[expertCategories[i].name] = false;
	//             }
	//         }
	//         setCategories(tempObj);
	//     }
	// }, [location.search]);

	useEffect(() => {
		setSearchVal('');
		getExperts(categories);
	}, [categories]);

	// useEffect(() => {
	// }, [filteredExperts]);

	return (
		<>
			{error && (
				<MessageModal type='error' onClose={() => setError('')}>
					{error}
				</MessageModal>
			)}

			{/* Search bar */}
			<div className='mx-auto mt-6 w-96 max-w-full rounded-3xl border-2 border-gray-400 py-3 text-center'>
				<input
					className='inline w-4/5 pr-3 text-center font-lp-title-regular outline-none'
					type='text'
					placeholder='Search for expert names or keywords'
					value={searchVal}
					onChange={e => setSearchVal(e.target.value)}
					onKeyUp={e => search(e)}
				/>
				{searchVal ? (
					// TODO replace with react-icons
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='currentColor'
						className='inline h-8 w-8 hover:cursor-pointer'
						onClick={() => {
							setSearchVal('');
							setFilteredExperts(experts);
						}}>
						<path
							fillRule='evenodd'
							d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
							clipRule='evenodd'
						/>
					</svg>
				) : (
					// TODO replace with react-icons
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='inline h-8 w-8'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
						/>
					</svg>
				)}
			</div>

			{/* Category Blurb, currently disabled because of multiple categories */}
			{/* <section className="flex flex-wrap justify-center">
                <header className="text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim veritatis ut sit voluptatem explicabo nulla? Architecto, similique cum, eum qui porro illo molestias pariatur nihil nulla, saepe beatae officiis amet?</header>
                <Button>{blurbOpen ? 'Read Less' : 'Read More'}</Button>
            </section> */}

			{filteredExperts.length === 0 && <h2 className='mt-6 text-center text-3xl'>No Experts Found</h2>}

			<div className='flex'>
				{/* Filter list */}
				<section className='ml-5 mt-5 hidden h-fit min-w-fit rounded-md bg-gray-200 p-4 lg:block'>
					<p className='py-2 text-center font-lp-title-regular'>Expert Categories</p>
					{expertCategories.map(service => (
						<div key={service.id}>
							<CheckBox
								onChange={e => setCategories({ ...categories, [service.name]: e.target.checked })}
								id={service.id}
								checked={categories[service.name]}>
								{service.name}
							</CheckBox>
						</div>
					))}
					<Button className='mx-auto mt-4 block' onClick={clear}>
						Clear
					</Button>
				</section>

				{/* Experts */}
				{filteredExperts.length > 0 && (
					// <section className='flex flex-wrap ml-6'>
					<section className='ml-6 flex flex-wrap justify-center'>
						{filteredExperts.map(expert => (
							<div
								className='m-5 w-72 rounded-2xl border border-gray-300 bg-lp-cream-white pb-5 text-center'
								key={expert.id}>
								<Link to={`/service-provider-profile/${expert.id}`}>
									<img
										src={`${API_DOMAIN}/?a=loadFile&params={"file":"${expert.image}","type":"profile"}`}
										alt={expert.image}
										className='mx-auto h-96 w-72 rounded-[2rem] p-5'
									/>
								</Link>
								<button
									className='w-full bg-lp-light-blue py-2 transition hover:text-lp-copper'
									onClick={() => setCategories({ ...categories, [expert.service]: true })}>
									{expert.service}
								</button>
								<div className='h-80 p-3 text-lp-navy'>
									<Link to={`/service-provider-profile/${expert.id}`}>
										<h2 className='mb-3 mt-1 text-2xl transition hover:text-lp-copper'>
											{expert.firstName}
										</h2>
									</Link>
									<p>
										{expert.description.length > 250
											? expert.description.slice(0, 250) + '...'
											: expert.description}
									</p>
								</div>
								<LinkButton
									to={`/service-provider-profile/${expert.id}`}
									type='link'
									className='mx-auto block w-64 py-2'>
									View Profile
								</LinkButton>
								{/* {loggedIn &&
                                    <LinkButton type='link' to='/messages'
                                        className="block w-64 mx-auto py-2 mt-3">Chat with {expert.firstName}</LinkButton>} */}
							</div>
						))}
					</section>
				)}
			</div>
		</>
	);
}
