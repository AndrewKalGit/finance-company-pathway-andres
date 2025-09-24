'use client';

import {
	Building2,
	Briefcase,
	CreditCard,
	BarChart3,
	Clock,
	Zap,
	Globe,
	TrendingUp,
} from 'lucide-react';

const financingOptions = [
	{
		title: 'SBA Loans',
		desc: 'Discover the possibilities for your business with our SBA loan services. Low rates, long terms, and government backing.',
		icon: <Building2 className='w-6 h-6 text-blue-600' />,
		highlight: {
			text: 'Up to $5M available',
			icon: <BarChart3 className='w-4 h-4' />,
			color: 'text-blue-600',
		},
	},
	{
		title: 'Equipment Financing',
		desc: "Prepare your business for success with our equipment financing solutions. Whether you're looking for new machinery, technology, or vehicles, we offer flexible financing options.",
		icon: <Briefcase className='w-6 h-6 text-green-600' />,
		highlight: {
			text: '100% financing available',
			icon: <Clock className='w-4 h-4' />,
			color: 'text-green-600',
		},
	},
	{
		title: 'Merchant Cash Advance',
		desc: 'Boost your business growth with merchant cash advances. This unique financing option offers immediate working capital based on your daily sales.',
		icon: <CreditCard className='w-6 h-6 text-purple-600' />,
		highlight: {
			text: 'Same-day funding',
			icon: <Zap className='w-4 h-4' />,
			color: 'text-purple-600',
		},
	},
];

export default function FinancingSection() {
	return (
		<section className='w-full py-16 px-6 md:px-12'>
			<div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-8'>
				{/* Left Column - Financing Options */}
				<div className='space-y-6'>
					{financingOptions.map((item, i) => (
						<div
							key={i}
							className='bg-white shadow-md rounded-2xl p-6 flex flex-col gap-3 border'>
							<div className='flex items-center gap-3'>
								<div className='bg-gray-100 p-3 rounded-lg'>{item.icon}</div>
								<h3 className='text-xl font-semibold'>{item.title}</h3>
							</div>
							<p className='text-gray-600'>{item.desc}</p>
							<div
								className={`flex items-center gap-2 text-sm font-medium ${item.highlight.color}`}>
								{item.highlight.icon}
								<span>{item.highlight.text}</span>
							</div>
						</div>
					))}
				</div>

				{/* Right Column - Business Growth Card */}
				<div className='relative'>
					<div className='bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg h-full flex flex-col justify-between'>
						{/* ROI Badge */}
						<div className='absolute top-4 right-4 bg-white text-green-600 text-sm font-semibold px-3 py-1 rounded-lg shadow'>
							<div className='flex items-center gap-1'>
								<TrendingUp className='w-4 h-4' />
								300% ROI
							</div>
						</div>

						<div>
							<h3 className='text-lg font-semibold'>Business Growth</h3>
							<p className='text-sm opacity-80'>
								Revenue Increase After Funding
							</p>
						</div>

						{/* Growth Graph Placeholder */}
						<div className='flex justify-center items-center h-40'>
							<p className='text-4xl font-bold'>300%</p>
						</div>
						<p className='text-center text-sm opacity-90'>Average Growth</p>

						{/* Stats */}
						<div className='grid grid-cols-2 gap-6 mt-6'>
							<div className='flex items-center gap-2'>
								<Globe className='w-5 h-5' />
								<span className='text-sm'>$50M+ Total Funded</span>
							</div>
							<div className='flex items-center gap-2'>
								<TrendingUp className='w-5 h-5' />
								<span className='text-sm'>1000+ Success Stories</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
