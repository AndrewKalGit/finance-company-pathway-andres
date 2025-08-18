'use client';

import Image from 'next/image';
import { useState, useRef, DragEvent } from 'react';

type ApplicationData = {
	businessName?: string;
	ein?: string;
	email?: string;
	mobile?: string;
	state?: string;
	currentMca?: string;
	ficoScore?: string;
	bankStatements?: File[];
};

export default function LoanApplication() {
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState<ApplicationData>({});
	const [dragOver, setDragOver] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	const handleChange = (
		field: keyof ApplicationData,
		value: string | File[] | null
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragOver(false);

		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			const newFiles = Array.from(e.dataTransfer.files);
			const existingFiles = formData.bankStatements || [];
			handleChange('bankStatements', [...existingFiles, ...newFiles]);
			e.dataTransfer.clearData();
		}
	};

	const handleFileSelect = (files: FileList | null) => {
		if (!files) return;
		const newFiles = Array.from(files);
		const existingFiles = formData.bankStatements || [];
		handleChange('bankStatements', [...existingFiles, ...newFiles]);
	};

	const removeFile = (index: number) => {
		if (!formData.bankStatements) return;
		const updatedFiles = [...formData.bankStatements];
		updatedFiles.splice(index, 1);
		handleChange('bankStatements', updatedFiles.length ? updatedFiles : null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formRef.current?.checkValidity()) {
			formRef.current?.reportValidity();
			return;
		}

		setError(null);

		try {
			const data = new FormData();
			for (const key in formData) {
				const field = key as keyof ApplicationData;
				const value = formData[field];
				if (!value) continue;

				if (field === 'bankStatements' && Array.isArray(value)) {
					value.forEach((file) => data.append('bankStatements', file));
				} else if (typeof value === 'string') {
					data.append(field, value);
				}
			}

			const res = await fetch('/api/submit/route.ts', {
				method: 'POST',
				body: data,
			});
			const json: { success: boolean } = await res.json();

			if (json.success) setSubmitted(true);
			else setError('Error submitting application. Please try again.');
		} catch (err) {
			console.error(err);
			setError('Network error. Please try again.');
		}
	};

	return (
		<div className='max-w-2xl mx-auto bg-white p-8 rounded shadow-lg border border-gray-300 min-h-[70vh] flex flex-col'>
			{!submitted ? (
				<form
					ref={formRef}
					onSubmit={handleSubmit}
					noValidate
					className='flex flex-col gap-4 flex-1'>
					<h2 className='text-2xl font-bold'>Business Funding Application</h2>
					<p className='text-gray-700 mb-2 text-sm'>
						Your personal lender will reach out to you with next steps within{' '}
						<strong>15 minutes</strong>.
					</p>

					{/* Top row: Business Name & EIN */}
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<div>
							<label className='font-semibold mb-1 block'>
								Business Name *
							</label>
							<input
								className='w-full p-2 border border-gray-300 rounded'
								placeholder='Business name'
								name='businessName'
								required
								pattern='^[a-zA-Z0-9\s]{2,}$'
								onChange={(e) => handleChange('businessName', e.target.value)}
							/>
						</div>
						<div>
							<label className='font-semibold mb-1 block'>
								EIN (XX-XXXXXXX) *
							</label>
							<input
								className='w-full p-2 border border-gray-300 rounded'
								placeholder='XX-XXXXXXX'
								name='ein'
								required
								pattern='^\d{2}-?\d{7}$'
								onChange={(e) => handleChange('ein', e.target.value)}
							/>
						</div>
					</div>

					{/* Email & Mobile */}
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<div>
							<label className='font-semibold mb-1 block'>
								Email Address *
							</label>
							<input
								type='email'
								className='w-full p-2 border border-gray-300 rounded'
								placeholder='your@email.com'
								required
								onChange={(e) => handleChange('email', e.target.value)}
							/>
						</div>
						<div>
							<label className='font-semibold mb-1 block'>
								Mobile Number *
							</label>
							<input
								type='tel'
								className='w-full p-2 border border-gray-300 rounded'
								placeholder='(555) 123-4567'
								required
								pattern='^\+?\d{10,15}$'
								onChange={(e) => handleChange('mobile', e.target.value)}
							/>
						</div>
					</div>

					{/* State & Current MCA */}
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<div>
							<label className='font-semibold mb-1 block'>State *</label>
							<input
								className='w-full p-2 border border-gray-300 rounded'
								placeholder='Enter your state'
								required
								onChange={(e) => handleChange('state', e.target.value)}
							/>
						</div>
						<div>
							<label className='font-semibold mb-1 block'>
								Current MCA Balances
							</label>
							<input
								className='w-full p-2 border border-gray-300 rounded'
								placeholder='$0 (if none, enter 0)'
								onChange={(e) => handleChange('currentMca', e.target.value)}
							/>
						</div>
					</div>

					{/* FICO Score */}
					<div>
						<label className='font-semibold mb-1 block'>
							FICO Score (if known)
						</label>
						<input
							className='w-full p-2 border border-gray-300 rounded'
							placeholder='Enter your FICO score'
							onChange={(e) => handleChange('ficoScore', e.target.value)}
						/>
					</div>

					{/* Bank Statements Drag & Drop with Thumbnails & Download */}
					<div>
						<label className='font-semibold mb-1 block'>
							Bank Statements (Last 4 months) *
						</label>
						<div
							onDragOver={(e) => {
								e.preventDefault();
								setDragOver(true);
							}}
							onDragLeave={() => setDragOver(false)}
							onDrop={handleDrop}
							className={`w-full p-6 border-2 border-dashed rounded text-center cursor-pointer ${
								dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
							}`}
							onClick={() => document.getElementById('fileInput')?.click()}>
							<p className='text-gray-500 mb-2'>
								Drag & drop files here or click to upload
							</p>
							<p className='text-xs text-gray-400'>
								Accepted formats: PDF, JPG, PNG (Max 10MB each)
							</p>
							<input
								id='fileInput'
								type='file'
								multiple
								accept='.pdf,.jpg,.jpeg,.png'
								className='hidden'
								onChange={(e) => handleFileSelect(e.target.files)}
							/>
						</div>

						{formData.bankStatements && formData.bankStatements.length > 0 && (
							<div className='mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2'>
								{formData.bankStatements.map((file, index) => {
									const isImage = file.type.startsWith('image/');
									const url = URL.createObjectURL(file);

									return (
										<div
											key={index}
											className='relative border rounded overflow-hidden flex flex-col items-center justify-center p-2 bg-gray-100'>
											{isImage ? (
												<Image
													src={url}
													alt={file.name}
													className='h-24 object-contain mb-1'
													width={96}
													height={96}
													onLoad={() => URL.revokeObjectURL(url)}
												/>
											) : (
												<div className='flex flex-col items-center justify-center mb-1'>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														className='h-12 w-12 text-gray-500'
														fill='none'
														viewBox='0 0 24 24'
														stroke='currentColor'>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M12 4v16m8-8H4'
														/>
													</svg>
												</div>
											)}

											{/* Clickable filename to download */}
											<a
												href={url}
												download={file.name}
												className='text-xs text-gray-700 text-center break-words mt-1 hover:underline'
												onClick={() => URL.revokeObjectURL(url)}>
												{file.name}
											</a>

											<button
												type='button'
												className='absolute top-1 right-1 text-red-500 font-bold'
												onClick={() => removeFile(index)}>
												×
											</button>
										</div>
									);
								})}
							</div>
						)}
					</div>

					{/* Privacy */}
					<p className='text-xs text-gray-500 mb-2'>
						Data Storage & Privacy: All submitted information will be encrypted
						and stored securely in compliance with industry standards.
					</p>

					{/* Error */}
					{error && (
						<p className='text-orange-500 mb-2 font-semibold'>{error}</p>
					)}

					<button
						type='submit'
						className='bg-blue-500 text-white px-4 py-2 rounded w-full'
						disabled={submitted}>
						{submitted ? 'Submitting...' : 'Submit Application'}
					</button>
				</form>
			) : (
				<div className='text-center flex flex-col justify-center flex-1'>
					<h2 className='text-2xl font-bold text-green-600 mb-2'>
						Application Received
					</h2>
					<p className='mb-4'>
						Your personal lender will reach out to you with next steps within{' '}
						<strong>15 minutes</strong>.
					</p>
					<p className='text-sm text-gray-500'>
						Please keep your phone nearby to ensure you don’t miss our call.
					</p>
				</div>
			)}
		</div>
	);
}
