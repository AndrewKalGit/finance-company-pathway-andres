'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';

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
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false); // lock state

	// GTM tracking helper
	const trackStep = (stepNum: number, field?: string, value?: string) => {
		type DataLayerWindow = Window & {
			dataLayer?: Array<Record<string, unknown>>;
		};
		if (
			typeof window !== 'undefined' &&
			(window as DataLayerWindow).dataLayer
		) {
			(window as DataLayerWindow).dataLayer!.push({
				event: 'loan_wizard_step',
				step: stepNum,
				field: field || null,
				value: value || null,
			});
		}
	};

	const handleSelect = (field: keyof StepData, value: string) => {
		setAnswers((prev) => {
			const updated = { ...prev, [field]: value };
			trackStep(step, field, value);

			// Step 1: move forward only if both revenueRange and creditScore selected
			if (step === 1 && updated.revenueRange && updated.creditScore) {
				setTimeout(() => setStep(2), 150);
			}

			// Step 2: move to Step 3 only after both purpose and purposeDetail selected
			if (step === 2 && updated.purpose && updated.purposeDetail) {
				setTimeout(() => setStep(3), 150);
			}

			return updated;
		});
	};

	const handleSubmit = () => {
		if (submitting) return; // prevent spam clicks
		setSubmitting(true);
		const newErrors: { [key: string]: string } = {};
		setSubmitError(null);

		if (!answers.name || !/^[a-zA-Z\s]{2,}$/.test(answers.name)) {
			newErrors.name =
				'Enter a valid full name (letters only, min 2 characters).';
		}
		if (!answers.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) {
			newErrors.email = 'Enter a valid email address.';
		}
		if (
			!answers.businessName ||
			!/^[a-zA-Z0-9\s]{2,}$/.test(answers.businessName)
		) {
			newErrors.businessName =
				'Enter a valid business name (letters/numbers, min 2 characters).';
		}

		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			const serviceID = 'YOUR_SERVICE_ID';
			const templateID = 'YOUR_TEMPLATE_ID';
			const publicKey = 'YOUR_PUBLIC_KEY';

			emailjs
				.send(
					serviceID,
					templateID,
					{
						name: answers.name,
						email: answers.email,
						businessName: answers.businessName,
						revenueRange: answers.revenueRange,
						creditScore: answers.creditScore,
						purpose: answers.purpose,
						purposeDetail: answers.purposeDetail,
					},
					publicKey
				)
				.then(
					(response) => {
						console.log(
							'Email sent successfully!',
							response.status,
							response.text
						);
						setSubmitted(true);
						trackStep(step, 'form_submit', JSON.stringify(answers));
					},
					(error) => {
						console.error('Failed to send email:', error);
						setSubmitError('Failed to send form. Please try again later.');
					}
				)
				.finally(() => {
					// keep locked for 2 more seconds
					setTimeout(() => setSubmitting(false), 2000);
				});
		} else {
			// unlock immediately if validation fails
			setSubmitting(false);
		}
	};

	const startOver = () => {
		setStep(1);
		setAnswers({});
		setErrors({});
		setSubmitted(false);
		setSubmitError(null);
	};

	const renderLoanFeedback = () => {
		let feedback = '';
		let details = '';

		if (answers.purpose === 'reconsolidation') {
			feedback = 'Debt Reconsolidation Loan';
			details =
				'Typically 5.5% - 11% APR, terms 1-5 years. Combines multiple debts into a single payment. Rates vary by credit, revenue, and lender.';
		} else if (answers.purpose === 'micro-loan') {
			feedback = 'Small / Micro Loan';
			details =
				'Typically 7% - 17% APR, terms 6 months - 3 years. Ideal for small projects, inventory, or emergencies.';
		} else if (answers.purpose === 'growth') {
			feedback = 'Business Growth Loan';
			details =
				'Rates usually 6% - 15% APR, terms up to 10 years. Suitable for expansion, hiring, or equipment.';
		}

		return (
			<div className='bg-gray-100 border border-gray-300 p-4 rounded shadow'>
				<h3 className='font-bold text-lg mb-2'>{feedback}</h3>
				<p>{details}</p>
				<p className='text-xs mt-2 text-gray-500'>
					*Rates and terms are indicative and may vary based on lender, business
					profile, and market conditions.
				</p>
			</div>
		);
	};

	return (
		<div className='max-w-md mx-auto bg-white p-6 rounded shadow-lg border border-gray-300 min-h-[75vh] flex flex-col'>
			<h2 className='text-2xl font-bold mb-2'>Loan Type Advisor</h2>
			<p className='text-sm mb-4'>
				Determine the most suitable loan type and see typical 2025 rates and
				terms.
			</p>

			{/* Step Navigation */}
			<div className='flex justify-around mb-4'>
				{[1, 2, 3].map((num) => (
					<button
						key={num}
						className={`rounded-full px-3 py-1 border-2 shadow ${
							step === num
								? 'bg-blue-500 text-white border-gray-200'
								: num < step
								? 'bg-gray-200 text-gray-500 border-gray-200'
								: 'bg-white border-gray-200'
						}`}>
						{num}
					</button>
				))}
			</div>

			{/* Step 1 */}
			{!submitted && step === 1 && (
				<div className='flex-1'>
					<p className='mb-2 font-semibold'>
						Select your annual revenue range:
					</p>
					{[
						'0 - $50,000',
						'$50,000 - $250,000',
						'$250,000 - $1,000,000',
						'$1,000,000+',
					].map((val) => (
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
					{['500 - 600', '600 - 700', '700+'].map((val) => (
						<button
							key={val}
							onClick={() => handleSelect('creditScore', val)}
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

			{/* Step 2 */}
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
							{(answers.purpose === 'reconsolidation'
								? [
										'Too many different loan payments',
										'Want to simplify monthly expenses',
										'Lower interest rate goal',
								  ]
								: answers.purpose === 'micro-loan'
								? ['Small project', 'Equipment purchase', 'Emergency funds']
								: ['Expansion project', 'Hiring staff', 'Major equipment']
							).map((val) => (
								<button
									key={val}
									onClick={() => handleSelect('purposeDetail', val)}
									className={`block w-full text-left p-3 mb-2 rounded border border-gray-300 shadow ${
										answers.purposeDetail === val
											? 'bg-blue-500 text-white'
											: 'bg-white'
									}`}>
									{val}
								</button>
							))}
						</>
					)}
				</div>
			)}

			{/* Step 3 */}
			{!submitted && step === 3 && (
				<div className='flex-1 space-y-3'>
					<div>
						<p className='mb-1 font-semibold'>Full Name</p>
						<input
							className={`block w-full p-2 border rounded ${
								errors.name ? 'border-red-500' : 'border-gray-300'
							}`}
							placeholder='Enter your full name'
							onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
							value={answers.name || ''}
						/>
						{errors.name && (
							<p className='text-red-500 text-sm'>{errors.name}</p>
						)}
					</div>

					<div>
						<p className='mb-1 font-semibold'>Business Name</p>
						<input
							className={`block w-full p-2 border rounded ${
								errors.businessName ? 'border-red-500' : 'border-gray-300'
							}`}
							placeholder='Enter your business name'
							onChange={(e) =>
								setAnswers({ ...answers, businessName: e.target.value })
							}
							value={answers.businessName || ''}
						/>
						{errors.businessName && (
							<p className='text-red-500 text-sm'>{errors.businessName}</p>
						)}
					</div>

					<div>
						<p className='mb-1 font-semibold'>Email</p>
						<input
							className={`block w-full p-2 border rounded ${
								errors.email ? 'border-red-500' : 'border-gray-300'
							}`}
							placeholder='Enter your email address'
							onChange={(e) =>
								setAnswers({ ...answers, email: e.target.value })
							}
							value={answers.email || ''}
						/>
						{errors.email && (
							<p className='text-red-500 text-sm'>{errors.email}</p>
						)}
					</div>

					{submitError && <p className='text-red-500 text-sm'>{submitError}</p>}

					<button
						className={`bg-blue-500 text-white px-4 py-2 rounded mt-2 ${
							submitting ? 'opacity-50 cursor-not-allowed' : ''
						}`}
						onClick={handleSubmit}
						disabled={submitting}>
						{submitting ? 'Submitting...' : 'Submit'}
					</button>
				</div>
			)}

			{/* Submitted Feedback */}
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
		</div>
	);
}
