const services = () => {
	return (
		<section
			className='bg-gradient-to-tr from-white via-gray-50 to bg-yellow-50'
			id='solutions'>
			<h1 className='text-center text-4xl font-bold text-gray-900 sm:text-5xl'>
				Our Solutions
			</h1>
			<p className='text-center text-lg text-gray-600 mt-6 mb-6'>
				Explore our range of financial solutions designed to help you achieve
				your goals.
			</p>
			<div className='flex justify-center'>
				{/* TODO: Replace with your image */}
				{/* <Image src="/path/to/your-image.jpg" alt="Loan funding overview" width={500} height={300} /> */}
				<div className='bg-gray-200 w-full max-w-lg h-48 rounded-md flex items-center justify-center text-gray-500 mb-10'>
					The solutions overview will be here
				</div>
			</div>
		</section>
	);
};

export default services;
