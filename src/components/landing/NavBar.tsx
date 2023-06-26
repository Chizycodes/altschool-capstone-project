import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from '../general/Button';

const NavBar = () => {
	return (
		<div className="navbar px-5 md:px-10 bg-base-100 w-full h-[70px]">
			<div className="navbar-start flex-row-reverse w-full lg:w-[50%] justify-between">
				<div className="dropdown dropdown-end">
					<label tabIndex={0} className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-7 w-7"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
						</svg>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white font-bold rounded-box w-60 z-10 text-base"
					>
						<li>
							<NavLink to="/">Home</NavLink>
						</li>

						<li>
							<NavLink to="/feed">Feed</NavLink>
						</li>

						<li>
							<a href="#about">About us</a>
						</li>

						<li>
							<NavLink to="/">Contact</NavLink>
						</li>

						<div className="">
							<Link to="/login" className="">
								<Button text="Log in" styles="bg-white w-full my-5" />
							</Link>
							<Link to="/register" className="">
								<Button text="Sign up" styles="bg-primary text-white w-full" />
							</Link>
						</div>
					</ul>
				</div>

				<Link to="/" className="">
					<img src="/images/logo.svg" className="w-[120px]" alt="logo" />
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1 font-bold text-base">
					<li>
						<NavLink to="/">Home</NavLink>
					</li>

					<li>
						<NavLink to="/feed">Feed</NavLink>
					</li>

					<li>
						<a href="#about">About us</a>
					</li>

					<li>
						<NavLink to="/">Contact</NavLink>
					</li>
				</ul>
			</div>
			<div className="navbar-end gap-3 hidden lg:flex">
				<Link to="/login" className="">
					<Button text="Log in" styles="bg-white" />
				</Link>
				<Link to="/register" className="">
					<Button text="Sign up" />
				</Link>
			</div>
		</div>
	);
};

export default NavBar;
