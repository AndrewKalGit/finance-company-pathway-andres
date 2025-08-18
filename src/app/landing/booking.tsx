// A way to instantly get face to face

const booking = () => {
	return (
		<div
			id='book'
			className='bg-gray-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10'>
			<h1 className='text-center my-8 text-4xl font-bold text-gray-900 sm:text-5xl'>
				Book a Consultation
			</h1>
			<p className='text-center text-lg text-gray-600 mb-6'>
				Select a date and time that best works for you to discuss your financial
				needs with our experts.
			</p>
			<div className='flex justify-center'>
				{/* TODO: Replace with your image */}
				{/* <Image src="/path/to/your-image.jpg" alt="Loan funding overview" width={500} height={300} /> */}
				<div className='bg-gray-200 w-full max-w-lg h-48 rounded-md flex items-center justify-center text-gray-500 mb-10'>
					Calendar Placeholder
				</div>
			</div>
		</div>
	);
};

export default booking;
