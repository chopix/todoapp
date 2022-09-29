import IUser from './IUser';

export default interface IAuthResponse {
	user: IUser;
	accessToken: string;
	refreshToken: string;
}
