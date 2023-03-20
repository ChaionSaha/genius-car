import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Orders = () => {
	const [user] = useAuthState(auth);
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const handleOrders = async () => {
			const { data } = await axios.get(
				`http://localhost:5000/orders?email=${user?.email}`,
				{
					headers: {
						authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					},
				}
			);
			console.log(data);
			setOrders(data);
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
