import React, { useState } from 'react';
import {
	useCreateUserWithEmailAndPassword,
	useUpdateProfile,
} from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import useToken from '../../../hooks/useToken';
import Loading from '../../Shared/Loading/Loading';
import SocialLogin from '../SocialLogin/SocialLogin';
import './Register.css';

const Register = () => {
	const [agree, setAgree] = useState(false);
	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
	const [updateProfile, updating, updateError] = useUpdateProfile(auth);

	const navigate = useNavigate();
	const [token] = useToken(user);

	const location = useLocation();

	let from = location.state?.from?.pathname || '/';

	const navigateLogin = () => {
		navigate(from, { replace: true });
	};

	if (loading || updating) {
		return <Loading></Loading>;
	}

	if (token) navigate('/home');

	const handleRegister = async (event) => {
		event.preventDefault();
		const name = event.target.name.value;
		const email = event.target.email.value;
		const password = event.target.password.value;
		// const agree = event.target.terms.checked;

		await createUserWithEmailAndPassword(email, password);
		await updateProfile({ displayName: name });
	};

	return (
		<div className='register-form container w-50 text-center d-flex flex-column'>
			<h2 style={{ textAlign: 'center' }}>Please Register</h2>
			<form onSubmit={handleRegister} className='w-50 align-self-center'>
				<input type='text' name='name' id='' placeholder='Your Name' />

				<input
					type='email'
					name='email'
					id=''
					placeholder='Email Address'
					required
				/>

				<input
					type='password'
					name='password'
					id=''
					placeholder='Password'
					required
				/>
				<div>
					<input
						onClick={() => setAgree(!agree)}
						type='checkbox'
						name='terms'
						id='terms'
					/>
					{/* <label className={agree ? 'ps-2': 'ps-2 text-danger'} htmlFor="terms">Accept Genius Car Terms and Conditions</label> */}
					<label
						className={`ps-2 ${agree ? '' : 'text-danger'}`}
						htmlFor='terms'
					>
						Accept Genius Car Terms and Conditions
					</label>
				</div>
				<input
					disabled={!agree}
					className='w-50 mx-auto btn btn-primary mt-2'
					type='submit'
					value='Register'
				/>
			</form>
			<p>
				Already have an account?{' '}
				<Link
					to='/login'
					className='text-primary pe-auto text-decoration-none'
					onClick={navigateLogin}
				>
					Please Login
				</Link>{' '}
			</p>
			<SocialLogin className='border w-50'></SocialLogin>
		</div>
	);
};

export default Register;
