import axios from 'axios';
import { useEffect, useState } from 'react';

const useToken = (user) => {
	const [token, setToken] = useState('');

	useEffect(() => {
		const email = user?.user?.email;
		const getToken = async () => {
			if (email) {
				const { data } = await axios.post(
					'https://genius-car-server-ekrb.onrender.com/login',
					{ email }
				);
				localStorage.setItem('accessToken', `${data}`);
				setToken(data);
			}
		};
		getToken();
	}, [user]);

	return [token];
};

export default useToken;
