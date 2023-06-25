import React from 'react';

const Footer = () => {
	return (
		<footer className="footer py-20 px-5 md:px-10 text-base-content bg-[rgba(255,237,204,0.5)] container">
			<div>
				<img src="/images/logo.svg" alt="logo" className="w-40" />
			</div>
			<div>
				<span className="footer-title">Explore</span>
				<a className="link link-hover">Community</a>
				<a className="link link-hover">Trending blogs</a>
				<a className="link link-hover">Chatter for teams</a>
			</div>
			<div>
				<span className="footer-title">Support</span>
				<a className="link link-hover">Support docs</a>
				<a className="link link-hover">Join slack</a>
				<a className="link link-hover">Contact</a>
			</div>
			<div>
				<span className="footer-title">Official blog</span>
				<a className="link link-hover">Official blog</a>
				<a className="link link-hover">Engineering blog</a>
			</div>
		</footer>
	);
};

export default Footer;
