import LoanDiagram from '../components/loandiagram';

const services = () => {
	return (
		<section
			className='pt-4 bg-gradient-to-tr from-white via-gray-50 to bg-yellow-50'
			id='services'>
			<h1 className='drop-shadow-2xl text-center text-4xl font-bold text-gray-900 sm:text-5xl'>
				Our Solutions
			</h1>
			<div className='flex justify-center'>
				{/* TODO: Replace with your image */}
				{/* <Image src={''} alt='Loan funding overview' width={500} height={300} /> */}
				<LoanDiagram />
			</div>
		</section>
	);
};

export default services;
