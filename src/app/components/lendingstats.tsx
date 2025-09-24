'use client';

import { Users, TrendingUp, Smile, Clock } from 'lucide-react';

const stats = [
	{
		value: '1,000+',
		label: 'Clients Funded',
		icon: <Users className='w-6 h-6 text-blue-400' />,
	},
	{
		value: '89%',
		label: 'Average Client Retention',
		icon: <TrendingUp className='w-6 h-6 text-blue-400' />,
	},
	{
		value: '92%',
		label: 'Client Satisfaction',
		icon: <Smile className='w-6 h-6 text-blue-400' />,
	},
	{
		value: '24 Hours',
		label: 'Average Time to Funding',
		icon: <Clock className='w-6 h-6 text-blue-400' />,
	},
];

export default function ResultsStats() {
	return (
		<section className='w-full py-16 px-6 md:px-12'>
			<div className='max-w-6xl mx-auto text-center'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10'>
					{stats.map((s, i) => (
						<div key={i} className='flex flex-col items-center text-center'>
							<div className='flex items-center justify-center w-12 h-12 rounded-full shadow-xl bg-white mb-4'>
								{s.icon}
							</div>
							<p className='text-2xl font-bold text-neutral-900'>{s.value}</p>
							<p className='text-neutral-600 text-sm'>{s.label}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
