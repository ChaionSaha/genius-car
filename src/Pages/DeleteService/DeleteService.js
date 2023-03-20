import React from 'react';
import { Trash3 } from 'react-bootstrap-icons';
import useService from '../../hooks/useServices';
import styles from './DeleteService.module.scss';

const DeleteService = () => {
	const [services, setSevices] = useService();

	const handleDelete = (id, name) => {
		if (window.confirm(`Are you sure want to delete ${name}`)) {
			fetch(`https://genius-car-server-ekrb.onrender.com/service/${id}`, {
				method: 'delete',
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.deletedCount > 0) {
						const newServices = services.filter(
							(service) => service._id !== id
						);
						setSevices(newServices);
					}
				});
		}
	};

	return (
		<div className={styles.services}>
			{services.map((service) => {
				return (
					<div className={styles.service} key={service._id}>
						<p>{service.name}</p>
						<button onClick={() => handleDelete(service._id, service.name)}>
							<Trash3 size={25}></Trash3>
						</button>
					</div>
				);
			})}
		</div>
	);
};

export default DeleteService;
