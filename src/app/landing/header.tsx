'use client';

import Image from 'next/image';
import logo from '../../../public/pathway-catalyst-logo.png';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const Header = () => {
	const [hideNavbar, setHideNavbar] = useState(false);
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// Dropdown state
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPos = window.pageYOffset;
			if (currentScrollPos > prevScrollPos && currentScrollPos > 100) {
				setHideNavbar(true);
			} else {
				setHideNavbar(false);
			}
			setPrevScrollPos(currentScrollPos);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [prevScrollPos]);

	const handleMouseEnter = () => {
		if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
		setIsDropdownOpen(true);
	};

	const handleMouseLeave = () => {
		// Add slight delay so it doesn’t close instantly
		closeTimeoutRef.current = setTimeout(() => setIsDropdownOpen(false), 200);
	};

	return (
		<header
			// className={`shadow py-2 bg-white fixed w-full z-50 ${
			// 	hideNavbar ? '-translate-y-full' : 'translate-y-0'
			// } transition-transform duration-100 ease-in-out`}
			className='shadow border-b-2 border-gray-200 py-2'>
			<div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
				<div className='flex h-16 items-center justify-between'>
					{/* Logo */}
					<div className='flex-1 md:flex md:items-center md:gap-12'>
						<Link className='block text-blue-500' href='/'>
							<span className='sr-only'>Home</span>
							<Image alt='Logo' src={logo} className='drop-shadow-2xl w-24' />
						</Link>
					</div>

					{/* Desktop Nav */}
					<div className='md:flex md:items-center md:gap-12'>
						<nav aria-label='Global' className='hidden md:block'>
							<ul className='flex items-center gap-6'>
								<li>
									<a
										className='text-gray-700 hover:text-gray-700/75'
										href='#about'>
										About
									</a>
								</li>
								<li>
									<a
										className='text-gray-700 hover:text-gray-700/75'
										href='#services'>
										Solutions
									</a>
								</li>
								<li>
									<a
										className='text-gray-700 hover:text-gray-700/75'
										href='#reviews'>
										Testimonials
									</a>
								</li>
								<li>
									<a
										className='text-gray-700 hover:text-gray-700/75'
										href='/Partners'>
										Partners
									</a>
								</li>
								<li>
									<a
										className='text-gray-700 hover:text-gray-700/75'
										href='/blog'>
										Blog
									</a>
								</li>

								{/* Dropdown with buffer */}
								{/* <li
									className='relative'
									onMouseEnter={handleMouseEnter}
									onMouseLeave={handleMouseLeave}>
									<button
										type='button'
										className='flex items-center gap-1 text-gray-700 hover:text-gray-700/75 focus:outline-none'>
										Resources
										<svg
											className={`w-4 h-4 ml-1 transition-transform ${
												isDropdownOpen ? 'rotate-180' : ''
											}`}
											fill='none'
											stroke='currentColor'
											strokeWidth='2'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M19 9l-7 7-7-7'
											/>
										</svg>
									</button>
									{isDropdownOpen && (
										<ul className='absolute left-0 z-20 mt-2 w-56 rounded-md bg-white shadow-lg border border-gray-100 transition-all duration-150'>
											<li>
												<a
													href='/blog'
													className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>
													Blog
												</a>
											</li>
											<li>
												<a
													href='/project-funding-calculator'
													className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>
													Project Funding Calculator
												</a>
											</li>
											<li>
												<a
													href='/business-growth-roi-calculator'
													className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>
													Business Growth ROI Calculator
												</a>
											</li>
											<li>
												<a
													href='/break-even-loan-calculator'
													className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>
													Break-Even Loan Calculator
												</a>
											</li>
										</ul>
									)}
								</li> */}
							</ul>
						</nav>

						{/* CTA */}
						<div className='flex items-center gap-4'>
							<div className='sm:flex sm:gap-4'>
								<a
									className='rounded-md bg-blue-500 px-5 py-3 font-semibold text-white flex justify-center drop-shadow-2xl items-center shadow-sm hover:bg-blue-500/90'
									href='/loan-application'
									target='_blank'>
									Get Funded Today
								</a>
							</div>

							{/* Mobile Burger */}
							<div className='block md:hidden'>
								<button
									onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
									className='rounded-sm bg-gray-50 border-gray-400 border-2 p-2 text-gray-600 hover:text-gray-600/75'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='size-5'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										strokeWidth='2'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M4 6h16M4 12h16M4 18h16'
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div className='md:hidden bg-white shadow-lg border-t border-gray-200'>
					<ul className='flex flex-col p-4 space-y-2'>
						<li>
							<a
								href='#about'
								className='block text-gray-700 hover:text-blue-500'>
								About
							</a>
						</li>
						<li>
							<a
								href='#services'
								className='block text-gray-700 hover:text-blue-500'>
								Solutions
							</a>
						</li>
						<li>
							<a
								href='#reviews'
								className='block text-gray-700 hover:text-blue-500'>
								Testimonials
							</a>
						</li>
						<li>
							<a
								href='/Partners'
								className='block text-gray-700 hover:text-blue-500'>
								Partners
							</a>
						</li>
						<li>
							<a
								href='/blog'
								className='block text-gray-700 hover:text-blue-500'>
								Blogs
							</a>
						</li>
						{/* <li className='border-t pt-2'>
							<p className='font-semibold text-gray-600'>Resources</p>
							<ul className='pl-4 space-y-2 mt-1'>
								<li>
									<a
										href='/blog'
										className='block text-gray-700 hover:text-blue-500'>
										Blog
									</a>
								</li>
								<li>
									<a
										href='/project-funding-calculator'
										className='block text-gray-700 hover:text-blue-500'>
										Project Funding Calculator
									</a>
								</li>
								<li>
									<a
										href='/business-growth-roi-calculator'
										className='block text-gray-700 hover:text-blue-500'>
										Business Growth ROI Calculator
									</a>
								</li>
								<li>
									<a
										href='/break-even-loan-calculator'
										className='block text-gray-700 hover:text-blue-500'>
										Break-Even Loan Calculator
									</a>
								</li>
							</ul>
						</li> */}
						<li className='pt-2'>
							<a
								href='/loan-application'
								target='_blank'
								className='block rounded-md bg-blue-500 px-5 py-3 font-semibold text-white text-center hover:bg-blue-500/90'>
								Get Funded Today
							</a>
						</li>
					</ul>
				</div>
			)}
		</header>
	);
};

export default Header;
