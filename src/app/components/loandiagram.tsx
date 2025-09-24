'use client';

import { CheckCircle2, XCircle } from 'lucide-react';

const problems = [
	{
		title: 'Low Credit Score',
		desc: 'Getting told "no" by banks like it\'s your fault you kept the business alive during a pandemic.',
	},
	{
		title: 'Cash Flow Crunch',
		desc: 'Sales are booming, but your account balance still feels like a bad joke.',
	},
	{
		title: 'Denied by the Bank',
		desc: "Explaining your business model to a banker who's never owned one.",
	},
	{
		title: 'Too Fast for the System',
		desc: "You're scaling fast but banks move at the speed of paperwork.",
	},
];

const solutions = [
	{
		title: 'Low Credit? No Problem',
		desc: 'We fund businesses banks won’t touch. If you’re earning, you’re eligible.',
	},
	{
		title: 'Flexible Repayment Options',
		desc: 'Reasonable payback through the system, no pressure.',
	},
	{
		title: 'Fast Turnaround Times',
		desc: 'Receive funding in as little as 24 hours. Because opportunity doesn’t wait, and neither should you.',
	},
	{
		title: 'Revenue-Based Funding',
		desc: 'Get approved based on your daily sales not your credit score or paperwork pile.',
	},
];

export default function ProblemSolution() {
	return (
		<section className='w-full bg-gradient-to-br py-8 px-6 md:px-12'>
			<div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-12'>
				{/* Problems */}
				<div>
					<h2 className='drop-shadow-lg text-3xl md:text-4xl font-bold mb-8'>
						Are You Struggling With These Business Challenges?
					</h2>
					<div className='space-y-6'>
						{problems.map((p, i) => (
							<div key={i} className='flex gap-4'>
								<XCircle className='w-6 h-6 text-red-300 flex-shrink-0 mt-1' />
								<div>
									<h3 className='font-semibold text-lg'>{p.title}</h3>
									<p className='text-gray-600'>{p.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Solutions */}
				<div>
					<h2 className='drop-shadow-lg text-3xl md:text-4xl font-bold mb-8'>
						Transform Your Business With Our Proven System
					</h2>
					<div className='space-y-6'>
						{solutions.map((s, i) => (
							<div key={i} className='flex gap-4'>
								<CheckCircle2 className='w-6 h-6 text-green-400 flex-shrink-0 mt-1' />
								<div>
									<h3 className='font-semibold text-lg'>{s.title}</h3>
									<p className='text-gray-600'>{s.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
