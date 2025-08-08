import Quiz from '../components/quickquote';

const Banner = () => {
	return (
		<section className='pt-20 lg:pt-0 min-h-[70vh] bg-gradient-to-br from-white via-gray-50 to-teal-50'>
			<div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-10'>
				{/* Left Column - Two Rows */}
				<div className='grid grid-rows-[auto_auto] gap-8'>
					{/* Row 1 - Text + CTA */}
					<div className='flex flex-col items-center lg:items-start text-center lg:text-left max-w-prose mx-auto lg:mx-0'>
						<h1 className='text-4xl font-bold text-gray-900 sm:text-5xl'>
							Get Your Small Business Funded
						</h1>

						<p className='mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed'>
							Looking for a small business loan? From payroll to projects to
							consolidations, you’re in the right place. See if you’re eligible
							and get instant feedback on your loan.
						</p>

						<div className='mt-4 flex flex-wrap gap-4 sm:mt-6 justify-center lg:justify-start'>
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

					{/* Row 2 - Image */}
					<div className='flex justify-center lg:justify-start'>
						{/* TODO: Replace with your image */}
						{/* <Image src="/path/to/your-image.jpg" alt="Loan funding overview" width={500} height={300} /> */}
						<div className='bg-gray-200 w-full max-w-lg h-48 rounded-md flex items-center justify-center text-gray-500'>
							Image Placeholder
						</div>
					</div>
				</div>

				{/* Right Column - Quiz aligned to top */}
				<div className='flex justify-center pl-0 xl:pl-30'>
					<div className='w-full max-w-md'>
						<Quiz />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Banner;
