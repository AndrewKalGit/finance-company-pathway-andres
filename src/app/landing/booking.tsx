// A way to instantly get face to face
import Script from 'next/script';

const booking = () => {
	return (
		<div
			id='book'
			className='bg-gradient-to-br from-white via-gray-50 to-teal-50'>
			<h1 className='text-center py-8 text-4xl font-bold text-gray-900 sm:text-5xl'>
				Book a Consultation
			</h1>
			<p className='text-center text-lg text-gray-600'>
				Select a date and time that best works for you to discuss your financial
				needs with our experts.
			</p>
			{/* Calendly inline widget begin */}
			<Script
				src='https://assets.calendly.com/assets/external/widget.js'
				type='text/javascript'
			/>
			<div
				className='calendly-inline-widget'
				data-url='https://calendly.com/andres-v-finance/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=56abd7'
				style={{ minWidth: '350px', height: '700px' }}
			/>
		</div>
	);
};

export default booking;
