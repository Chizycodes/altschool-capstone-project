import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../general/Button';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithRedirect, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import {	 useAuth } from '../../context/AuthContext';

interface SchemaProps {
	emailAddress: string;
	password: string;
}

const schema = yup.object().shape({
	emailAddress: yup.string().email().required().label('Email Address'),
	password: yup.string().min(8).required().label('Password'),
});

const Login = () => {
	const navigate = useNavigate();
	const { dispatch } = useAuth();
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });

	const onsubmit = (data: any) => {
		setLoading(true);
		const { emailAddress, password } = data;
		signInWithEmailAndPassword(auth, emailAddress, password)
			.then((userCredential) => {
				const user = userCredential.user;
				dispatch({ type: 'LOGIN', payload: user });
				setLoading(false);
				console.log(user, user);
				navigate('/feed');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				toast.error(errorCode);
				setLoading(false);
			});
	};

	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		signInWithRedirect(auth, provider);
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onsubmit)}>
				<h1 className="text-center text-2xl font-medium">Welcome Back</h1>

				<div className="mt-6">
					<div className="mt-4">
						<label htmlFor="emailAddress" className="block text-sm text-[#3B3B3B]">
							Email Address
						</label>
						<input {...register('emailAddress')} type="email" className="c_input" />
						<p className="text-xs text-red-600">{errors?.emailAddress?.message?.toString()}</p>
					</div>

					<div className="mt-4">
						<label htmlFor="password" className="block text-sm text-[#3B3B3B]">
							Password
						</label>
						<input {...register('password')} type="password" className="c_input" />
						<p className="text-xs text-red-600">{errors?.password?.message?.toString()}</p>
					</div>

					<div className="mt-10">
						<Button text="Log in" isLoading={loading} />
					</div>
				</div>
			</form>
			<div className="mt-5" onClick={googleSignIn}>
				<Button image="/images/google_logo.svg" styles="bg-white border-[#D0D0D0]" text=" Sign in with google" />
			</div>
			{/* <div className="mt-5">
				<Button image="/images/linkedin_logo.svg" styles="bg-white border-[#D0D0D0]" text="Sign up with Linkedin" />
			</div> */}
		</div>
	);
};

export default Login;
