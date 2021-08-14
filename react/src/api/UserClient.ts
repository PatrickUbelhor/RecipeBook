import axios, { AxiosResponse } from 'axios';
import { User } from '../model/user.model';

type UserResponse<T> = Promise<AxiosResponse<T>>;

class UserClient {

	userClient = axios.create({
		baseURL: process.env.AUTH_SERVER_URL
	});


	createUser = (email: string, username: string, password: string): UserResponse<User> => {
		return this.userClient.post('/user', {
			email: email,
			username: username,
			password: password
		});
	};

}

export default new UserClient();
