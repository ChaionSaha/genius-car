import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useServiceDetails from '../../../hooks/useServiceDetails';
import styles from './Checkout.module.scss';

const Checkout = () => {
	const { id } = useParams();
	const [service] = useServiceDetails(id);
	const [user] = useAuthState(auth);

	const handleCheckoutSubmit = (e) => {
		e.preventDefault();
		const order = {
			name: e.target.name.value,
			email: e.target.email.value,
			phone: e.target.phone.value,
			address: e.target.address.value,
			product: e.target.product.value,
			productPrice: e.target.price.value,
		};

		axios
			.post('https://genius-car-server-ekrb.onrender.com/order', order)
			.then((result) => {
				console.log(result.data);
				if (result.data.insertedId) {
					toast.success('Order placed');
					e.target.reset();
				}
			});
	};

	return (
		<div className={styles.checkout}>
			<h2>Confirm your purchase: {service.name}</h2>
			<form onSubmit={(e) => handleCheckoutSubmit(e)}>
				<div className={styles.inputGroup}>
					<label htmlFor='name'>Name: </label>
					<input
						type='text'
						name='name'
						id='name'
						value={user?.displayName}
						disabled
						readOnly
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor='email'>Email: </label>
					<input
						type='text'
						name='email'
						id='email'
						value={user?.email}
						readOnly
						disabled
					/>
				</div>
				<div className={`${styles.inputGroup} ${styles.productPrice}`}>
					<label htmlFor='product'>Product: </label>
					<input
						type='text'
						name='product'
						id='product'
						value={service.name}
						readOnly
						disabled
					/>
					<label htmlFor='price'>Price: </label>
					<input
						type='text'
						name='price'
						id='price'
						value={service.price}
						readOnly
						disabled
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor='phone'>Phone: </label>
					<input
						type='text'
						name='phone'
						id='phone'
						required
						autoComplete='off'
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor='address'>Address: </label>
					<input
						type='text'
						name='address'
						id='address'
						required
						autoComplete='off'
					/>
				</div>
				<input
					type='submit'
					className={styles.submit}
					value='Confirm Purchase'
				/>
			</form>
		</div>
	);
};

export default Checkout;
