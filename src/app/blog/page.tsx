'use client';

import Header from '../landing/header';
import Footer from '../landing/footer';
import BlogHero from './components/hero-sec-blog';
import BookingSection from '../landing/booking';

import { useState } from 'react';

type Post = {
	title: string;
	slug: string;
};

const mockPosts: Post[] = [
	{
		title: 'Starter Guide to Business Credit',
		slug: 'starter-business-credit',
	},
	{ title: 'Debt Reduction Tactics', slug: 'debt-strategies' },
	{ title: 'How to Fund Your Project', slug: 'project-funding' },
	{ title: 'Scaling Business Growth', slug: 'business-growth' },
];

export default function BlogHome() {
	const [query, setQuery] = useState('');

	const filteredPosts = mockPosts.filter((post) =>
		post.title.toLowerCase().includes(query.toLowerCase())
	);

	return (
		<main>
			<Header />
			<div className='min-h-screen mb-10'>
				{/* Header */}
				<header className='flex justify-around items-center py-6 border-b border-gray-400'>
					{/* Set 1 */}
					<nav className='hidden md:flex gap-6 text-gray-600 font-medium'>
						<a href='#' className='hover:text-gray-900'>
							Debt Strategies
						</a>
						<p> | </p>
						<a href='#' className='hover:text-gray-900'>
							Project Funding
						</a>
						<p> | </p>
						<a href='#' className='hover:text-gray-900'>
							Business Growth
						</a>
					</nav>

					{/* Set 2 */}
					{/* <div className='md:flex md:gap-4'>
						<a
							className='rounded-md bg-blue-500 px-5 py-3 min-w-52 font-semibold text-white flex justify-center items-center shadow-md hover:bg-blue-500/90'
							href='/loan-application'
							target='_blank'>
							Join News Letter
						</a>
					</div> */}
				</header>
				{/* Search Bar */}
				<div className='flex justify-center mt-8 px-4'>
					<input
						type='text'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder='Search posts...'
						className='w-full max-w-lg px-4 py-2 border rounded-xl shadow-md outline-none'
					/>
				</div>

				{/* Content Section */}
				<div className='mt-10 max-w-3xl mx-auto px-4 space-y-4'>
					{filteredPosts.length > 0 ? (
						filteredPosts.map((post) => (
							<a
								key={post.slug}
								href={`/blog/${post.slug}`}
								className='block p-4 rounded-xl bg-white shadow hover:shadow-md transition border border-gray-100'>
								<h2 className='text-lg font-semibold text-gray-800'>
									{post.title}
								</h2>
								<p className='text-md text-gray-500'>Read more →</p>
							</a>
						))
					) : (
						<p className='text-center text-gray-500'>No posts found.</p>
					)}
				</div>
				{/* Hero */}
				<BlogHero />
			</div>
			<BookingSection />
			<Footer />
		</main>
	);
}
