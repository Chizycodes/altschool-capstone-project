import React from 'react';

const SpinLoader = () => {
	return (
		<div
			className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
			role="status"
		></div>
	);
};

export default SpinLoader;
