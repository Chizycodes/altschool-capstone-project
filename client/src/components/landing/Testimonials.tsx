import React from 'react';
import Button from '../general/Button';

const Testimonials = () => {
	return (
		<div>
			<div className="bg-[rgba(255,237,204,0.5)] py-20">
				<div className="container mx-auto md:flex gap-10 items-center justify-center px-5 md:px-10">
					<div className="rounded-full overflow-hidden w-40 md:w-[250px] mb-5">
						<img src="/images/image1.svg" alt="person" className="w-full h-full" />
					</div>
					<div className="max-w-2xl">
						<p className="text-sm mb-5 md:mb-10">
							"Chatter has become an integral part of my online experience. As a user of this incredible blogging
							platform, I have discovered a vibrant community of individuals who are passionate about sharing their
							ideas and engaging in thoughtful discussions.”
						</p>

						<p className="font-medium text-lg mb-5">
							Adebobola Muhydeen, <span className="font-normal text-sm">Software developer at Apple</span>
						</p>

						<Button text="Join Chatter" />
					</div>
				</div>
			</div>

			<div className="pt-20">
				<div className="container mx-auto md:flex gap-10 items-center justify-center px-5 md:px-10">
					<div className="w-40 md:w-80 mb-5">
						<img src="/images/image2.svg" alt="person" className="w-full h-full" />
					</div>
					<div className="max-w-2xl">
						<p className="text-4xl font-bold mb-5 md:mb-10">Write, read and connect with great minds on chatter</p>

						<p className="mb-5">
							Share people your great ideas, and also read write-ups based on your interests. connect with people of
							same interests and goals
						</p>

						<Button text="Get Started" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Testimonials;
-2;
