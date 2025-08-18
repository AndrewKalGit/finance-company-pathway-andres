import LoanApp from '../components/loanapp';
import Image from 'next/image';
import logo from '../../../public/pathway-catalyst-logo.png';
import Link from 'next/link';

const page = () => {
	return (
		<main className='flex flex-col items-center justify-center min-h-screen  bg-gradient-to-br from-teal-50 via-white to-yellow-50'>
			<div className='mx-auto max-w-screen-xl'>
				<Link href='/'>
					<Image
						src={logo}
						alt='Logo'
						className='drop-shadow-2xl w-40 mx-auto'
					/>
				</Link>
			</div>
			<div className='mb-10' id='form'>
				{/* <LoanApp /> */}
			</div>
			<div className='text-center text-gray-700 flex items-center justify-center gap-2 mb-4'>
				<p className='text-sm'>
					&copy; {new Date().getFullYear()} Pathway Catalyst. All rights
					reserved.
				</p>
				<span className='text-sm'>|</span>
				<a href='/privacy-policy' className='text-sm hover:underline'>
					Privacy Policy
				</a>
				<span className='text-sm'>|</span>
				<a href='/terms-of-service' className='text-sm hover:underline'>
					Terms of Service
				</a>
			</div>
		</main>
	);
};

export default page;
