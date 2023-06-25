import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../general/Button';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
	firstName: yup.string().required().label('First Name'),
	lastName: yup.string().required().label('Last Name'),
	emailAddress: yup.string().email().required().label('Email Address'),
	password: yup.string().min(8).required().label('Password'),
	confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
});

const Register = () => {
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });

	const onsubmit = (data: any) => {
		setLoading(true);
		const { emailAddress, password, firstName, lastName } = data;
		createUserWithEmailAndPassword(auth, emailAddress, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log(user, user);
				setLoading(false);
				toast.success('Account created successfully');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				setLoading(false);
				toast.error(errorCode);
			});
	};
	return (
		<div>
			<form onSubmit={handleSubmit(onsubmit)}>
				<h1 className="text-center text-2xl font-medium">Register as a Writer/Reader</h1>

				<div className="mt-6">
					<div className="flex gap-3">
						<div className="w-1/2">
							<label htmlFor="firstName" className="block text-sm text-[#3B3B3B]">
								First Name
							</label>
							<input {...register('firstName')} type="text" className="c_input" />
							<p className="text-xs text-red-600">{errors?.firstName?.message?.toString()}</p>
						</div>
						<div className="w-1/2">
							<label htmlFor="lastName" className="block text-sm text-[#3B3B3B]">
								Last Name
							</label>
							<input {...register('lastName')} type="text" className="c_input" />
							<p className="text-xs text-red-600">{errors?.lastName?.message?.toString()}</p>
						</div>
					</div>

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

					<div className="mt-4">
						<label htmlFor="confirmPassword" className="block text-sm text-[#3B3B3B]">
							Confirm Password
						</label>
						<input {...register('confirmPassword')} type="password" className="c_input" />
						<p className="text-xs text-red-600">{errors?.confirmPassword?.message?.toString()}</p>
					</div>

					<div className="mt-10">
						<Button text="Create Account" />
					</div>
				</div>
			</form>
			<div className="mt-5">
				<Button image="/images/google_logo.svg" styles="bg-white border-[#D0D0D0]" text=" Sign up with google" />
			</div>
		</div>
	);
};

export default Register;
