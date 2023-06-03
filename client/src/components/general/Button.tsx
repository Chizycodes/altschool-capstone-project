import React from 'react';

const Button = ({ text, styles = 'bg-primary text-white' }) => {
	return (
		<div>
			<button
				className={`btn border-primary hover:border-primary normal-case hover:bg-[#543ee093] min-w-[130px] ${styles}`}
			>
				{text}
			</button>
		</div>
	);
};

export default Button;
