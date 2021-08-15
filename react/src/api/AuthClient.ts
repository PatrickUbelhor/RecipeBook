import axios, { AxiosResponse } from 'axios';
import { User } from '../model/user.model';

type AuthResponse<T> = Promise<AxiosResponse<T>>

class AuthClient {

	authClient = axios.create({
		baseURL: process.env.REACT_APP_AUTH_SERVER_URL
	});


	login = (email: string, password: string): AuthResponse<User> => {
		return this.authClient.get('/login', {
			headers: {
				email: email,
				password: password
			}
		});
	};


	logout = (token: string): AuthResponse<void> => {
		return this.authClient.get('/logout', {
			headers: {
				token: token
			}
		});
	};

}

export default new AuthClient();
