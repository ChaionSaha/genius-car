import React from "react";
import { Link, useParams } from "react-router-dom";
import useServiceDetails from "../../hooks/useServiceDetails";
import "./ServiceDetails.css";

const ServiceDetail = () => {
	const { serviceId } = useParams();
	const [service] = useServiceDetails(serviceId);

	return (
		<div className="d-flex p-3 flex-column ml-auto justify-content-center align-items-center">
			<h2 className="mb-3">{service.name}</h2>
			<div className="border w-25 p-3 h-25">
				<img src={service.img} alt="service" className="w-100"></img>
				<p className="text-center my-3">{service.description}</p>
				<div className="text-center d-flex align-items-center justify-content-center ">
					<Link to={`/checkout/${serviceId}`}>
						<button className="btn btn-primary overflow-hidden checkout-btn">
							<span>Price: {service.price}</span>
							<span>Proceed Checkout</span>
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ServiceDetail;
