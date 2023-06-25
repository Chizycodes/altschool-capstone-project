import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Form } from 'react-hook-form';
import Register from '../../components/auth/Register';
import Login from '../../components/auth/Login';

const Auth = () => {
	const { pathname } = useLocation();
	return (
		<div>
			<div className="flex">
				<div className="h-screen bg-[url('/images/auth_bg.svg')] bg-cover bg-center w-[40%] hidden md:block">
					<div className="hero h-full">
						<div className="hero-overlay bg-black bg-opacity-60"></div>
						<div className="hero-content text-left text-neutral-content">
							<div className="max-w-[90%] text-white">
								<h1 className="mb-8 text-5xl font-bold text-center z-1">CHATTER</h1>
								<p className="text-[24px] font-medium">
									Unleash the Power of Words, Connect with Like-minded Readers and Writers
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full md:w-[60%] md:px-20 py-10 h-screen overflow-y-auto">
					<div className="w-[80%] lg:w-[70%] mx-auto">
						<div className="tabs font-bold">
							<Link
								to="/register"
								className={`tab tab-bordered text-left pl-0 w-1/2 justify-start border-b-[6px]  ${
									pathname === '/register' ? 'border-[#543EE0]' : 'border-[#D9D9D9]'
								}`}
							>
								REGISTER
							</Link>
							<Link
								to="/login"
								className={`tab tab-bordered text-right pr-0 w-1/2 justify-end border-b-[6px]  ${
									pathname === '/login' ? 'border-[#543EE0]' : 'border-[#D9D9D9]'
								}`}
							>
								LOG IN
							</Link>
						</div>

						<div className="pt-10 flex flex-col justify-center h-[calc(100vh-200px)]">
							{pathname === '/register' && <Register />}

							{pathname === '/login' && <Login />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
