'use client';

import Image from 'next/image';
import logo from '../../../public/pathway-catalyst-logo.png';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
	const [hideNavbar, setHideNavbar] = useState(false);
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const mobileMenuRef = useRef(null);
	const hamburgerButtonRef = useRef(null); // <== Added ref for burger button

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

	// Outside click handler
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const menuEl = mobileMenuRef.current as unknown as HTMLElement | null;
			const buttonEl =
				hamburgerButtonRef.current as unknown as HTMLElement | null;

			if (
				isMobileMenuOpen &&
				menuEl &&
				!menuEl.contains(event.target as Node) &&
				buttonEl &&
				!buttonEl.contains(event.target as Node)
			) {
				setIsMobileMenuOpen(false);
			}
		};

		if (isMobileMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMobileMenuOpen]);

	return (
		<header
			className={`shadow py-2 bg-white fixed w-full ${
				hideNavbar ? '-translate-y-full' : 'translate-y-0'
			} transition-transform duration-100 ease-in-out`}>
			<div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
				<div className='flex h-16 items-center justify-between'>
					<div className='flex-1 md:flex md:items-center md:gap-12'>
						<a className='block text-blue-500' href='#'>
							<span className='sr-only'>Home</span>
							<Image alt='Logo' src={logo} className='drop-shadow-2xl w-24' />
						</a>
					</div>

					<div className='md:flex md:items-center md:gap-12'>
						<nav aria-label='Global' className='hidden md:block'>
							<ul className='flex items-center gap-6'>
								<li>
									<a
										className='text-gray-700 transition  hover:text-gray-700/75'
										href='#about'>
										{' '}
										About{' '}
									</a>
								</li>

								<li>
									<a
										className='text-gray-700 transition  hover:text-gray-700/75'
										href='#services'>
										{' '}
										Solutions{' '}
									</a>
								</li>

								<li>
									<a
										className='text-gray-700 transition  hover:text-gray-700/75'
										href='#reviews'>
										{' '}
										Testimonials{' '}
									</a>
								</li>
							</ul>
						</nav>

						<div className='flex items-center gap-4'>
							<div className='sm:flex sm:gap-4'>
								<a
									className='rounded-md bg-blue-500 px-5 py-3 font-semibold text-white flex justify-center drop-shadow-2xl items-center shadow-sm hover:bg-blue-500/90'
									href='#'>
									{/* some application link for me to track */}
									Get Funded Today
								</a>

								{/* <div className='hidden sm:flex'>
									<a
										className='rounded-md border-4 border-blue-500 px-5 py-2.5 text-sm font-semibold text-blue-500'
										href='#'>
										Client Portal
									</a>
								</div> */}
							</div>

							<div className='block md:hidden'>
								<button className='rounded-sm bg-gray-50 border-gray-400 border-2 p-2 text-gray-600 transition  hover:text-gray-600/75'>
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
		</header>
	);
};

export default Header;
