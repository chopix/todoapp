import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAuth } from './types/IAuth';
import axios from 'axios';
import $api from '../../http';
import toast, { Toaster } from 'react-hot-toast';
import { AuthService } from '../../services/AuthService';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../hooks/redux';
import setAccessToken from './../../store/reducers/AuthSlice';

const Auth: FC = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IAuth>();

	const dispatch = useAppDispatch();

	const onSubmit: SubmitHandler<IAuth> = async (hookData) => {
		const res = AuthService.login(String(hookData.email), hookData.password)
			.then((res) => {
				toast.success('Успешный вход', {
					icon: '👏',
					style: {
						borderRadius: '10px',
						background: '#333',
						color: '#fff',
					},
				});
				localStorage.setItem('token', res.data.accessToken);
				dispatch(setAccessToken());
			})
			.catch((e) => {
				toast.error(e.response.data.message, {
					icon: '⛔',
					style: {
						borderRadius: '10px',
						background: '#333',
						color: '#fff',
					},
				});
			});
	};

	return (
		<div className="container d-flex align-items-center flex-column">
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ width: '200px' }}
				className="d-flex justify-content-center flex-column align-items-center"
			>
				<div className="mb-3 d-flex flex-column align-items-center">
					<input
						className="form-control"
						placeholder="E-mail"
						type="text"
						{...register('email', {
							required: 'Это поле обязательно!',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Неправильный формат ввода эмейла!',
							},
						})}
					/>
					{errors?.email && (
						<div className="form-text text-danger text-center">
							{errors.email.message}
						</div>
					)}
				</div>
				<div className="mb-3 d-flex flex-column align-items-center">
					<input
						className="form-control"
						placeholder="Пароль"
						type="password"
						{...register('password', {
							required: 'Это поле обязательно!',
							minLength: {
								value: 6,
								message: 'Минимальная длина - 6 символов.',
							},
						})}
					/>
					{errors?.password && (
						<div className="form-text text-danger text-center">
							{errors.password.message}
						</div>
					)}
				</div>
				<button className="btn btn-success">Авторизироваться</button>\
			</form>
			<Toaster position="top-right" />
		</div>
	);
};

export default Auth;
