import { UsersType } from "../models/Users";
import { User } from "../domain/User";
import { DataMapper } from "../models/DataMapper";
import { v4 as uuidv4 } from "uuid";

export class UserService {
	constructor(private users: DataMapper<User>) {}

	async create(request: Omit<UsersType, "id">) {
		const transaction = new User(
			request.accountId,
			request.accountNumber,
			request.address,
			request.status,
		);
		await this.users.insert(transaction);
	}

	async fetch(id: string) {
		return await this.users.fetch(id);
	}

	async getUserData(id: string) {
		const user = await this.fetch(id);
		if (!user) return;
		return user.getUserData();
	}

	async getUserId(id: string) {
		const user = await this.fetch(id);
		if (!user) return;
		return user.getId();

	}

}