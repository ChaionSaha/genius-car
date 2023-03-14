import { useEffect, useState } from 'react';

const useService = () => {
	const [services, setSevices] = useState([]);
	useEffect(() => {
		fetch('http://localhost:5000/services')
			.then((res) => res.json())
			.then((data) => setSevices(data));
	}, []);

	return [services, setSevices];
};

export default useService;
