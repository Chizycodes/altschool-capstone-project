import React from 'react';
import Button from '../general/Button';

const Hero = () => {
	return (
		<div className="hero min-h-[calc(100vh-70px)] bg-[url('/images/hero-bg.svg')] bg-cover bg-center">
			<div className="hero-overlay bg-black bg-opacity-60"></div>
			<div className="hero-content text-left text-neutral-content">
				<div className="max-w-[60rem] text-white">
					<h1 className="mb-5 text-5xl font-bold">Welcome to Chatter: A Haven for Text-Based Content</h1>
					<p className="mb-5 text-[24px] font-medium">
						Unleash the Power of Words, Connect with Like-minded Readers and Writers
					</p>
					<div className='w-[140px] mt-5'>
						<Button text="Get Started" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
