import axios from "axios";
import { useEffect, useState } from "react";

const useServiceDetails = (id) => {
	const [service, setService] = useState({});

	useEffect(() => {
		axios
			.get(`http://localhost:5000/service/${id}`)
			.then((data) => setService(data.data));
	});

	return [service];
};

export default useServiceDetails;
