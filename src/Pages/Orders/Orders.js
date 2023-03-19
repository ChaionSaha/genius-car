import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Orders = () => {
	const [user] = useAuthState(auth);
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/orders?email=${user?.email}`)
			.then((result) => setOrders(result.data));
	}, [user]);

	return (
		<div>
			<h1>Your Total orders: {orders.length}</h1>
		</div>
	);
};

export default Orders;
