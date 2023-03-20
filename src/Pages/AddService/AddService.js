import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from './AddService.module.scss';

const AddService = () => {
	const { register, handleSubmit } = useForm();
	const formRef = useRef();
	const onSubmit = (data) => {
		console.log(data);
		fetch('https://genius-car-server-ekrb.onrender.com/service', {
			method: 'post',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				toast.success(`${data.name} added successfully`);
				formRef.current.reset();
			});
	};
	return (
		<div className={styles.addService}>
			<h1>Add a service</h1>

			<form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
				<input
					placeholder='Name'
					{...register('name', {
						required: true,
						maxLength: 20,
					})}
				/>

				<input placeholder='Price' type='number' {...register('price')} />
				<input placeholder='Image Link' type='text' {...register('img')} />
				<textarea
					placeholder='Description'
					type='text'
					{...register('description')}
					className={styles.description}
				/>
				<input type='submit' />
			</form>
		</div>
	);
};

export default AddService;
