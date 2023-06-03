import React from 'react';

const items = [
	{
		id: 1,
		icon: '/images/analytics_icon.svg',
		title: 'Analytics',
		description:
			'Analytics to track the number of views, likes and comment and also analyze the performance of your articles over a period of time.',
	},
	{
		id: 2,
		icon: '/images/social_icon.svg',
		title: 'Social interactions',
		description: 'Users on the platform can interact with posts they like, comment and engage in discussions.',
	},
	{
		id: 1,
		icon: '/images/content_icon.svg',
		title: 'Content creation',
		description: 'Write nice and appealing with our in-built markdown, a rich text editor.',
	},
];

const AboutSection = () => {
	return (
		<div className="py-20 max-w-7xl mx-auto px-5 sm:px-10" id='about'>
			<div className="md:flex justify-between mb-20 gap-5">
				<div className="md:w-2/3 mb-10">
					<h2 className="text-4xl font-bold mb-5">About Chatter</h2>
					<p>
						Chatter is a multi-functional platform where authors and readers can have access to their own content. It
						aims to be a traditional bookworm’s heaven and a blog to get access to more text based content. Our vision
						is to foster an inclusive and vibrant community where diversity is celebrated. We encourage open-mindedness
						and respect for all individuals, regardless of their backgrounds or beliefs. By promoting dialogue and
						understanding, we strive.
					</p>
				</div>
				<div className=''>
					<img src="/images/about.svg" alt="About chatter" />
				</div>
			</div>

			<div className="text-center max-w-5xl mx-auto">
				<h2 className="text-4xl font-bold mb-8">Why you should join chatter</h2>
				<p className="mb-10">
					Our goal is to make writers and readers see our platform as their next heaven for blogging, ensuring ease in
					interactions, connecting with like-minded peers, have access to favorite content based on interests and able
					to communicate your great ideas with people
				</p>

				<div className="sm:flex sm:gap-5">
					{items.map((item) => {
						return (
							<div key={item?.id} className="border border-[#D0D0D0] rounded-lg p-3 text-left sm:w-1/3 mb-8 sm:mb-0">
								<img src={item.icon} alt="icon" className="w-[60px] mb-3" />

								<h4 className="mb-3 font-medium text-xl">{item.title}</h4>
								<p className="text-gray">{item.description}</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default AboutSection;
