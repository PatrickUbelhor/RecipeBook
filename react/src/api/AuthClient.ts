import axios, { AxiosResponse } from 'axios';

type AuthResponse<T> = Promise<AxiosResponse<T>>

class AuthClient {

	authClient = axios.create({
		baseURL: process.env.AUTH_SERVER_URL
	});


	login = (email: string, password: string): AuthResponse<any> => {
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
