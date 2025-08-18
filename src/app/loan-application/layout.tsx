import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
// import CookieBanner from './landing-components/cookie';
import Script from 'next/script';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Application for Business Funding',
	description: 'Easy and fast application for business funding',
	keywords: 'business funding, loan application, financial services',
	openGraph: {
		title: 'Echoweb Design',
		description: 'Web Design and Development Services',
		url: '',
		siteName: 'Echoweb Design',
		type: 'website',
		locale: 'en_US',
		images: [
			{
				url: '',
				width: 1200,
				height: 630,
				alt: 'Pathway Catalyst - Andres Valera',
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<head>
				{/* Google Tag Manager */}
				<Script
					id='gtm-script'
					strategy='afterInteractive'
					src='https://www.googletagmanager.com/gtm.js?id=GTM-5H74CL59'
				/>
				<Script id='gtm-init' strategy='afterInteractive'>{`
					window.dataLayer = window.dataLayer || [];
					window.dataLayer.push({
						'gtm.start': new Date().getTime(),
						event: 'gtm.js',
					});
				`}</Script>

				{/* Apollo Tracker */}
				<Script id='apollo-init' strategy='afterInteractive'>
					{`
						(function initApollo() {
							var n = Math.random().toString(36).substring(7);
							var o = document.createElement("script");
							o.src = "https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=" + n;
							o.async = true;
							o.defer = true;
							o.onload = function () {
								window.trackingFunctions?.onLoad({
									appId: "681290bbdce2a0001d1e2175"
								});
							};
							document.head.appendChild(o);
						})();
					`}
				</Script>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{/* Google Tag Manager (noscript) */}
				<noscript>
					<iframe
						src='https://www.googletagmanager.com/ns.html?id=GTM-5H74CL59'
						height='0'
						width='0'
						style={{ display: 'none', visibility: 'hidden' }}
					/>
				</noscript>
				{children}
				{/* <CookieBanner /> */}
			</body>
		</html>
	);
}
