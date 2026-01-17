import React from 'react'

const Footer = () => {
	return (
		<footer className='bg-slate-900  w-full py-6 mt-auto'>
			<div className='text-center justify-center items-center text-white text-sm'>
				<p>
					Copyright &copy; {new Date().getFullYear()} |
					<span className='font-bold text-white'> Link</span>
					<span className='font-bold text-pink-400'>ify </span>
					| All rights reserved
				</p>
				<p className='mx-2 text-white mt-2 text-center text-sm font-medium'>Built with Next.js & MongoDB</p>
			</div>
		</footer>
	)
}

export default Footer