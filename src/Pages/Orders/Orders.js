import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const Orders = () => {
	const [user] = useAuthState(auth);
	const [orders, setOrders] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const handleOrders = async () => {
			try {
				const { data } = await axios.get(
					`http://localhost:5000/orders?email=${user?.email}`,
					{
						headers: {
							authorization: `Bearer ${localStorage.getItem('accessToken')}`,
						},
					}
				);
				setOrders(data);
			} catch (err) {
				if (err.response.status === 401 || err.response.status === 403) {
					signOut(auth);
					toast.error('Bad request. Please login again.');
					navigate('/login');
				}
			}
		};

		handleOrders();
	}, [user]);

	return (
		<div>
			<h1>Your Total orders: {orders.length}</h1>
		</div>
	);
};

export default Orders;
