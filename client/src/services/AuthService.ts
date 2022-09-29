import { AxiosResponse } from 'axios';
import $api from '../http';
import IAuthResponse from '../types/AuthResponse';

export class AuthService {
	static async login(
		email: string,
		password: string
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post<IAuthResponse>('/auth/login', { email, password });
	}

	static async register(
		email: string,
		password: string,
		name: string
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post<IAuthResponse>('/auth/login', { email, password, name });
	}
}
