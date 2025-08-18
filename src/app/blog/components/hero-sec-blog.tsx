// 'use client';

// import React from 'react';

// type Post = {
// 	title: string;
// 	slug: string;
// 	topic: 'Debt Strategies' | 'Project Funding' | 'Business Growth';
// 	backgroundImage?: string; // optional background image
// };

// type HeroSectionProps = {
// 	primaryPost: Post;
// 	highlightedPosts: Post[];
// };

// export default function HeroSection({
// 	primaryPost,
// 	highlightedPosts,
// }: HeroSectionProps) {
// 	const today = new Date();
// 	const formattedDate = `${
// 		today.getMonth() + 1
// 	}/${today.getDate()}/${today.getFullYear()}`;

// 	return (
// 		<section className='max-w-7xl mx-auto mt-12 px-6 flex flex-col lg:flex-row gap-8'>
// 			{/* Left Split - Primary Post */}
// 			<div
// 				className='lg:w-1/2 relative rounded-xl overflow-hidden shadow-lg flex items-end p-6'
// 				style={{
// 					backgroundImage: primaryPost.backgroundImage
// 						? `url(${primaryPost.backgroundImage})`
// 						: undefined,
// 					backgroundSize: 'cover',
// 					backgroundPosition: 'center',
// 				}}>
// 				{/* Overlay */}
// 				{primaryPost.backgroundImage && (
// 					<div className='absolute inset-0 bg-black/30'></div>
// 				)}
// 				{/* Text */}
// 				<div className='relative text-white'>
// 					<p className='text-sm mb-2'>{formattedDate}</p>
// 					<h1 className='text-2xl lg:text-3xl font-bold'>
// 						{primaryPost.title}
// 					</h1>
// 				</div>
// 			</div>

// 			{/* Right Split - Highlighted Grid */}
// 			<div className='lg:w-1/2 grid grid-cols-1 gap-4'>
// 				{highlightedPosts.map((post) => (
// 					<div
// 						key={post.slug}
// 						className='bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition'>
// 						<span className='text-xs font-semibold text-gray-600'>
// 							{post.topic}
// 						</span>
// 						<h2 className='mt-1 text-lg font-semibold text-gray-800'>
// 							{post.title}
// 						</h2>
// 					</div>
// 				))}
// 			</div>
// 		</section>
// 	);
// }

// Static Version for Demo purposes
'use client';

import React from 'react';

export default function StaticHeroSection() {
	const today = new Date();
	const formattedDate = `${
		today.getMonth() + 1
	}/${today.getDate()}/${today.getFullYear()}`;

	// Static data
	const primaryPost = {
		title: 'Ultimate Guide to Starting Your Business',
		topic: 'Business Growth',
		backgroundImage:
			'https://via.placeholder.com/800x500?text=Primary+Post+Image',
	};

	const highlightedPosts = [
		{
			title: 'Top Debt Reduction Tactics',
			topic: 'Debt Strategies',
			slug: 'debt-tactics',
			image: 'https://via.placeholder.com/400x200?text=Debt+Strategies',
		},
		{
			title: 'Funding Your First Project',
			topic: 'Project Funding',
			slug: 'funding-project',
			image: 'https://via.placeholder.com/400x200?text=Project+Funding',
		},
		{
			title: 'Scaling for Long-Term Growth',
			topic: 'Business Growth',
			slug: 'scaling-growth',
			image: 'https://via.placeholder.com/400x200?text=Business+Growth',
		},
	];

	return (
		<section className='max-w-7xl mx-auto mt-12 px-6 flex flex-col lg:flex-row gap-8'>
			{/* Left Split - Primary Post */}
			<div
				className='lg:w-1/2 min-h-[40vh] relative rounded-xl overflow-hidden shadow-lg flex items-end p-6'
				style={{
					backgroundImage: `url(${primaryPost.backgroundImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}>
				{/* Overlay */}
				<div className='absolute inset-0 bg-black/30'></div>
				{/* Text */}
				<div className='relative text-white'>
					<p className='text-sm mb-2'>{formattedDate}</p>
					<h1 className='text-2xl lg:text-3xl font-bold'>
						{primaryPost.title}
					</h1>
				</div>
			</div>

			{/* Right Split - Highlighted Grid */}
			<div className='lg:w-1/2 grid grid-cols-1 gap-4'>
				{highlightedPosts.map((post) => (
					<div
						key={post.slug}
						className='bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition'>
						{/* Placeholder Image */}
						<div className='h-32 w-full'>
							<div className='w-full h-full bg-gray-200'></div>
						</div>

						{/* Text */}
						<div className='p-4'>
							<span className='text-xs font-semibold text-gray-600'>
								{post.topic}
							</span>
							<h2 className='mt-1 text-lg font-semibold text-gray-800'>
								{post.title}
							</h2>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
