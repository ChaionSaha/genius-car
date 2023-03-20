import axios from 'axios';
import { useEffect, useState } from 'react';

const useServiceDetails = (id) => {
	const [service, setService] = useState({});

	useEffect(() => {
		axios
			.get(`https://genius-car-server-ekrb.onrender.com/service/${id}`)
			.then((data) => setService(data.data));
	});

	return [service];
};

export default useServiceDetails;
