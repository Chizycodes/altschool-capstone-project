import React from 'react';

interface ButtonProps {
	text?: string;
	styles?: string;
	image?: string;
}

const Button: React.FC<ButtonProps> = ({ text, styles = 'bg-primary text-white', image }) => {
	return (
		<div>
			<button
				className={`btn border-primary hover:border-primary normal-case hover:bg-[#543ee093] min-w-[130px] w-full flex justify-center items-center gap-3 ${styles}`}
			>
				{image && <img src={image} alt="icon" />}
				{text}
			</button>
		</div>
	);
};

export default Button;
