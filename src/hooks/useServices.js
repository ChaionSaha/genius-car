import { useEffect, useState } from 'react';

const useService = () => {
	const [services, setSevices] = useState([]);
	useEffect(() => {
		fetch('https://genius-car-server-ekrb.onrender.com/services')
			.then((res) => res.json())
			.then((data) => setSevices(data));
	}, []);

	return [services, setSevices];
};

export default useService;
