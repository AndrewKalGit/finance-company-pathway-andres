'use client';

import { useState } from 'react';

type StepData = {
	revenueRange?: string;
	creditScore?: string;
	purpose?: string;
	purposeDetail?: string;
	name?: string;
	email?: string;
	businessName?: string;
};

export default function LoanWizard() {
	const [step, setStep] = useState(1);
	const [answers, setAnswers] = useState<StepData>({});
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const totalSteps = 3;

	const goToStep = (num: number) => {
		if (num < step) {
			// If going backwards, clear answers for the step we are landing on
			const cleared = { ...answers };
			if (num === 1) {
				delete cleared.revenueRange;
				delete cleared.creditScore;
			} else if (num === 2) {
				delete cleared.purpose;
				delete cleared.purposeDetail;
			} else if (num === 3) {
				delete cleared.name;
				delete cleared.email;
				delete cleared.businessName;
			}
			setAnswers(cleared);
			setStep(num);
			return;
		}

		// If going forward
		if (num <= totalSteps && canGoToStep(num)) {
			setStep(num);
		}
	};

	const canGoToStep = (num: number) => {
		if (num === 2) return !!answers.revenueRange && !!answers.creditScore;
		if (num === 3) return !!answers.purpose && !!answers.purposeDetail;
		return true;
	};

	const handleSelect = (
		field: keyof StepData,
		value: string,
		nextStep?: number
	) => {
		setAnswers((prev) => ({ ...prev, [field]: value }));
		if (nextStep) setStep(nextStep);
	};

	const handleSubmit = () => {
		const nameValid = /^[a-zA-Z\s]{2,}$/.test(answers.name || '');
		const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email || '');
		const bizValid = /^[a-zA-Z0-9\s]{2,}$/.test(answers.businessName || '');

		if (!nameValid || !emailValid || !bizValid) {
			setError('Please fill out your details correctly.');
			return;
		}

		setError(null);
		setSubmitted(true);

		console.log('Answers:', answers);
	};

	const startOver = () => {
		setStep(1);
		setAnswers({});
		setSubmitted(false);
		setError(null);
	};

	const renderLoanFeedback = () => {
		let feedback = '';
		let details = '';

		if (answers.purpose === 'reconsolidation') {
			feedback = 'Debt Reconsolidation Loan';
			details =
				'Typically offers rates between 6% - 12% APR, with terms ranging from 1 to 5 years. Designed to combine multiple debts into a single, manageable payment.';
		} else if (answers.purpose === 'micro-loan') {
			feedback = 'Small / Micro Loan';
			details =
				'Usually offers rates from 8% - 18% APR, with shorter terms (6 months - 3 years). Best for small projects, inventory, or emergency expenses.';
		} else if (answers.purpose === 'growth') {
			feedback = 'Business Growth Loan';
			details =
				'Rates can range from 7% - 15% APR, with terms up to 10 years. Ideal for expansion, hiring, or major equipment purchases.';
		}

		return (
			<div className='bg-gray-100 border border-gray-300 p-4 rounded shadow'>
				<h3 className='font-bold text-lg mb-2'>{feedback}</h3>
				<p>{details}</p>
			</div>
		);
	};

	return (
		<div className='max-w-md mx-auto mt-28 bg-white p-6 rounded shadow-lg border border-gray-300 min-h-[500px] flex flex-col'>
			<h2 className='text-2xl font-bold mb-2'>
				Which Loan Option Best Fits Me
			</h2>
			<p className='text-sm mb-4'>
				This form will help determine the most suitable loan type for you and
				give you an idea of typical rates and terms.
			</p>

			{/* Step navigation */}
			<div className='flex justify-around mb-4'>
				{[1, 2, 3].map((num) => (
					<button
						key={num}
						className={` rounded-full px-3 py-1 border-2 border-gray-200 shadow ${
							step === num ? 'bg-blue-500 text-white' : 'bg-white'
						}`}
						onClick={() => goToStep(num)}>
						{num}
					</button>
				))}
			</div>

			{/* Steps */}
			{!submitted && step === 1 && (
				<div className='flex-1'>
					<p className='mb-2 font-semibold'>
						Select your annual revenue range:
					</p>
					{['<50k', '50k-250k', '250k-1m', '>1m'].map((val) => (
						<button
							key={val}
							onClick={() => handleSelect('revenueRange', val)}
							className={`block w-full text-left p-3 mb-2 rounded border border-gray-300 shadow ${
								answers.revenueRange === val
									? 'bg-blue-500 text-white'
									: 'bg-white'
							}`}>
							{val}
						</button>
					))}

					<p className='mt-4 mb-2 font-semibold'>
						Select your credit score range:
					</p>
					{['<600', '600-700', '700+'].map((val) => (
						<button
							key={val}
							onClick={() => handleSelect('creditScore', val, 2)}
							className={`block w-full text-left p-3 mb-2 rounded border border-gray-300 shadow ${
								answers.creditScore === val
									? 'bg-blue-500 text-white'
									: 'bg-white'
							}`}>
							{val}
						</button>
					))}
				</div>
			)}

			{!submitted && step === 2 && (
				<div className='flex-1'>
					<p className='mb-2 font-semibold'>
						What is the general purpose of your loan?
					</p>
					{[
						{ val: 'reconsolidation', label: 'Debt Reconsolidation' },
						{ val: 'micro-loan', label: 'Small / Micro Loan' },
						{ val: 'growth', label: 'Business Growth' },
					].map((opt) => (
						<button
							key={opt.val}
							onClick={() => handleSelect('purpose', opt.val)}
							className={`block w-full text-left p-3 mb-2 rounded border border-gray-300 shadow ${
								answers.purpose === opt.val
									? 'bg-blue-500 text-white'
									: 'bg-white'
							}`}>
							{opt.label}
						</button>
					))}

					{answers.purpose && (
						<>
							<p className='mt-4 mb-2 font-semibold'>
								Can you describe the reason more specifically?
							</p>
							{answers.purpose === 'reconsolidation' &&
								[
									'Too many different loan payments',
									'Want to simplify monthly expenses',
									'Lower interest rate goal',
								].map((val) => (
									<button
										key={val}
										onClick={() => handleSelect('purposeDetail', val, 3)}
										className={`block w-full text-left p-3 mb-2 rounded border border-gray-300 shadow ${
											answers.purposeDetail === val
												? 'bg-blue-500 text-white'
												: 'bg-white'
										}`}>
										{val}
									</button>
								))}

							{answers.purpose === 'micro-loan' &&
								['Small project', 'Equipment purchase', 'Emergency funds'].map(
									(val) => (
										<button
											key={val}
											onClick={() => handleSelect('purposeDetail', val, 3)}
											className={`block w-full text-left p-3 mb-2 rounded border border-gray-300 shadow ${
												answers.purposeDetail === val
													? 'bg-blue-500 text-white'
													: 'bg-white'
											}`}>
											{val}
										</button>
									)
								)}

							{answers.purpose === 'growth' &&
								['Expansion project', 'Hiring staff', 'Major equipment'].map(
									(val) => (
										<button
											key={val}
											onClick={() => handleSelect('purposeDetail', val, 3)}
											className={`block w-full text-left p-3 mb-2 rounded border border-gray-300 shadow ${
												answers.purposeDetail === val
													? 'bg-blue-500 text-white'
													: 'bg-white'
											}`}>
											{val}
										</button>
									)
								)}
						</>
					)}
				</div>
			)}

			{!submitted && step === 3 && (
				<div className='flex-1'>
					<p className='mb-2 font-semibold'>Your details:</p>
					<input
						className='block w-full mb-2 p-2 border border-gray-300 rounded'
						placeholder='Full Name'
						onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
						value={answers.name || ''}
					/>
					<input
						className='block w-full mb-2 p-2 border border-gray-300 rounded'
						placeholder='Email'
						onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
						value={answers.email || ''}
					/>
					<input
						className='block w-full mb-4 p-2 border border-gray-300 rounded'
						placeholder='Business Name'
						onChange={(e) =>
							setAnswers({ ...answers, businessName: e.target.value })
						}
						value={answers.businessName || ''}
					/>

					{error && (
						<p className='text-orange-500 mb-3 font-semibold'>{error}</p>
					)}

					<button
						className='bg-blue-500 text-white px-4 py-2 rounded'
						onClick={handleSubmit}>
						Submit
					</button>
				</div>
			)}

			{submitted && (
				<div className='flex-1 space-y-4'>
					{renderLoanFeedback()}
					<button
						className='bg-blue-500 text-white px-4 py-2 rounded'
						onClick={startOver}>
						Start Over
					</button>
				</div>
			)}

			{/* Navigation buttons */}
			{!submitted && (
				<div className='mt-4 flex justify-between'>
					{step > 1 && (
						<button
							className='px-4 py-2 border rounded'
							onClick={() => goToStep(step - 1)}>
							Back
						</button>
					)}
				</div>
			)}
		</div>
	);
}
