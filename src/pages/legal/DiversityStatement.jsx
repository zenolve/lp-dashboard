// Packages
import { useEffect } from 'react';

export default function DiversityStatement() {
	useEffect(() => {
		document.title = 'Diversity Statement';
	}, []);

	return (
		<div className='mx-auto mb-16 w-4/5 max-w-[768px]'>
			<h1 className='my-12 text-center text-3xl text-lp-navy'>
				Diversity, Inclusion and Equity (DIE) principles for London Property
			</h1>
			<ul>
				<li className='my-6'>
					<span className='font-bold text-lp-navy'>Acknowledge and appreciate diversity:&nbsp;</span>
					At London Property, we recognize and value the differences that each individual brings to the table
					including linguistic, cultural, experiential and socioeconomic diversity
				</li>
				<li className='my-6'>
					<span className='font-bold text-lp-navy'>Create an inclusive environment:&nbsp;</span>
					At London Property we have respect for one another and foster a sense of inclusivity and belonging by
					ensuring that everyone becomes the support they need and has access to equal opportunities
				</li>
				<li className='my-6'>
					<span className='font-bold text-lp-navy'>Promote equitable policies and practices:&nbsp;</span>
					At London Property we ensure that policies and practices are implemented in an equitable manner and the
					element of “fairness” is reflected in our corporate culture
				</li>
				<li className='my-6'>
					<span className='font-bold text-lp-navy'>Eliminate biases and discrimination:&nbsp;</span>
					At London Property we operate with great awareness of unconscious bias and eliminate discriminatory behavior
					and practices
				</li>
				<li className='my-6'>
					<span className='font-bold text-lp-navy'>Encourage open communication:&nbsp;</span>
					At London Property we aim to create an environment where all actors can share their concerns and
					experiences; We acknowledge everyone&#39;s perspective and encourage employees in all levels to engage and
					share opinions
				</li>
			</ul>
			<p className='mt-14 text-lp-navy'>
				London Property is a Luxury Real Estate Platform that fosters an inclusive and equitable work environment where
				all employees feel valued and welcome; We are proud to have such a diverse group of people working together
				towards a brighter future!
			</p>
		</div>
	);
}
