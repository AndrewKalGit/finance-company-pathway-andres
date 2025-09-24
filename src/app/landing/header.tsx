'use client';

import Image from 'next/image';
import logo from '../../../public/pathway-catalyst.webp';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const Header = () => {
	const dropdownRef = useRef<HTMLLIElement | null>(null);
	const hamburgerRef = useRef<HTMLButtonElement | null>(null);

	const [hideNavbar, setHideNavbar] = useState(false);
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// Dropdown state
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleMouseEnter = () => {
		if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
		setIsDropdownOpen(true);
	};

	const handleMouseLeave = () => {
		closeTimeoutRef.current = setTimeout(() => setIsDropdownOpen(false), 200);
	};

	// 🔹 Outside click handler
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			// For dropdown
			if (
				isDropdownOpen &&
				dropdownRef.current &&
				!dropdownRef.current.contains(target)
			) {
				setIsDropdownOpen(false);
			}

			// For mobile menu
			if (
				isMobileMenuOpen &&
				!hamburgerRef.current?.contains(target) && // exclude hamburger button
				!(document.querySelector('.mobile-menu')?.contains(target) ?? false)
			) {
				setIsMobileMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isDropdownOpen, isMobileMenuOpen]);

	return (
		<header className='shadow border-b-2 border-gray-200 py-2'>
			<div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
				<div className='flex h-16 items-center justify-between'>
					{/* Logo */}
					<div className='flex-1 lg:flex lg:items-center lg:gap-12'>
						<Link className='block text-blue-500' href='/'>
							<span className='sr-only'>Home</span>
							<Image alt='Logo' src={logo} className='drop-shadow-2xl w-24' />
						</Link>
					</div>

					{/* Desktop Nav */}
					<div className='lg:flex lg:items-center lg:gap-12'>
						<nav aria-label='Global' className='hidden lg:block'>
							<ul className='flex items-center gap-7'>
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
										href='#book'>
										Book with Representative
									</a>
								</li>
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
										href='/blog'>
										Blog
									</a>
								</li>
							</ul>
						</nav>

						{/* CTA */}
						<div className='flex items-center gap-4'>
							<div className='sm:flex sm:gap-4'>
								<a
									className='rounded-lg bg-blue-500 px-5 py-3 font-semibold text-white flex justify-center drop-shadow-2xl items-center shadow-sm hover:bg-blue-500/90'
									href='/loan-application'
									target='_blank'>
									Get Funded Today
								</a>
							</div>

							{/* Mobile Burger */}
							<div className='block lg:hidden'>
								<button
									ref={hamburgerRef}
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
				<div className='mobile-menu lg:hidden bg-white shadow-lg border-t border-gray-200'>
					<ul className='flex flex-col p-4 space-y-2'>
						<li>
							<a
								href='#services'
								className='block text-gray-700 hover:text-blue-500'>
								Solutions
							</a>
						</li>
						<li>
							<a
								href='#about'
								className='block text-gray-700 hover:text-blue-500'>
								About
							</a>
						</li>
						<li>
							<a
								href='/blog'
								className='block text-gray-700 hover:text-blue-500'>
								Blogs
							</a>
						</li>
						<li className='pt-2'>
							<a
								href='/loan-application'
								target='_blank'
								className='block rounded-lg bg-blue-500 px-5 py-3 font-semibold text-white text-center hover:bg-blue-500/90'>
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
