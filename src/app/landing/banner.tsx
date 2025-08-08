// Looking for a small business loan (from pay roll to projects to consolidations), you are in the right place
// 1. Assume that they are here to get small lending that SEO automatically signals this type of users
// 2. goal 1: Ability to Apply
// 3. see if they are eligble test or some sort of way that can verify and get instant feed back on the loan

// import Image from 'next/image';
import Quiz from '../components/quickquote';

const banner = () => {
	return (
		<section className='pt-20 lg:pt-0 min-h-[70vh] bg-gradient-to-br from-white via-gray-50 to-teal-50 lg:grid lg:place-content-center grid-cols-2'>
			<div className='mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 gap-10 md:grid md:grid-cols-1 md:items-center lg:px-8 lg:py-32'>
				<div className='max-w-prose mx-auto flex flex-col items-center text-center'>
					<h1 className='text-4xl font-bold text-gray-900 sm:text-5xl'>
						Lorem ipsum dolor sit
					</h1>

					<p className='mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed'>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque,
						nisi. Natus, provident accusamus impedit minima harum corporis
						iusto.
					</p>

					<div className='mt-4 flex gap-4 sm:mt-6 justify-center'>
						<a
							className='inline-block rounded-md drop-shadow-2xl font-semibold border bg-blue-500 px-5 py-3 text-white transition-colors hover:bg-blue-500/90'
							href='#'>
							Get Funded Today
						</a>

						<a
							className='inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900'
							href='#'>
							Book Now with Representative
						</a>
					</div>
				</div>
				<div className='flex flex-col items-center mt-10'>
					{/* <Image className='' src={''} alt='Image for quick overview' /> */}
				</div>
			</div>
			<div className='flex justify-center items-center mb-10'>
				<Quiz />
			</div>
		</section>
	);
};

export default banner;
